import { IProduct } from "../../../../models/IProduct";
import ProductCard from "../ProductCard/productCard";
import './products.css';

const Products = ({products}:{products:IProduct[]}) => {
    return (
<div className="container d-flex">
{products.map((product) => (
                    <ProductCard
                        product={product}
                    />
))}
</div>
    );
};

export default Products;