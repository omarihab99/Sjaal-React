import React from 'react';

import { useNavigate } from 'react-router-dom';
import CustomCurrency from './CustomCurrency';

import cs from "../../Css/cartprice.module.css"
import Enlarge from './Enlarge';



interface CartTotalPriceProps {
    subtotal: number;
  }
const CartPrice : React.FC<CartTotalPriceProps>= ({ subtotal }) => {


const navigate = useNavigate();

const handleCheckout = () => {
    navigate('/checkout');
};
  
 
return (
    

    <div className="container justify-content-end flex-column align-items-end d-flex">
      <h6 style={{ fontFamily: "'Proza Libre', sans-serif", fontSize: '18px', fontWeight: 'lighter' }}>
        Subtotal <span style={{ fontSize: '15px', fontWeight: 'lighter', opacity: 0.8 }} className="m-2">
          <CustomCurrency value={subtotal} currency="EGP" />
        </span>
      </h6>
      <p
        style={{
          fontSize: '13px',
          fontWeight: 'lighter',
          fontFamily: "'Proza Libre', sans-serif",
          opacity: 0.8,
        }}
        className="mt-2"
      >
        Taxes and shipping calculated at checkout
      </p>
      <Enlarge>
      <button
        type="button"
        style={{ width: '350px', height: '50px' ,backgroundColor:"#d6c3b6" }}
        className={cs.button}
      <button
        type="button"
        style={{ width: '350px', height: '50px' ,backgroundColor:"#d6c3b6" }}
        className="button"
        onClick={handleCheckout}
      >
        Check out
      </button>
      </Enlarge>

    </div>
  );
};

export default CartPrice;
