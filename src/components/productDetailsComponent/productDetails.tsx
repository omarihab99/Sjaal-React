import React, { useEffect, useState } from 'react';
import { IProduct } from '../../models/IProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getProductbyId, rateProduct } from '../../redux/slices/productSlice';
import styles from '../../styles/productDetails.module.css';
import { useParams } from 'react-router-dom';
import { CartProduct } from '../../models/cart-product.model';
import { addProductToCart, buyProductNow } from '../../redux/slices/CartSlice';
import CustomCurrency from '../CartComponents/CustomCurrency';

const ProductDetails = () => {
    const { id } = useParams();
    const product: IProduct = useSelector((state: any) => state.products.product)
    const dispatch: any = useDispatch()
    const [clickedImage, setClickedImage] = useState("");
    const [desiredQuantity, setdesiredQuantity] = useState(1);
    const [choosenSize, setchoosenSize] = useState("");
    const [avgRating, setAvgRating] = useState(0);
    const [hover, setHover] = useState(0);

    useEffect(() => {
        if (id) {
            dispatch(getProductbyId(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setClickedImage(product.images[0]);
            setchoosenSize(product.availableSizes[0])
            const avgRating = product.rates.reduce((acc, rate) => acc + rate, 0) / product.rates.length;            
            setAvgRating(avgRating);
        }
    }, [product]);

    const calcAvgRating = (rate:number)=>{

        const avgRating = product.rates.reduce((acc, rate) => acc + rate, 0) / product.rates.length;
        const rates = [...product.rates];
        rates.push(rate);        
      
        setAvgRating(avgRating);
        dispatch(rateProduct({ id: product.id, rates: rates}));
    }

    const changeImage = (image: string) => {
        setClickedImage(image)
    }

    function chooseSize(size: any) {
        setchoosenSize(size);
    }

    function decrease(): void {
        if (desiredQuantity > 0) {
            setdesiredQuantity(desiredQuantity - 1);
        }
    }

    function increase(): void {

        setdesiredQuantity(desiredQuantity + 1);

    }

    function addToCart(): void {
        const cartProduct: CartProduct = {
            id: product.id,
            collectionId: product.collectionId,
            name: product.name,
            price: product.price,
            size: choosenSize,
            quantity: desiredQuantity,
            image: product.images[0]
        }
        dispatch(addProductToCart(cartProduct));

    }

    const buyItNow = () => {
        const cartProduct: CartProduct = {
            id: product.id,
            collectionId: product.collectionId,
            name: product.name,
            price: product.price,
            size: choosenSize,
            quantity: desiredQuantity,
            image: product.images[0]
        }
        dispatch(buyProductNow(cartProduct));

    }

    return (
        <>
            <div>
                <div className={`d-flex justify-content-between container ${styles.all} m-3`}>
                    <div className="row mt-5">

                        <div className={`col-lg-6 ${styles.leftSection} ${styles.all}`}>

                            <div className={styles.clickedImageDiv}>
                                <img src={clickedImage} alt="clickedProductImage" className={`img-fluid ${styles.clickedImage}`} id="clickedImage" />
                            </div>

                            <div style={{ height: "30%" }}>
                                <ul className={`list-unstyled ${styles.ul}`}>
                                    {product?.images?.map((image) => (
                                        <li key={image} className={`${styles.li} ${clickedImage === image ? styles.selected : ''}`}>
                                            <img src={image} alt="productImage" onClick={() => changeImage(image)} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={`col-lg-6 ${styles.rightSection}`}>
                            {/* <!-- <p>SJAAL</p> --> */}
                            <h1>{product.name}</h1>

                            <CustomCurrency value={product.price} currency="EGP" />

                            <div>
                                <label>Size</label>
                                <div>
                                    {product?.availableSizes?.map((size) =>
                                        <button key={size} className={choosenSize === size ? "btn btn-dark m-1 rounded-pill" : "btn btn-outline-dark m-1 rounded-pill"}
                                            onClick={() => chooseSize(size)}> {size}</button>
                                    )}

                                </div>
                            </div>


                            <div>
                                <label>Quantity</label>
                                <div className={styles.quantity}>

                                    <input type="button" value="-" onClick={decrease} />
                                    <span>{desiredQuantity}</span>
                                    <input type="button" value="+" onClick={increase} />
                                </div>

                                <div className={styles.buttons}>
                                    <button onClick={addToCart} type="button" className={`${styles.addToCart} btn`} id="addToCart" >Add to cart</button>
                                    <button onClick={buyItNow} type="button" className={`${styles.buyItNow} btn`} id="buyItNow">Buy it now</button>
                                </div>
                                <div>
                                    <p>{product.description}</p>
                                </div>

                                <div className="d-flex">
                                    <i className="bi bi-upload m-1"></i>

                                    <span className="m-1">Share</span>
                                </div>

                                <div className={styles.feedback}>
                                    {[...Array(5)].map((_, index) => {
                                        const starRating = index + 1;
                                        return (
                                            <i
                                                key={index}
                                                className={`bi ${starRating <= (hover || avgRating) ? 'bi-star-fill' : 'bi-star'}`}
                                                onClick={() => calcAvgRating(starRating)}
                                                onMouseEnter={() => setHover(starRating)}
                                                onMouseLeave={() => setHover(avgRating)}
                                                style={{ cursor: 'pointer', color: starRating <= (hover || avgRating) ? 'black' : '#e4e5e9' }}
                                            ></i>
                                        );
                                    })}
                                </div>
                                <p>Average Rating: {avgRating}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*
    <div className="m-3">
        <!-- You may also like component-->
        <h2>You May Also Like</h2>
        <app-recommendation className="youMayAlsoLike"></app-recommendation>
    </div> 
*/}
        </>

    )
};
export default ProductDetails;
