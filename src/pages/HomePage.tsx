import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import FeedbackForm from '../components/Feedback';
import React, { useEffect } from 'react';
import ShowCategories from '../components/Home/showCategories';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedReduxHooks';
import { fetchCategories } from '../redux/slices/categorySlice';
import MainSection from '../components/Home/MainSection';



const HomePage = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categories.categories);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    return (
        <div className='my-main'>
                <Outlet></Outlet>
           <Header/>
            <div className='my-content'>
                <MainSection/>


                <ShowCategories />

                <FeedbackForm></FeedbackForm>


            </div>
            <Footer />
        </div>
    );
}



export default HomePage;
