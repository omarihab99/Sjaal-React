import React from 'react';
import { Link } from 'react-router-dom';
import clas from "../../Css/CartEmpty.module.css"
import Enlarge from './Enlarge';



const CartEmpty = () => {
    return (
        <div>
            <div className="d-flex justify-content-center flex-column" style={{ marginTop: '100px' }}>
            <h1 className="text-center mb-5">Your Cart Is Empty!</h1>
            <Link to="/">
            <Enlarge>
                <button type="submit" style={{ width: '270px', height: '50px', margin: '0 auto' }} className={clas.button}>
                    Continue Shopping
                </button>
            </Enlarge>

            </Link>
            <br/><br/><br/>
        </div>
        </div>
    );
}

export default CartEmpty;
