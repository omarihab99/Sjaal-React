
import { IProduct } from "../../../../models/IProduct";
import "./productCard.css";

const ProductCard = ({product}:{product:IProduct}) => {

       let myImg=document.getElementById("productImg");

       myImg!.addEventListener("mouseover", function() {
        myImg!.style.backgroundImage = `url(${product.images[1]})`;
       });

       myImg!.addEventListener('mouseout', function() {
        myImg!.style.backgroundImage = `url(${product.images[0]})`;
       });

    return (
        <div>
            <div className="container">
                {/* width: "18rem", */}
        <div className="card" style={{borderRadius: "0%",border: "none",width: 305}}>
                 {/* img hover */}
                {/* <a routerLink="/product/{{product.id}}" routerLinkActive="active"
                        [routerLinkActiveOptions]="{exact: true}" > */}
                         {/*  [appProduct]="{orgImg:product.images[0],hoverImg:product.images[1]}" */}
                       <div id="productImg"
                                className="card-img-top img-fluid"
                                style={{height: 350,borderRadius: "0%"}}>

                        </div>
                {/* </a> */}

                 {/* <img src="../../../assets/images/TealLinenDress.webp" className="card-img-top img-fluid" alt="TealLinenDress" style="height: 350px;border-radius: 0%;"> */}
                <div className="card-body" style={{paddingLeft: "0%",fontSize: 14,paddingRight: "0%"}}>
                        <p id="title" className="card-title"
                                style={{fontWeight: 400, fontFamily: "'Proza Libre', sans-serif"}}>
                                {product.name}
                                </p>
                         {/* currency pipe */}
                        <p className="card-text">
                                {product.price}
                            {/* {<NumericFormat value={product.price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />} */}
                            </p>
                       
                        {/* // routerLink="/product/{{product.id}}" routerLinkActive="active"  [routerLinkActiveOptions]="{exact: true}" */}
                        <a href="/"
                                style={{width: "100%",borderRadius: "0%",fontSize: "1.02rem",fontWeight: 400,height:45,paddingTop:9}}
                                className="btn btn-outline-dark">choose options</a>
                        
                </div>
        </div>
</div>
        </div>
    );
};

export default ProductCard;