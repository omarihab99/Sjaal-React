import React, { ChangeEvent, useState } from 'react';
import { governorateArr } from '../utils/governorateArr';
import { shippingMethodArr } from '../utils/shippingMethodArr';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from '../styles/CheckoutForm.module.css';

interface Order {
    email: string;
    notifyMe: boolean;
    country: string;
    fName: string;
    lName: string;
    address: string;
    apartment: string;
    city: string;
    governorate: string;
    pCode: string;
    phone: string;
    nextTime: boolean;
    shippingCity: string;
    sameAddress: boolean;
}

const CheckoutForm: React.FC = () => {
    const [order, setOrder] = useState<Order>({
        email: "",
        notifyMe: false,
        country: "Egypt",
        fName: "",
        lName: "",
        address: "",
        apartment: "",
        city: "",
        governorate: "AST",
        pCode: "",
        phone: "",
        nextTime: false,
        shippingCity: "",
        sameAddress: false
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setOrder({
                ...order,
                [name]: checked
            });
        } else {
            setOrder({
                ...order,
                [name]: value
            });
        }
    };
    const handelSubmit = ()=>{
        console.log(order);
        
    }

    return (
        <div className="container">
            <form>
                <div className=" mt-5">
                    <h5 className='text-start'>Contact</h5>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Email or mobile phone number"
                        name="email"
                        value={order.email}
                        onChange={handleChange}
                    />
                    <div className="form-check mt-3 d-flex align-items-center">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="notifyMe"
                            checked={order.notifyMe}
                            onChange={handleChange}
                        />
                        <label className="form-check-label ms-2">
                            Email me with news and offers
                        </label>
                    </div>
                    
                    <h5 className="text-start mt-3">Delivery</h5>
                    <div className="form-floating mb-3">
                        <select
                            className="form-select"
                            id="floatingSelect"
                            name="country"
                            value={order.country}
                            onChange={handleChange}
                        >
                            <option value="Egypt">Egypt</option>
                        </select>
                        <label htmlFor="floatingSelect">Country/Region</label>
                    </div>

                    <div className="row">
                        <div className="col">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="First name"
                                name="fName"
                                value={order.fName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Last name"
                                name="lName"
                                value={order.lName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <input
                        className="form-control mt-3"
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={order.address}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mt-3"
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                        name="apartment"
                        value={order.apartment}
                        onChange={handleChange}
                    />

                    <div className="row mt-3">
                        <div className="col">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="City"
                                name="city"
                                value={order.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col">
                            <div className="form-floating">
                                <select
                                    className="form-select"
                                    id="floatingSelectGovernorate"
                                    name="governorate"
                                    value={order.governorate}
                                    onChange={handleChange}
                                >
                                    {governorateArr.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.option}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="floatingSelectGovernorate">Governorate</label>
                            </div>
                        </div>
                        <div className="col">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Postal code"
                                name="pCode"
                                value={order.pCode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <input
                        className="form-control mt-3"
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        value={order.phone}
                        onChange={handleChange}
                    />

                    <div className="form-check mt-3 d-flex align-items-center">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="nextTime"
                            checked={order.nextTime}
                            onChange={handleChange}
                        />
                        <label className="form-check-label ms-2">
                            Save this information for next time
                        </label>
                    </div>

                    <h6 className=" text-start mt-4">Shipping method</h6>
                    {shippingMethodArr.map((method) => (
                        <div className="form-check d-flex" key={method.id}>
                            <input
                                className="form-check-input me-2"
                                type="radio"
                                name="shippingCity"
                                id={method.id}
                                value={method.value}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor={method.id}>
                                {method.value} - {method.price} EGP
                            </label>
                        </div>
                    ))}

                    <h5 className=" text-start mt-4">Payment</h5>
                    <p  className =" text-start"style={{color: 'rgb(155, 150, 150)',fontWeight: 300} }>All transactions are secure and encrypted.</p>

                    <div className="form-check d-flex">
                        <input
                            className="form-check-input me-2"
                            type="radio"
                            id="billing1"
                            name="sameAddress"
                            value="true"
                            checked={order.sameAddress}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="billing1">
                            Same as shipping address
                        </label>
                    </div>
                    <div className="form-check d-flex">
                        <input
                            className="form-check-input me-2"
                            type="radio"
                            id="billing2"
                            name="sameAddress"
                            value="false"
                            checked={!order.sameAddress}
                            onChange={handleChange}
                        />
                        <label className="form-check-label " htmlFor="billing2">
                            Use a different billing address
                        </label>
                    </div>

                    <div className="text-center mt-4 ">
                    <button
                                type="button"
                                className="btn "
                                data-bs-dismiss="modal"
                                style={{backgroundColor: "#1773b0", width: '100%',color: "white" , fontWeight: 'bold' }}
                               onClick={handelSubmit}
                            >
                            Complete order
                        </button>
                    </div>
                </div>
            </form>

            <div className="modal fade" id="exampleModalCenter" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center" style={{ color: 'green', fontWeight: 'bold' }}>
                            Your order has been completed successfully &#8730;
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn "
                                data-bs-dismiss="modal"
                                style={{backgroundColor: "#1773b0", width: '100%',color: "white" , fontWeight: 'bold' }}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
