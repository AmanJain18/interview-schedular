import { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InterviewTable } from '@/components/interviews/InterviewTable';
import InterviewCalendar from '@/components/interviews/InterviewCalendar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useInterviewStore } from '@/store/interviews';
import { INTERVIEWERS } from '@/lib/constant';

const Dashboard = () => {
    const navigate = useNavigate();
    const { interviews } = useInterviewStore();

    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [interviewerFilter, setInterviewerFilter] = useState<string | 'all'>(
        'all',
    );

    // Filter interviews based on the selected filters
    const filteredInterviews = useMemo(() => {
        return interviews
            .filter((interview) => {
                const matchesStatus =
                    statusFilter === 'all' || interview.status === statusFilter;
                const matchesInterviewer =
                    interviewerFilter === 'all' ||
                    interview.interviewerName === interviewerFilter;
                return matchesStatus && matchesInterviewer;
            })
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
            );
    }, [interviews, statusFilter, interviewerFilter]);

    return (
        <div className='space-y-8 mt-4'>
            <div className='flex justify-between items-center gap-2'>
                <h1 className='text-xl font-semibold sm:text-4xl md:font-bold tracking-tight'>
                    Dashboard
                </h1>
                <Button
                    onClick={() => navigate('/schedule')}
                    className='bg-blue-500 font-medium'
                >
                    <Plus className='mr-2 size-4' /> Schedule Interview
                </Button>
            </div>

            <Tabs defaultValue='list' className='w-full space-y-8'>
                <TabsList>
                    <TabsTrigger value='list'>List View</TabsTrigger>
                    <TabsTrigger value='calendar'>Calendar View</TabsTrigger>
                </TabsList>

                <TabsContent value='list'>
                    <div className='flex gap-4 mb-4'>
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className='w-[200px]'>
                                <SelectValue placeholder='Filter by Status' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>All</SelectItem>
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

                        <Select
                            value={interviewerFilter}
                            onValueChange={setInterviewerFilter}
                        >
                            <SelectTrigger className='w-[200px]'>
                                <SelectValue placeholder='Filter by Interviewer' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>All</SelectItem>
                                {INTERVIEWERS.map((interviewer) => (
                                    <SelectItem
                                        key={interviewer.id}
                                        value={interviewer.name}
                                    >
                                        {interviewer.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <InterviewTable interviews={filteredInterviews} />
                </TabsContent>

                <TabsContent value='calendar'>
                    <InterviewCalendar />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Dashboard;
