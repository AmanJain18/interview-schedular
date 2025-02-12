import { z } from 'zod';

export const interviewFormSchema = z.object({
    candidateName: z.string().min(2, 'Candidate name is required'),
    interviewerName: z.string().min(2, 'Interviewer name is required'),
    type: z.enum(['Technical', 'HR', 'Behavioral'] as const, {
        required_error: 'Please select an interview type',
    }),
    date: z.string().min(1, 'Date is required'),
    timeSlot: z.string().min(1, 'Time slot is required'),
    status: z.enum(['scheduled', 'completed', 'cancelled'] as const).optional(),
});

export type TInterviewFormSchema = z.infer<typeof interviewFormSchema>;
