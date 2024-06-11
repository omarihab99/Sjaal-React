import React, { useEffect } from "react";
import { ICategory } from "../../models/ICategory";
import CollectionCard from "./collectionCard";
import axios from "axios";
import { ICollection } from "../../models/ICollection";

const CategorySection = ({ category }: { category: ICategory }) => {
  const [collections, setCollections] = React.useState<ICollection[]>([]);
  useEffect(() => {
    axios
      .get<ICollection[]>(`http://localhost:3000/collections?categoryId=${category.id}`)
      .then((response) => {
        setCollections(response.data);
      });
  },[]);
  return (
    <div className="w-75 mx-auto">
      <h2 className="mt-5" style={{fontSize:"40px", fontWeight:"400", color: "black"}}>{category.name}</h2>
      <div className="row mt-5">
        {collections.map((collection) => (
          <div className="col-sm-12 col-md-6 col-lg-4" key={collection.id}>
            <CollectionCard collection={collection} key={collection.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
