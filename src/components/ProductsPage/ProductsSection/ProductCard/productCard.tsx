
import { useEffect, useRef } from "react";
import { IProduct } from "../../../../models/IProduct";
import "./productCard.css";
import CustomCurrency from "../CustomCurrency";
import { Link } from "react-router-dom";

const ProductCard = ({product}:{product:IProduct}) => {
        const myImgRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const handleMouseOver = () => {
                if (myImgRef.current) {
                    myImgRef.current.style.backgroundImage = `url(${product.images[1]})`;
                }
            };
    
            const handleMouseOut = () => {
                if (myImgRef.current) {
                    myImgRef.current.style.backgroundImage = `url(${product.images[0]})`;
                }
            };
    
            const myImg = myImgRef.current;
    
            if (myImg) {
                myImg.addEventListener('mouseover', handleMouseOver);
                myImg.addEventListener('mouseout', handleMouseOut);
            }
    
            return () => {
                if (myImg) {
                    myImg.removeEventListener('mouseover', handleMouseOver);
                    myImg.removeEventListener('mouseout', handleMouseOut);
                }
            };
        }, [product]);
    
    return (
        <div>
            <div className="container">
                {/* width: "18rem", */}
        <div className="card" style={{borderRadius: "0%",border: "none",width: 305}}>
           
                       <div id="productImg"
                       ref={myImgRef}
                                className="card-img-top img-fluid"
                                style={{backgroundImage: `url(${product.images[0]})`,height: 350,borderRadius: "0%"}}>

                        </div>

                <div className="card-body" style={{paddingLeft: "0%",fontSize: 14,paddingRight: "0%"}}>
                        <p id="title" className="card-title"
                                style={{fontWeight: 400, fontFamily: "'Proza Libre', sans-serif"}}>
                                {product.name}
                                </p>
                         {/* currency pipe */}
                        <p className="card-text">
                           LE <CustomCurrency value={product.price} currency={"EGP"}></CustomCurrency>
                                
                            </p>
                       
                        <Link to={`/products/${product.id}`}
                                style={{width: "100%",borderRadius: "0%",fontSize: "1.02rem",fontWeight: 400,height:45,paddingTop:9}}
                                className="btn btn-outline-dark">choose options</Link>
                        
                </div>
        </div>
</div>
        </div>
    );
};

export default ProductCard;