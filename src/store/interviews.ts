import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Interview, Interviewer, InterviewFormData } from '../types';
import { INTERVIEWERS } from '@/lib/constant';
import { TInterviewFormSchema } from '@/lib/schema';

interface InterviewStore {
    interviewers: Interviewer[];
    interviews: Interview[];
    addInterview: (interview: InterviewFormData) => void;
    updateInterview: (
        id: string,
        interview: Partial<TInterviewFormSchema>,
    ) => void;
    deleteInterview: (id: string) => void;
    getInterviewById: (id: string) => Interview | undefined;
    getInterviewerById: (id: string) => Interviewer | undefined;
}

const calculateEndSlot = (timeSlot: string): string => {
    const [hourStr, minute] = timeSlot.split(':');
    let hour = parseInt(hourStr, 10);
    hour += 1;
    const newHourStr = hour.toString().padStart(2, '0');
    return `${newHourStr}:${minute}`;
};

const defaultInterviews: Interview[] = [
    {
        candidateName: 'Test Name 1',
        interviewerName: 'John Doe',
        type: 'Technical',
        date: '2025-02-14',
        timeSlot: '10:00',
        id: '2858af15-53a0-4d4a-900f-aba1159d696b',
        status: 'cancelled',
        endSlot: '11:00',
    },
    {
        candidateName: 'Test Name 2',
        interviewerName: 'Mary',
        type: 'Behavioral',
        date: '2025-02-12',
        timeSlot: '14:00',
        id: '3dd7695b-83fe-441b-9ae6-0cb5b1f6dc95',
        status: 'completed',
        endSlot: '15:00',
    },
    {
        candidateName: 'Test Name 3',
        interviewerName: 'Alex',
        type: 'Technical',
        date: '2025-02-18',
        timeSlot: '15:00',
        id: 'c354b2ff-bed8-4f82-bc27-32d51b208a61',
        status: 'scheduled',
        endSlot: '16:00',
    },
];

export const useInterviewStore = create<InterviewStore>()(
    persist(
        (set, get) => ({
            interviews: defaultInterviews,
            interviewers: [...INTERVIEWERS],
            addInterview: (interview) => {
                set((state) => ({
                    interviews: [
                        ...state.interviews,
                        {
                            ...interview,
                            id: crypto.randomUUID(),
                            status: 'scheduled',
                            endSlot: calculateEndSlot(interview.timeSlot),
                        },
                    ],
                }));
            },
            updateInterview: (id, updatedInterview) => {
                const interview = get().interviews.find((i) => i.id === id);
                if (!interview) return;

                const newEndSlot = updatedInterview.timeSlot
                    ? calculateEndSlot(updatedInterview.timeSlot)
                    : interview.endSlot;

                set((state) => ({
                    interviews: state.interviews.map((i) =>
                        i.id === id
                            ? { ...i, ...updatedInterview, endSlot: newEndSlot }
                            : i,
                    ),
                }));
            },
            deleteInterview: (id) =>
                set((state) => ({
                    interviews: state.interviews.filter((i) => i.id !== id),
                })),
            getInterviewById: (id) => get().interviews.find((i) => i.id === id),
            getInterviewerById: (id) =>
                get().interviewers.find((i) => i.id === id),
        }),
        {
            name: 'interview-storage',
            onRehydrateStorage: () => (state) => {
                if (!state || state.interviews.length === 0) {
                    return {
                        interviews: defaultInterviews,
                        interviewers: [...INTERVIEWERS],
                    };
                }
            },
        },
    ),
);
