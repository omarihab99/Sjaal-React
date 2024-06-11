import React from 'react';
import { Link } from 'react-router-dom';
import classes from "../../Css/Cart-Title.module.css"
const CartTitle = () => {
    return (
        <div >
            <h1 >Your Order</h1>
            <Link to="/" className={classes.top}>Continue shopping</Link>
        </div>
    );
}

export default CartTitle;
