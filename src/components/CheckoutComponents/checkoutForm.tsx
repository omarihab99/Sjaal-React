import React from 'react';

interface CheckoutFormProps {
  onShippingPriceChange: (price: number) => void;
  style?: React.CSSProperties;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onShippingPriceChange, style }) => {
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(event.target.value);
    onShippingPriceChange(price);
  };

  return (
    <div style={style}>
      <input type="number" placeholder="Enter shipping price" onChange={handleChange} />
      {/* Other form elements */}
    </div>
  );
};

export default CheckoutForm;
