import React, { useEffect } from 'react';
import ProductCard from '../ProductsPage/ProductsSection/ProductCard/productCard';
import { useSelector } from 'react-redux';
import { IProduct } from '../../models/IProduct';
import { useDispatch } from 'react-redux';
import { fetchLimitedCollectionProducts } from '../../redux/slices/productSlice';
import styles from '../../styles/recommendation.module.css'
const Recommendation = () => {
    const collectionProducts: IProduct[] = useSelector((state: any) => state.products.products)
    const product: IProduct = useSelector((state: any) => state.products.product);
    const dispatch: any = useDispatch();
    useEffect(() => {
        const collectionId = product.collectionId;
        dispatch(fetchLimitedCollectionProducts({collectionId:collectionId, limit:4}));
    }, );
    return (
        <div className={styles.youMayAlsoLike}>
            {collectionProducts.map((product)=>
                <ProductCard key={product.id} product={product}></ProductCard>
            )}
        </div>
    );
}

export default Recommendation;
