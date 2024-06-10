import React from 'react';
import { Link } from 'react-router-dom';



const CartEmpty = () => {
    return (
        <div>
            <div className="d-flex justify-content-center flex-column" style={{ marginTop: '100px' }}>
            <h1 className="text-center mb-5">Your Cart Is Empty!</h1>
            <Link to="/">
                <button type="submit" style={{ width: '270px', height: '50px', margin: '0 auto' }} className="button">
                    Continue Shopping
                </button>
            </Link>
            <br/><br/><br/>
        </div>
        </div>
    );
}

export default CartEmpty;
