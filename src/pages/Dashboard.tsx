import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InterviewTable } from '@/components/interviews/InterviewTable';

const Dashboard = () => {
    const navigate = useNavigate();

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
                    <InterviewTable />
                </TabsContent>
                {/*                 
                <TabsContent value='calendar'>
                    <InterviewCalendar />
                </TabsContent> */}
            </Tabs>
        </div>
    );
};

export default Dashboard;
