import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import FeedbackForm from '../components/Feedback';
import CheckoutForm from '../components/CheckoutForm';
import React, { useEffect } from 'react';
import MainSection from '../components/Home/MainSection';
import ShowCategories from '../components/Home/showCategories';
import { useAppDispatch , useAppSelector } from '../hooks/useTypedReduxHooks';
import { fetchCategories } from '../redux/slices/categorySlice';
import Sidebar from '../components/sidebar';


const HomePage = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categories.categories);
    useEffect(() => {
        dispatch(fetchCategories());
    },[]);
    return (
        <div className='my-main'>
            <Header />
            <div className='my-content'>
            {/* <Sidebar /> */}
            {/* <MainSection />
            <ShowCategories /> */}
                <Outlet></Outlet>
                <CheckoutForm/>
                {/* <FeedbackForm></FeedbackForm> */}
                
                
            </div>
            <Footer />
        </div>
    );
}



export default HomePage;
