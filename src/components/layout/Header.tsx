import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='border-b'>
            <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
                <Link to='/' className='text-xl font-bold'>
                    Interview Scheduler
                </Link>
            </div>
        </header>
    );
};

export default Header;
