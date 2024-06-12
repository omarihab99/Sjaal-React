import { useEffect, useState } from "react";
import { IProduct } from "../../../models/IProduct";
import "./filtration.css";

const Filtration = ({ length, collId, filter, products }: { length: number; collId:string|undefined; filter: (data: any) => void; products: IProduct[] }) => {
    const [AlphabeticArr, setAlphabeticArr] = useState<IProduct[]>([]);
    const [priceArr, setPriceArr] = useState<IProduct[]>([]);
    const [ReversedAlphabeticArr, setReversedAlphabeticArr] = useState<IProduct[]>([]);
    const [ReversedPriceArr, setReversedPriceArr] = useState<IProduct[]>([]);

    useEffect(() => {
        if (products && products.length > 0) {
            const alphabeticSorted = products.slice().sort((a, b) => a.name.localeCompare(b.name));
            const priceSorted = products.slice().sort((a, b) => a.price - b.price);
            setAlphabeticArr(alphabeticSorted);
            setPriceArr(priceSorted);
            setReversedAlphabeticArr([...alphabeticSorted].reverse());
            setReversedAlphabeticArr([...priceSorted].reverse());
        }
    }, [products]);

    console.log("Alpha",AlphabeticArr);
    console.log("price",priceArr);
    

    return (
        <div className="container d-flex">
            <div className="row" style={{width: "100%"}}>
                <div className="d-flex col-3">
                    <p>Filter:</p> 
                </div>

                <div className="col-5">
                </div>

                <div className="d-flex col-4">
                    <p>Sort by:</p>
                    <div className="dropdown margin-10">
                        <button className="btn dropdown-toggle myDropDown" type="button" data-bs-toggle="dropdown">
                        Featured 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                        <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={()=>filter(products)}>Featured</button></li>
                            <li><button className="dropdown-item" onClick={()=>filter(AlphabeticArr)}>Alphabetically, A-Z</button></li>
                            <li><button className="dropdown-item" onClick={()=>filter(ReversedAlphabeticArr)}>Alphabetically, Z-A</button></li>
                            <li><button className="dropdown-item" onClick={()=>filter(priceArr)}>Price, low to high</button></li>
                            <li><button className="dropdown-item" onClick={()=>filter(ReversedPriceArr)}>Price, high to low</button></li>
                        </ul> 
                    </div>
                    <p className="margin-10"> {length} Products</p>
                </div>
            </div>
        </div>
    );
};

export default Filtration;
