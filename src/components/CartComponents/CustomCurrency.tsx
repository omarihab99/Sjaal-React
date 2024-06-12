import React from 'react';

interface CustomCurrencyProps {
  value: number;
  currency: string;
}

const CustomCurrency: React.FC<CustomCurrencyProps> = ({ value, currency }) => {
  
  const validValue = value ?? 0;

  return (
    <span>
      {validValue.toFixed(2)} {currency}
    </span>
  );
};

export default CustomCurrency;
