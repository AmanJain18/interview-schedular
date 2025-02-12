import { Calendar } from '../ui/calendar';
import { format, parseISO, startOfDay, isBefore } from 'date-fns';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { cn, formatTimeSlot } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { useInterviewStore } from '@/store/interviews';
import { WORKING_HOURS } from '@/lib/constant';

interface DateTimePickerProps {
    selectedDate: string;
    selectedTime: string;
    selectedInterviewer: string;
    onDateChange: (date: string) => void;
    onTimeChange: (time: string) => void;
}

// I thought to disable dates before today for selection.
const isDateDisabled = (date: Date): boolean => {
    const today = startOfDay(new Date());
    return isBefore(date, today);
};

export default function DateTimePicker({
    selectedDate,
    selectedTime,
    selectedInterviewer,
    onDateChange,
    onTimeChange,
}: DateTimePickerProps) {
    const { interviews } = useInterviewStore();

    // Generate all possible time slots (one-hour intervals).
    const generateTimeSlots = (): string[] => {
        const slots: string[] = [];
        for (
            let hour = WORKING_HOURS.start;
            hour <= WORKING_HOURS.end;
            hour++
        ) {
            const hourStr = hour.toString().padStart(2, '0');
            slots.push(`${hourStr}:00`);
        }
        return slots;
    };

    // Get booked time slots for the selected interviewer on the given date.
    const getBookedTimeSlots = (
        date: string,
        interviewer: string,
    ): string[] => {
        return interviews
            .filter((interview) => {
                return (
                    interview.date === date &&
                    interview.interviewerName === interviewer
                );
            })
            .map((interview) => interview.timeSlot);
    };

    // Compute available time slots for the given date and interviewer.
    const getAvailableTimeSlots = (
        date: string,
        interviewer: string,
    ): string[] => {
        const allSlots = generateTimeSlots();
        const bookedSlots = getBookedTimeSlots(date, interviewer);
        let availableSlots = allSlots.filter(
            (slot) => !bookedSlots.includes(slot),
        );

        // If the selected date is today, filter out time slots that have already passed.
        const todayStr = format(new Date(), 'yyyy-MM-dd');
        if (date === todayStr) {
            const currentHour = new Date().getHours();
            availableSlots = availableSlots.filter((slot) => {
                const [hourStr] = slot.split(':');
                const slotHour = parseInt(hourStr, 10);
                return slotHour > currentHour;
            });
        }
        return availableSlots;
    };

    // Compute the available time slots based on selected date and interviewer.
    const availableTimeSlots =
        selectedDate && selectedInterviewer
            ? getAvailableTimeSlots(selectedDate, selectedInterviewer)
            : [];

    return (
        <div className='space-y-4'>
            {/* Date Selection */}
            <div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline'
                            className={cn(
                                'w-full justify-start text-left font-normal',
                                !selectedDate && 'text-muted-foreground',
                            )}
                        >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {selectedDate
                                ? format(parseISO(selectedDate), 'PPP')
                                : 'Pick a date'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                            mode='single'
                            selected={
                                selectedDate
                                    ? parseISO(selectedDate)
                                    : undefined
                            }
                            onSelect={(date) =>
                                onDateChange(
                                    date ? format(date, 'yyyy-MM-dd') : '',
                                )
                            }
                            disabled={isDateDisabled}
                            className='rounded-md border'
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Time Selection */}
            <div>
                <Select
                    value={selectedTime}
                    onValueChange={onTimeChange}
                    disabled={!selectedDate}
                >
                    <SelectTrigger className='w-full'>
                        <SelectValue
                            placeholder={
                                !selectedDate
                                    ? 'Select a date first'
                                    : 'Select time'
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {availableTimeSlots.length > 0 ? (
                            availableTimeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                    {formatTimeSlot(time)}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem value='No slot' disabled>
                                No slot available
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
