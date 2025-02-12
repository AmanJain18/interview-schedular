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

export const useInterviewStore = create<InterviewStore>()(
    persist(
        (set, get) => ({
            interviews: [],
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

                // If the timeSlot is updated, recalculate endSlot; otherwise, retain the current endSlot
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
        },
    ),
);
