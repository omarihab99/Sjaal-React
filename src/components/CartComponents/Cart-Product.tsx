import React from 'react';
import { CartProduct as CartProductModel } from '../../models/cart-product.model';
import {incrementQuantity, decrementQuantity, removeProduct } from '../../redux/slices/CartSlice';
import CustomCurrency from './CustomCurrency'; 
import {productsDispatch} from '../../hooks/productsHook'
import '../../Css/cartproduct.css'
import { Link } from 'react-router-dom';
interface CartProductProps {
  product: CartProductModel;
  // onDelete: (productId: string) => void;
}

const CartProduct: React.FC<CartProductProps> = ({ product }) => {
const dispatch = productsDispatch();

  const handleIncrement = () => {
    console.log("incremmment by one in comp")
    dispatch(incrementQuantity(product.id));
  };
  
  const handleDecrement = () => {
    console.log("dec  in comp")
    dispatch(decrementQuantity(product.id));
  };
  
  const handleRemove = () => {
    dispatch(removeProduct(product.id));
    console.log("remove in comp")
    // onDelete(product.id);
  };

  return (
    <tr className="d-flex justify-content-between">
      <td className="m-3" style={{ width: '65%' }}>
        <div className="d-flex">
          <div style={{ paddingLeft: 0, paddingRight: 0 }}>
            <img style={{ height: '226px' }} src={product.image} alt={product.name} />
          </div>
          <div className="col d-flex flex-column ms-3">
            <Link to={`/product/${product.id}`} className="name">  {product.name}</Link>
            <span style={{ opacity: 0.8, fontSize: 'small', fontFamily: "'Proza Libre', sans-serif" }}>
              <CustomCurrency value={product.price} currency="EGP" />
            </span>
            {product.size && (
              <span className="mt-2" style={{ opacity: 0.8, fontFamily: "'Proza Libre', sans-serif", fontSize: 'small' }}>
                Size: {product.size}
              </span>
            )}
          </div>
        </div>
      </td>
      <td className="m-5 " style={{ width: '17.5%' }}>
        <div style={{ backgroundColor: 'white', border: '1px solid black', width: '138px', height: '50px',justifyContent:"center" }}>
          <button style={{ border: 0, backgroundColor: 'white' }} onClick={handleDecrement}>-</button>
          <span style={{ margin: '12px' }}>{product.quantity}</span>
          <button style={{ border: 0, backgroundColor: 'white' }} onClick={handleIncrement}>+</button>
        </div>
        <button className="rubish" onClick={handleRemove}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false" className="icon icon-remove">
            <path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" fill="currentColor"></path>
            <path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" fill="currentColor"></path>
          </svg>
        </button>
      </td>
      <td className="text-center m-5" style={{ width: '10%' }}>
        <CustomCurrency value={product.price * product.quantity} currency="EGP" />
      </td>
    </tr>
  );
};

export default CartProduct;
