import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Edit from './pages/Edit';
import Schedule from './pages/Schedule';
import Dashboard from './pages/Dashboard';
import Header from './components/layout/Header';
import { Toaster } from './components/ui/toaster';
function App() {
    return (
        <Router>
            <div className='min-h-screen bg-background'>
                <Header />
                <main className='container mx-auto'>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/schedule' element={<Schedule />} />
                        <Route path='/edit/:id' element={<Edit />} />
                    </Routes>
                </main>
                <Toaster />
            </div>
        </Router>
    );
}

export default App;
