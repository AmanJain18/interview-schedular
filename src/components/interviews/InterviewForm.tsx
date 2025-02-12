import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useInterviewStore } from '@/store/interviews';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { interviewFormSchema, TInterviewFormSchema } from '@/lib/schema';
import DateTimePicker from './DateTimePicker';
import { format } from 'date-fns';

interface InterviewFormProps {
    interviewId?: string;
}

export default function InterviewForm({ interviewId }: InterviewFormProps) {
    const { addInterview, updateInterview, getInterviewById, interviewers } =
        useInterviewStore();
    const navigate = useNavigate();
    const { toast } = useToast();

    // If editing, load existing interview; otherwise, start with empty fields.
    const existingInterview = interviewId
        ? getInterviewById(interviewId)
        : undefined;

    const form = useForm<TInterviewFormSchema>({
        resolver: zodResolver(interviewFormSchema),
        defaultValues: existingInterview
            ? {
                  candidateName: existingInterview.candidateName,
                  interviewerName: existingInterview.interviewerName,
                  type: existingInterview.type,
                  date: format(existingInterview.date, 'yyyy-MM-dd'),
                  timeSlot: existingInterview.timeSlot,
                  status: existingInterview.status!,
              }
            : {
                  candidateName: '',
                  interviewerName: '',
                  type: 'Technical',
                  date: '',
                  timeSlot: '',
              },
    });

    const onSubmit = (data: TInterviewFormSchema) => {
        try {
            if (existingInterview) {
                updateInterview(existingInterview.id, data);
                toast({
                    title: 'Interview Updated',
                    description: 'The interview has been successfully updated.',
                });
            } else {
                addInterview(data);
                toast({
                    title: 'Interview Scheduled',
                    description:
                        'The interview has been successfully scheduled.',
                });
            }
            navigate('/');
        } catch (err) {
            if (err) {
                toast({
                    title: 'Error',
                    description: 'There was an error saving the interview.',
                    variant: 'destructive',
                });
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                {/* Candidate Name */}
                <FormField
                    control={form.control}
                    name='candidateName'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Candidate Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter candidate name'
                                    required
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Interviewer Selection */}
                <FormField
                    control={form.control}
                    name='interviewerName'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Interviewer</FormLabel>
                            <Select
                                value={field.value}
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    // Reset date and time when interviewer changes.
                                    form.setValue('date', '');
                                    form.setValue('timeSlot', '');
                                }}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select interviewer' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {interviewers.map((interviewer) => (
                                        <SelectItem
                                            key={interviewer.id}
                                            value={interviewer.name}
                                        >
                                            {interviewer.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Interview Type */}
                <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Interview Type</FormLabel>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select interview type' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='Technical'>
                                        Technical
                                    </SelectItem>
                                    <SelectItem value='HR'>HR</SelectItem>
                                    <SelectItem value='Behavioral'>
                                        Behavioral
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {existingInterview && (
                    <FormField
                        control={form.control}
                        name='status'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Interview Status</FormLabel>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select interview status' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='scheduled'>
                                            Scheduled
                                        </SelectItem>
                                        <SelectItem value='completed'>
                                            Completed
                                        </SelectItem>
                                        <SelectItem value='cancelled'>
                                            Cancelled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {/* Combined Date & Time Picker */}
                <div className='space-y-4'>
                    <FormLabel>Date & Time</FormLabel>
                    {form.watch('interviewerName') ? (
                        <DateTimePicker
                            selectedDate={form.watch('date')}
                            selectedTime={form.watch('timeSlot')}
                            selectedInterviewer={form.watch('interviewerName')}
                            onDateChange={(date) => form.setValue('date', date)}
                            onTimeChange={(time) =>
                                form.setValue('timeSlot', time)
                            }
                        />
                    ) : (
                        <p className='text-sm text-muted-foreground'>
                            Please select an interviewer first
                        </p>
                    )}
                </div>

                {/* Submit and Cancel Buttons */}
                <div className='flex gap-4'>
                    <Button type='submit'>
                        {existingInterview
                            ? 'Update Interview'
                            : 'Schedule Interview'}
                    </Button>
                    <Button
                        type='button'
                        variant='outline'
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    );
}
