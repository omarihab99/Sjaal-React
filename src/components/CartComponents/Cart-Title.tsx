import React from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Cart-Title.css'
const CartTitle = () => {
    return (
        <div >
            <h1 >Your Order</h1>
            <Link to="" className="top-right-title">Continue shopping</Link>
        </div>
    );
}

export default CartTitle;
