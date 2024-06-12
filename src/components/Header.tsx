import React from "react";
import { useState } from 'react';

import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import IconButton from "@mui/material/IconButton";
import { CartProduct as CartProductModel} from '../models/cart-product.model';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from "react-bootstrap";
import Sidebar from "./sidebar";
import { useSelector } from "react-redux";
const Header = () => {
  
    const products:CartProductModel[] = useSelector((state:any)=>state.cart.products);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (


        <Navbar bg="white" data-bs-theme="light">
            <div className="container-fluid mx-3">

                <IconButton onClick={handleShow}>
                    <span className="navbar-toggler-icon"></span>
                </IconButton>


                {/* Use the OffcanvasMenu component */}
                {/* <MainSection show={show} handleClose={handleClose} /> */}
                <Sidebar show={show} handleClose={handleClose} />

                <Nav.Link as={Link} to="/" className="navbar-brand m-auto">
                    <img
                        className=" img-fluid"
                        width="120"
                        height="24"
                        src="/images/new_logo.jpg"
                        alt=""
                    />
                </Nav.Link>


                {/* cart icon */}
                <Nav.Link as={Link} to="/cart" className="m-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="black"
                        className="bi bi-bag-check"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill="black"
                            // fill-rule="evenodd"
                            d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"
                        />
                        <path
                            fill="black"
                            d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"
                        />
                    </svg>
                    <span className="position-absolute translate-middle badge rounded-pill my-bg">
                        {products.length}
                    </span>
                </Nav.Link>
            </div>
        </Navbar>


    );
};

export default Header;
