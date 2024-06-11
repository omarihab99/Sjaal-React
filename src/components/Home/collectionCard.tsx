import React from "react";
import { ICollection } from "../../models/ICollection";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import collectionCardStyles from "../../styles/collectioncard.module.css";
const CollectionCard = ({ collection }: { collection: ICollection }) => {
  const collectionContainerClasses = classNames(
    collectionCardStyles.collectionContainer,
    "m-3"
  );
  const imgContainerClasses = classNames(
    collectionCardStyles.imgContainer,
    "col-12",
    "p-0"
  );
  const [arrowType, setArrowType] = React.useState(faArrowRight);
  const onCollectionClick = () => {
    localStorage.setItem("collectionId", collection.id);
  };
  const onCollectionMouseOver = () => {
    setArrowType(faArrowRightLong);
  };
  const onCollectionMouseOut = () => {
    setArrowType(faArrowRight);
  };
  return (
    // <a>
    <>
      <div
        className={collectionContainerClasses}
        onMouseOver={onCollectionMouseOver}
        onMouseOut={onCollectionMouseOut}
      >
        <Link to={`/collections/${collection.id}`} onClick={onCollectionClick}>
          <div className={imgContainerClasses}>
            <img src={`images/${collection.imgName}`} alt={collection.name} />
          </div>
        </Link>
        <Link to={`collections/${collection.name.split(" ").join("-")}`}>
          {collection.name}
          <FontAwesomeIcon icon={arrowType} />
        </Link>
      </div>
    </>
    // </a>
  );
};

export default CollectionCard;
