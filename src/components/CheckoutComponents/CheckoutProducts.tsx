import React, { useEffect, useState } from 'react';
import CustomCurrency from '../CartComponents/CustomCurrency';
import cla from "../../Css/checkoutProducts.module.css";
import { productsDispatch, productsSelector } from '../../hooks/productsHook';
import { calculateCheckoutTotal, calculateTotal, getProducts} from '../../redux/slices/CartSlice';
// import discountCodes from '../../Data/discountCodes.json';
import { useSelector } from 'react-redux';
import { CartProduct } from '../../models/cart-product.model';

interface CheckoutProductsProps {
  shippingPrice: number;
}

const CheckoutProducts: React.FC<CheckoutProductsProps> = ({ shippingPrice }) => {
 

  const dispatch = productsDispatch();

  const { products, subtotal, total } = useSelector((state:any) => state.cart);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  interface DiscountCodes {
    [key: string]: number;
  }
  
  const discountCodes: DiscountCodes = {
    DISCOUNT10: 10,
    SUMMER15: 15,
    WINTER20: 20,
    SPRING5: 5,
    FALL25: 25,
    HAJAR: 50, // just an example, adjust the values as per your requirements
  };
  useEffect(() => {
    dispatch(calculateTotal());
    dispatch(calculateCheckoutTotal(shippingPrice));
  },);

  const applyDiscount = () => {
    const discountValue = discountCodes[discountCode];
    if (discountValue) {
      setDiscountAmount(discountValue);
      setDiscountApplied(true);
    } else {
      alert('Invalid discount code!');
    }
  };

  const clearDiscount = () => {
    setDiscountAmount(0);
    setDiscountApplied(false);
    setDiscountCode('');
  };

  return (
    <div className="container p-5 " style={{ marginTop: '5%', paddingRight: '0px',backgroundColor:"#f5f5f5"  }}>
      <div className="row">
        <div>
          {products.map((product:CartProduct, index:number) => (
            <div key={index} className="product d-flex justify-content-between mt-5">

              <div className="productData d-flex">

                <div className='d-flex justify-content-center' style={{ width: '100px', height: '120px', border: '1px solid #d3d4d5', borderRadius: '10%' }}>
                  <img className="img-fluid" src={product.image} alt=''style={{width:"80%"}}/>
                </div>
                <div className={cla.favoritecounter}>
                  {product.quantity}
                </div>
                <div className="productDetails ms-3 d-flex flex-column  ">
                  <span>{product.name}</span>
                 { product.size && <span style={{color:"#b4b4b4"}}>{product.size}</span>}
                </div>
              </div>
              <div className="productPrice d-flex justify-content-center " >
                <p>E£<CustomCurrency value={product.price * product.quantity} currency="EGP" /></p>
              </div>
            </div>
          ))}
          <div className="discountCode d-flex mb-3 mt-3">
            <input type="text" className="form-control me-2" placeholder="Discount code" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
            <button className="btn w-25" id="apply" style={{ backgroundColor: '#d3d4d5' }} onClick={applyDiscount}>Apply</button>
            {discountApplied && <button className="btn btn-danger w-25" onClick={clearDiscount}>Clear</button>}
          </div>
          <div className="price">
            <div className="subtotal d-flex justify-content-between">
              <p>Subtotal</p>
              <p className={cla.bold}>E£<CustomCurrency value={subtotal} currency="EGP" /></p>
            </div>
            {discountApplied && (
              <div className="discount d-flex justify-content-between">
                <p>Discount</p>
                <p className={cla.bold}>- E£<CustomCurrency value={discountAmount} currency="EGP" /></p>
              </div>
            )}
            <div className="shipping d-flex justify-content-between">
              <p>Shipping</p>
              <p className={cla.bold}>E£<CustomCurrency value={shippingPrice} currency="EGP" /></p>
            </div>
            <div className="total d-flex justify-content-between" style={{ fontSize: 'larger' }}>
              <p className={cla.bold}>Total</p>
              <p className={cla.bold}>E£<CustomCurrency value={total - discountAmount} currency="EGP" /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProducts;
