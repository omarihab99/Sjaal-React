
import { useEffect, useState } from "react";
//import { useParams } from "react-router";
import { fetchProductsByCollectionId } from "../redux/slices/productSlice";
import { IProduct } from "../models/IProduct";
import { productsDispatch } from "../hooks/productsHook";
import { getCollectionById } from "../redux/slices/collectionSlice";
import Description from "../components/ProductsPage/Description/description";
import Filtration from "../components/ProductsPage/Filtration/filtration";
import Products from "../components/ProductsPage/ProductsSection/Products/products";


const ProductsPage = () => {
    // const { CollectionId } = useParams();
    // console.log(CollectionId);
    const CollectionId="1";

    const [productsArr, setProductsArr] = useState<IProduct[]>([]);
    const [length, setLength] = useState(0);
    const [description, setDescription] = useState("");
    const [collectionName, setCollectionName] = useState("");
    const dispatch =productsDispatch();
    // const products = productsSelector((state)=>state.products.products);

useEffect(() => {
    const fetchData = async () => {
        if(CollectionId){
            try {
                const productsResponse = await dispatch(fetchProductsByCollectionId(CollectionId));
                const collectionResponse = await dispatch(getCollectionById(CollectionId));
    
                setProductsArr(productsResponse.payload);
                setLength(productsResponse.payload.length);
    
                if (productsResponse.payload.length === 0) {
                    setDescription("There are no products in this category!");
                } else {
                    setDescription(productsResponse.payload[0].description);
                }
                
                if (collectionResponse.payload.length > 0) {
                    setCollectionName(collectionResponse.payload[0].name);
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
