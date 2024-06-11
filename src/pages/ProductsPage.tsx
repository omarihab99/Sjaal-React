
import { useEffect, useState } from "react";
//import { useParams } from "react-router";
import { fetchProductsByCollectionId } from "../redux/slices/productSlice";
import { IProduct } from "../models/IProduct";
import { productsDispatch, productsSelector } from "../hooks/productsHook";
import { getCollectionById } from "../redux/slices/collectionSlice";
import Description from "../components/ProductsPage/Description/description";
import Filtration from "../components/ProductsPage/Filtration/filtration";
import Products from "../components/ProductsPage/ProductsSection/Products/products";
import { ICollection } from "../models/ICollection";
import { useSelector } from "react-redux";
import { useParams } from "react-router";


const ProductsPage = () => {
    const { CollectionId } = useParams();
    console.log(useParams());
    // const CollectionId="1";

    const [productsArr, setProductsArr] = useState<IProduct[]>([]);
    const [length, setLength] = useState(0);
    const [description, setDescription] = useState("");
    const [collectionName, setCollectionName] = useState("");
    const dispatch =productsDispatch();
    const products = productsSelector((state)=>state.products.products);
    const collection = useSelector((state:any)=>state.collections.collection);

useEffect(() => {
    const fetchData = async () => {
        if(CollectionId){
            try {
                dispatch(fetchProductsByCollectionId(CollectionId));
                dispatch(getCollectionById(CollectionId));
    
                setProductsArr(products);
                setLength(products.length);
    
                if (products.length === 0) {
                    setDescription("There are no products in this category!");
                } else {
                    setDescription(products[0].description);
                }
                
                if (collection.length > 0) {
                    setCollectionName(collection[0].name);
                }
            } catch (error) {
                console.log(error);
            }
        };
        }
        fetchData();
}, [CollectionId, dispatch]);

// console.log("////////////////////////////////////");
// console.log(productsArr,length,description,collectionName);

    return (
<div style={{marginLeft: "5%", marginTop: "5%"}}>
     <Description description={description} collName={collectionName}></Description>
    <Filtration length={length}></Filtration>
    <Products products={productsArr}></Products>
</div>
    );
};

export default ProductsPage;
