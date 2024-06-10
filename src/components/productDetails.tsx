import React, { useEffect, useState } from 'react';
import { IProduct } from '../models/IProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getProductbyId } from '../redux/slices/productSlice';
import styles from '../styles/productDetails.module.css';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const product: IProduct = useSelector((state: any) => state.products.product)
    const dispatch: any = useDispatch()
    const [clickedImage, setClickedImage] = useState("");
    const [desiredQuantity, setdesiredQuantity] = useState(0);
    const [choosenSize, setchoosenSize] = useState("");

    useEffect(() => {
        if(id){
            dispatch(getProductbyId(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setClickedImage(product.images[0]);
            setchoosenSize(product.availableSizes[0])
        }
    }, [product]);


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
        if (product.availableQuantaties > desiredQuantity) {
            setdesiredQuantity(desiredQuantity + 1);
        }
    }

    function addToCart(): void {

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
                            {/* | customCurrency:"EGP" */}
                            <p>{product.price}</p>
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
                                    <button type="button" className={`${styles.buyItNow} btn`} id="buyItNow">Buy it now</button>
                                </div>
                                <div>
                                    <p>{product.description}</p>
                                </div>

                                <div className="d-flex">
                                    <i className="bi bi-upload m-1"></i>

                                    <span className="m-1">Share</span>
                                </div>

                                <div className={styles.feedback}>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>

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
