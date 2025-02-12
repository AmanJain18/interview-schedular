import { useCallback, useState } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import withDragAndDrop, {
    EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useInterviewStore } from '@/store/interviews';
import { CalendarEvent } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { WORKING_HOURS } from '@/lib/constant';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import InterviewForm from './InterviewForm';

const DnDCalendar = withDragAndDrop(Calendar);
const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const InterviewCalendar = () => {
    const [view, setView] = useState<string>('month');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
        null,
    );

    const { interviews, updateInterview } = useInterviewStore();
    const { toast } = useToast();

    const onNavigate = useCallback(
        (newDate: Date) => setCurrentDate(newDate),
        [],
    );
    const onView = useCallback((newView: string) => setView(newView), []);

    const events = interviews.map((interview) => {
        // Combining the interview date ("YYYY-MM-DD") and timeSlot ("HH:mm")
        // to create a Date object.
        const startDate = new Date(`${interview.date}T${interview.timeSlot}`);
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 1);
        return {
            id: interview.id,
            title: `${interview.candidateName} - ${interview.type} with ${interview.interviewerName}`,
            start: startDate,
            end: endDate,
        };
    });

    const handleEventDrop = useCallback(
        (args: EventInteractionArgs<object>) => {
            const { event, start } = args;
            const calendarEvent = event as CalendarEvent;
            const newStart = new Date(start);
            const dayOfWeek = newStart.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                alert('Interview cannot be scheduled on weekends.');
                return;
            }
            const newHour = newStart.getHours();
            if (newHour < WORKING_HOURS.start || newHour >= WORKING_HOURS.end) {
                alert(
                    'Interview must be scheduled between 9:00 AM and 6:00 PM.',
                );
                return;
            }
            const newDate = format(newStart, 'yyyy-MM-dd');
            const newTimeSlot = format(newStart, 'HH:mm');
            updateInterview(calendarEvent.id, {
                date: newDate,
                timeSlot: newTimeSlot,
            });
            toast({
                title: 'Interview Updated',
                description: 'Interview schedule updated successfully.',
            });
        },
        [updateInterview, toast],
    );
    // Handler for clicking (selecting) an event to edit.
    const handleSelectEvent = useCallback((event: object) => {
        const calendarEvent = event as CalendarEvent;
        setSelectedEvent(calendarEvent);
    }, []);

    return (
        <>
            <div style={{ height: 600 }}>
                <DnDCalendar
                    localizer={localizer}
                    events={events}
                    onNavigate={onNavigate}
                    onView={onView}
                    view={view as View}
                    defaultView='month'
                    defaultDate={currentDate}
                    onEventDrop={handleEventDrop}
                    onSelectEvent={handleSelectEvent}
                    draggableAccessor={() => true}
                    enableAutoScroll
                    popup
                    style={{ height: '600px' }}
                />
            </div>
            {selectedEvent && (
                <Dialog
                    open={true}
                    onOpenChange={(open) => {
                        if (!open) setSelectedEvent(null);
                    }}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Interview</DialogTitle>
                        </DialogHeader>
                        <InterviewForm
                            interviewId={selectedEvent.id}
                            isEditFromDialog={true}
                            onDialogClose={() => setSelectedEvent(null)}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default InterviewCalendar;
