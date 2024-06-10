import React, { useState, useRef } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { ICategory } from "../models/ICategory";
import { ICollection } from "../models/ICollection";
import navbarStyles from "../styles/sidebar.module.css";
import axios from "axios";
import {
  faSquareFacebook,
  faTiktok,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
const Sidebar = () => {
  const homeTabs = useRef<HTMLDivElement>(null);
  const categoriesTab = useRef<HTMLDivElement>(null);
  const collectionsTabs = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState([] as ICategory[]);
  const [selectedCategory, setSelectedCategory] = useState({} as ICategory);
  const [collections, setCollections] = useState([] as ICollection[]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const openCategories = () => {
    if (homeTabs.current) {
      homeTabs.current.classList.remove("d-flex");
      homeTabs.current.classList.add("d-none");
    }
    if (collectionsTabs.current) {
      collectionsTabs.current.classList.remove("d-flex");
      collectionsTabs.current.classList.add("d-none");
    }
    const URL = "http://localhost:3000/category";
    axios.get(URL).then((response) => {
      setCategories(response.data);
    });
    if (categoriesTab.current) {
      categoriesTab.current.classList.remove("d-none");
      categoriesTab.current.classList.add("d-flex");
    }
  };
  const openHome = () => {
    if (categoriesTab.current) {
      categoriesTab.current.classList.remove("d-flex");
      categoriesTab.current.classList.add("d-none");
    }
    if (collectionsTabs.current) {
      collectionsTabs.current.classList.remove("d-flex");
      collectionsTabs.current.classList.add("d-none");
    }
    if (homeTabs.current) {
      homeTabs.current.classList.remove("d-none");
      homeTabs.current.classList.add("d-flex");
    }
  };
  const openSelectedCategory = (categoryId: string) => {
    if (categoriesTab.current) {
      categoriesTab.current.classList.remove("d-flex");
      categoriesTab.current.classList.add("d-none");
    }
    const category = categories.find((category) => category.id === categoryId);
    if (category) {
      setSelectedCategory(category);
    }
    console.log(categoryId);
    const URL = `http://localhost:3000/collections?categoryId=${categoryId}`;
    axios.get(URL).then((response) => {
      setCollections(response.data);
    });
    if (collectionsTabs.current) {
      collectionsTabs.current.classList.remove("d-none");
      collectionsTabs.current.classList.add("d-flex");
    }
  };
  const handleAllCategories = () => {
    navigate("/collections");
    handleClose();
  };
  const collectionClicked = (collectionId: string) =>
    localStorage.setItem("collectionId", collectionId);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div
            className="d-flex align-items-start"
            id="divHomeTabs"
            ref={homeTabs}
          >
            <div
              className={`nav flex-column nav-pills w-100 ${navbarStyles.tabsContainer}`}
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <Link
                to="/"
                className={`nav-link fs-5 ${navbarStyles.btnColor} ${navbarStyles.homeHover}`}
                id="v-pills-home-tab"
                onClick={handleClose}
              >
                Home
              </Link>
              <button
                className={`nav-link fs-5 d-flex align-items-center ${navbarStyles.btnColor}`}
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-selected="false"
                onClick={openCategories}
              >
                Categories{" "}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={navbarStyles.icon}
                />
              </button>
            </div>
          </div>
          <div
            className="align-items-start d-none fadein-animation"
            id="divCategoriesTabs"
            ref={categoriesTab}
          >
            <div
              className={`nav flex-column nav-pills w-100 ${navbarStyles.tabsContainer}`}
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                className={`nav-link fs-6 d-flex align-items-center ${navbarStyles.btnColor}`}
                id="v-pills-back-to-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-back-to-home"
                type="button"
                role="tab"
                aria-selected="false"
                onClick={openHome}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
                categories
              </button>
              <button
                className={`nav-link fs-4 ${navbarStyles.btnColor}`}
                id="v-pills-all-categories-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-all-categories"
                onClick={handleAllCategories}
                type="button"
                role="tab"
                aria-selected="false"
              >
                <strong>All Categories</strong>
              </button>
              {categories.map((category) => (
                <button
                  className={`nav-link fs-5 d-flex align-items-center ${navbarStyles.btnColor}`}
                  id="v-pills-{{category.id}}-tab"
                  data-bs-toggle="pill"
                  type="button"
                  role="tab"
                  aria-selected="false"
                  onClick={() => openSelectedCategory(category.id)}
                  key={category.id}
                >
                  {category.name}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className={navbarStyles.icon}
                  />
                </button>
              ))}
            </div>
          </div>

          <div
            className="align-items-start d-none fadein-animation"
            id="divCollectionsTabs"
            ref={collectionsTabs}
          >
            <div
              className={`nav flex-column nav-pills w-100 ${navbarStyles.tabsContainer}`}
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                className={`nav-link fs-6 d-flex align-items-center ${navbarStyles.btnColor}`}
                id="v-pills-back-to-catogories-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-back-to-catogories"
                type="button"
                role="tab"
                aria-selected="false"
                onClick={openCategories}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
                {selectedCategory.name}
              </button>

              {collections.map((collection) => (
                <Link
                  className={`nav-link fs-5  ${navbarStyles.btnColor}`}
                  id="v-pills-{{collection.id}}-tab"
                  data-bs-toggle="pill"
                  type="button"
                  role="tab"
                  aria-selected="false"
                  to={`/collections/${collection.id}`}
                  onClick={() => collectionClicked(collection.id)}
                  key={collection.id}
                >
                  {collection.name}
                </Link>
              ))}
            </div>
          </div>
        </Offcanvas.Body>
        <div className={navbarStyles.socialIconContainer}>
          <a
            rel="noopener"
            title="Sjaal"
            href="https://www.facebook.com/SjaalScarves0?mibextid=JRoKGi"
            target="_blank"
            className={navbarStyles.socialIcon}
          >
            <FontAwesomeIcon icon={faSquareFacebook} bounce />
          </a>
          <a
            rel="noopener"
            title="Sjaal"
            href="https://www.instagram.com/sjaal.eg?igsh=MWRwa2NudGp4MXBjMw=="
            target="_blank"
            className={navbarStyles.socialIcon}

          >
            <FontAwesomeIcon icon={faInstagram} bounce />
          </a>
          <a
            rel="noopener"
            title="Sjaal"
            href="https://www.tiktok.com/@sjaal_scarves"
            target="_blank"
            className={navbarStyles.socialIcon}
          >
            <FontAwesomeIcon icon={faTiktok} bounce />
          </a>
        </div>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
