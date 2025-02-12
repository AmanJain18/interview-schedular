import React, { useCallback, useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useInterviewStore } from '@/store/interviews';
import { CalendarEvent } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { WORKING_HOURS } from '@/lib/constant';

// Wrap the Calendar with drag and drop functionality.
const DnDCalendar = withDragAndDrop(Calendar);

// Set up locales for the localizer.
const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const InterviewCalendar: React.FC = () => {
    const [view, setView] = useState<string>(Views.WEEK);
    const [date, setDate] = useState(new Date());

    const onNavigate = useCallback(
        (newDate: React.SetStateAction<Date>) => setDate(newDate),
        [setDate],
    );
    const onView = useCallback(
        (newView: string | ((prevState: 'week') => 'week')) => setView(newView),
        [setView],
    );
    const { interviews, updateInterview } = useInterviewStore();
    const { toast } = useToast();

    const events = interviews.map((interview) => {
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

    // Handler for event drop.
    const handleEventDrop = useCallback(
        ({ event, start }: { event: CalendarEvent; start: Date }) => {
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

            updateInterview(event.id, {
                date: newDate,
                timeSlot: newTimeSlot,
            });

            toast({
                title: 'Interview Updated',
                description:
                    'The interview schedule has been updated successfully.',
            });
        },
        [updateInterview, toast],
    );

    return (
        <div style={{ height: 600 }}>
            <DnDCalendar
                localizer={localizer}
                events={events}
                onNavigate={onNavigate}
                onView={onView}
                view={view}
                defaultView='month'
                defaultDate={date}
                onEventDrop={handleEventDrop}
                draggableAccessor={() => true}
                enableAutoScroll
                popup
                style={{ height: '600px' }}
            />
        </div>
    );
};

export default InterviewCalendar;
