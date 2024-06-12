import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedReduxHooks';
import { fetchCategories } from '../redux/slices/categorySlice';
import MainSection from '../components/Home/MainSection';
import ShowCategories from '../components/Home/showCategories';
import FeedbackForm from '../components/Feedback';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories.categories);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  
  return (
    <div>
      <MainSection />
      <ShowCategories />
      <FeedbackForm />
    </div>
  );
};

export default HomePage;
