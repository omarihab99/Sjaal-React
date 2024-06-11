import React, { useState } from 'react';
import CheckoutForm from './CheckoutForm'; 
import CheckoutProducts from './CheckoutProducts'; 


const Checkout: React.FC = () => {
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  

  const handleShippingPriceChange = (price: number) => {
    setShippingPrice(price);
  };

  return (
    <div className="d-flex checkout container">
      <CheckoutForm  style={{ width: '100%' }} onShippingPriceChange={handleShippingPriceChange} />
      <CheckoutProducts shippingPrice={shippingPrice} />
    </div>
  );
};

export default Checkout;
