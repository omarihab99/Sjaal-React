import { useEffect, useState } from "react";
import { fetchProductsByCollectionId } from "../redux/slices/productSlice";
import { IProduct } from "../models/IProduct";
import { productsDispatch, productsSelector } from "../hooks/productsHook";
import { getCollectionById } from "../redux/slices/collectionSlice";
import Description from "../components/ProductsPage/Description/description";
import Filtration from "../components/ProductsPage/Filtration/filtration";
import Products from "../components/ProductsPage/ProductsSection/Products/products";
import { useSelector } from "react-redux";
import { useParams } from "react-router";


const ProductsPage = () => {
    const { CollectionId } = useParams();
    // const CollectionId="1";

    const [productsArr, setProductsArr] = useState<IProduct[]>([]);
    const [length, setLength] = useState(0);
    const [description, setDescription] = useState("");
    const [collectionName, setCollectionName] = useState("");
    const dispatch =productsDispatch();
    const products = productsSelector((state)=>state.products.products);
    const collection = useSelector((state:any)=>state.collections.collection);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if(CollectionId){
                try {
                    dispatch(fetchProductsByCollectionId(CollectionId));
                    dispatch(getCollectionById(CollectionId));
                } catch (error) {
                    console.log(error);
                }
            };
        }
        fetchData();
    }, [CollectionId, dispatch]);

    useEffect(() => {
        if(products && products.length > 0) {
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
        }
    }, [products, collection]);

    const handleFilteredData = (data:any) => {
        setFilteredData(data);
    };

    return (
        <div style={{marginLeft: "4%", marginTop: "5%"}}>
             <Description description={description} collName={collectionName}></Description>
            <Filtration length={length} collId={CollectionId} filter={handleFilteredData} products={productsArr}></Filtration>
            <Products products={filteredData.length > 0 ? filteredData : productsArr}></Products>
        </div>
    );
};

export default ProductsPage;
