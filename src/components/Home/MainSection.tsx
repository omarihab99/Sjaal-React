import React from "react";
import mainSectionStyles from "../../styles/mainsection.module.css";
import { Link } from "react-router-dom";
import classNames from "classnames";
const MainSection = () => {
  const mainSectionClasses = classNames(mainSectionStyles.mainSection, "w-100");
  const exploreButtonClasses = classNames(mainSectionStyles.exploreBtn, "btn", "btn-outline-light");
  return (
    <div>
      <section className={mainSectionClasses}>
        <div>
          {/*TODO: add background image path*/}
          <img src="images/main.jpg" alt="Main Section" className="img-fluid"></img>
        </div>
        <div className={mainSectionStyles.contentContainer}>
          <h2>Modestly Gorgeous</h2>
          {/*TODO: add link to collections*/}
          <button className={exploreButtonClasses} type="button">
            <Link className={mainSectionStyles.textDec} to="/collections">Explore</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default MainSection;
