
import React, { useEffect } from 'react';
import { calculateTotal, getProducts } from '../../redux/slices/CartSlice';
import CartPrice from './Cart-Price';
import CartTitle from './Cart-Title';
import YourCartEmpty from './CartEmpty';
import { productsDispatch, productsSelector } from '../../hooks/productsHook';
import { useSelector } from 'react-redux';
import { IProduct } from '../../models/IProduct';
import { CartProduct as CartProductModel} from '../../models/cart-product.model';
import CartProduct from './Cart-Product';


const CartProducts: React.FC = () => {
  const dispatch= productsDispatch();
  // const { products, subtotal } = productsSelector((state) => state.cart);
  const products:CartProductModel[] = useSelector((state:any)=>state.cart.products);
  const subtotal:number= useSelector((state:any)=>state.cart.subtotal);
  

  useEffect(() => {
    dispatch(calculateTotal());
  }, );

  
  

 
  if (products.length === 0) {
    return <YourCartEmpty />;
  }

  return (
    <div className="mb-5 ">
      <CartTitle />
      <div>
        <table style={{ width: '100%', textAlign: 'left' }}>
          <thead style={{ borderBottom: '1px solid rgb(223, 217, 217)', opacity: 0.6, fontFamily: "'Proza Libre', sans-serif", fontSize: '9px', fontWeight: 'normal' }}>
            <tr className="d-flex justify-content-between">
              <td style={{ width: '60%' }}>PRODUCT</td>
              <td style={{ width: '15%' }}>QUANTITY</td>

              <td style={{ width: '10%' }}>TOTAL</td>
            </tr>
          </thead>
          <tbody className="m-5">
            {products.map((product) => (
              <CartProduct key={product.id} product={product}  />
            ))}
          </tbody>
          
         
            <tfoot style={{ borderBottom: '1px solid rgb(223, 217, 217)' }} className="m-5">
           <tr>
             <td > 
             <span></span>
              </td>
  </tr>
</tfoot>
      
        </table>
      </div>
      <br /><br /><br />
      <CartPrice subtotal={subtotal} />
      <br /><br /><br /><br />
    </div>
  );
};

export default CartProducts;
