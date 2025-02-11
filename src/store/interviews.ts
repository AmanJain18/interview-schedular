import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Interview, Interviewer, InterviewFormData } from '../types';

export const INTERVIEWERS = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Mary' },
    { id: '3', name: 'Alex' },
] as const;

export const WORKING_HOURS = {
    start: 9, // 9 AM
    end: 18, // 6 PM
};
interface InterviewStore {
    interviewers: Interviewer[];
    interviews: Interview[];
    addInterview: (interview: InterviewFormData) => void;
    updateInterview: (id: string, interview: Partial<Interview>) => void;
    deleteInterview: (id: string) => void;
    getInterviewById: (id: string) => Interview | undefined;
    getInterviewerById: (id: string) => Interviewer | undefined;
}

export const useInterviewStore = create<InterviewStore>()(
    persist(
        (set, get) => ({
            interviews: [],
            interviewers: [...INTERVIEWERS],
            addInterview: (interview) =>
                set((state) => ({
                    interviews: [
                        ...state.interviews,
                        {
                            ...interview,
                            id: crypto.randomUUID(),
                            status: 'scheduled',
                        },
                    ],
                })),
            updateInterview: (id, updatedInterview) =>
                set((state) => ({
                    interviews: state.interviews.map((interview) =>
                        interview.id === id
                            ? { ...interview, ...updatedInterview }
                            : interview,
                    ),
                })),
            deleteInterview: (id) =>
                set((state) => ({
                    interviews: state.interviews.filter(
                        (interview) => interview.id !== id,
                    ),
                })),
            getInterviewById: (id) =>
                get().interviews.find((interview) => interview.id === id),
            getInterviewerById: (id) =>
                get().interviewers.find((i) => i.id === id),
        }),
        {
            name: 'interview-storage',
        },
    ),
);
