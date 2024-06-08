import React, {useEffect} from 'react';
import {fetchCategories} from '../../redux/slices/categorySlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedReduxHooks';
import CategorySection from './categorySection';
const ShowCategories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categories.categories);
    useEffect(() => {
        dispatch(fetchCategories());
    },[])
    return (
        <>
            {categories.map(category => <CategorySection category={category} key={category.id}/>) }
        </>
    );
}

export default ShowCategories;
