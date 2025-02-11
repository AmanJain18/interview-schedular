
import InterviewForm from '@/components/interviews/InterviewForm';


const Schedule = () => {
    return (
        <div className='max-w-2xl mx-auto space-y-8 mt-4'>
            <h1 className='text-xl font-semibold sm:text-4xl md:font-bold tracking-tight'>
                Schedule New Interview
            </h1>
            <InterviewForm />
        </div>
    );
};

export default Schedule;
