import InterviewForm from '@/components/interviews/InterviewForm';
import { useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    return (
        <div className='max-w-2xl mx-auto space-y-8 mt-4'>
            <h1 className='text-xl font-semibold sm:text-4xl md:font-bold tracking-tight'>
                Schedule New Interview
            </h1>
            <InterviewForm interviewId={id} />
        </div>
    );
};

export default Edit;
