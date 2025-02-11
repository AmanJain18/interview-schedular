export type InterviewType = 'Technical' | 'HR' | 'Behavioral';
export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled';

export interface Interview {
    id: string;
    candidateName: string;
    interviewerName: string;
    date: string; // "YYYY-MM-DD"
    timeSlot: string; // "HH:mm"
    type: InterviewType;
    status: InterviewStatus;
    notes?: string;
}

export interface Interviewer {
    id: string;
    name: string;
}

export type InterviewFormData = Omit<Interview, 'id' | 'status'>;
