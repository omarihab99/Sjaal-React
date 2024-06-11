import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import FeedbackForm from '../components/Feedback';
import CheckoutForm from '../components/CheckoutForm';

const HomePage = () => {
    return (
        <div className='my-main'>
            <Header />
            <div className='my-content'>
                <Outlet></Outlet>
                <CheckoutForm/>
                {/* <FeedbackForm></FeedbackForm> */}
                
                
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
