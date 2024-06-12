import { IProduct } from "../../../../models/IProduct";
import ProductCard from "../ProductCard/productCard";

const Products = ({products}:{products:IProduct[]}) => {
    return (
<div className="container d-flex">
{products.map((product) => (
                    <ProductCard key={product.id}
                        product={product}
                    />
))}
</div>
    );
};

export default Products;