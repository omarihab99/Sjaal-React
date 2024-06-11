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
        <div>
            <Sidebar />
            {/* <MainSection />
            <ShowCategories /> */}
        </div>
    );
}

export default HomePage;
