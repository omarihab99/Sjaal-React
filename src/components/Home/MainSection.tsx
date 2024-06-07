import React from "react";
import "../../styles/mainsection.module.css";
const MainSection = () => {
  return (
    <div>
      <section className={`main-section w-100`}>
        <div className="img-background ">
            {/*TODO: add background image path*/}
          <img src="./public/images/main.jpg" alt="Main Section"></img>
        </div>
        <div className={"content-container"}>
          <h2>Modestly Gorgeous</h2>
          {/*TODO: add link to collections*/}
          <button className={"explore-btn btn btn-outline-light"} type="button">
            Explore
          </button>
        </div>
      </section>
    </div>
  );
};

export default MainSection;
