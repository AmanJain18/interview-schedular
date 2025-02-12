export type InterviewType = 'Technical' | 'HR' | 'Behavioral';
export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled';

export interface Interview {
    id: string;
    candidateName: string;
    interviewerName: string;
    type: InterviewType;
    status: InterviewStatus;
    date: string; // "YYYY-MM-DD"
    timeSlot: string; // "HH:mm"
    endSlot: string;
}

export interface Interviewer {
    id: string;
    name: string;
}

export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
}

export type InterviewFormData = Omit<Interview, 'id' | 'status' | 'endSlot'>;
