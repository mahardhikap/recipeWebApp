import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarNoLogin from '../../components/NavbarNoLogin';
import Footer from '../../components/Footer';

function Home() {

  return (
    <>
      <NavbarNoLogin />
      <section className="container w-100 position-relative">
        <div className="row mt-5 yellow-big-square">
            <div className="col-sm-12 col-md-6 col-lg-6 order-2 order-md-1 d-flex flex-column justify-content-center my-3">
                <h1 className="fs-1 text-purple">Discover Recipe & Deliciuous Food</h1>
                <div className="position-relative">
                    <img src="/src/assets/images/index/Group 687.webp" alt="" className="position-absolute top-50 start-0 translate-middle ms-4"/>
                    <input type="text" placeholder="Search Restaurant, Food" className="py-4 ps-5 pe-4 rounded border-0 bg-body-secondary w-100 form-control"/>
                </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 my-3 order-1 order-md-2">
                <a href="./menu/detail-menu.html">
                    <img src='/src/assets/images/index/Rectangle 313.webp' alt="" className="w-100"/>
                </a>
            </div>
        </div>
        <div className="row mt-5">
            <div className="position-relative my-5">
                <div className="before-sub-title"></div>
                <h2 className="ps-4">Popular For You !</h2>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 mt-5 mb-3 position-relative square-border">
                <div className="position-absolute d-flex flex-wrap gap-3 bullets-wrapper">
                    <div className="bullets"></div>
                    <div className="bullets"></div>
                    <div className="bullets"></div>
                    <div className="bullets"></div>
                    <div className="bullets"></div>
                    <div className="bullets"></div>
                </div>
                <img src="/src/assets/images/index/Rectangle 313 (1).webp" alt="" className="w-100"/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 mt-3 mb-5 d-flex align-items-center">
                <div className="p-3">
                    <h3>Healthy Bone Broth Ramen (Quick & Easy)</h3>
                    <p>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
                    <button className="border-0 bg-warning text-white p-3 rounded">Learn More</button>
                </div>
            </div>
        </div>
        <div className="row mt-5">
            <div className="position-relative my-5">
                <div className="before-sub-title"></div>
                <h2 className="ps-4">New Recipe</h2>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 mt-5 mb-3 position-relative square-block">
                <img src="/src/assets/images/index/Rectangle 313 (2).webp" alt="" className="w-100"/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 mt-3 mb-5 d-flex align-items-center">
                <div className="p-3">
                    <h3>Healthy Bone Broth Ramen (Quick & Easy)</h3>
                    <p>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
                    <button className="border-0 bg-warning text-white p-3 rounded">Learn More</button>
                </div>
            </div>
        </div>
        <div className="mt-5">
            <div className="position-relative">
                <div className="before-sub-title"></div>
                <h2 className="ps-4">Popular Recipe</h2>
            </div>
            <div className="w-100 d-flex flex-wrap gap-5 my-5 justify-content-center popular-recipe-font">
                <div className="col-sm-12 col-md-4 col-lg-3 position-relative">
                    <img src="/src/assets/images/index/Rectangle 314.webp" alt="" className="w-100"/>
                    <span className="position-absolute start-0 bottom-0 p-3 fs-4 fw-medium">Chicken Kare</span>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-3 position-relative">
                    <img src="/src/assets/images/index/Rectangle 315.webp" alt="" className="w-100"/>
                    <span className="position-absolute start-0 bottom-0 p-3 fs-4 fw-medium">Bomb Chicken</span>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-3 position-relative">
                    <img src="/src/assets/images/index/Rectangle 316.webp" alt="" className="w-100"/>
                    <span className="position-absolute start-0 bottom-0 p-3 fs-4 fw-medium">Banana Smothie Pop</span>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-3 position-relative">
                    <img src="/src/assets/images/index/Rectangle 317.webp" alt="" className="w-100"/>
                    <span className="position-absolute start-0 bottom-0 p-3 fs-4 fw-medium">Coffe Lava Cake</span>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-3 position-relative">
                    <img src="/src/assets/images/index/Rectangle 318.webp" alt="" className="w-100"/>
                    <span className="position-absolute start-0 bottom-0 p-3 fs-4 fw-medium">Sugar Salmon</span>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-3 position-relative">
                    <img src="/src/assets/images/index/Rectangle 319.webp" alt="" className="w-100"/>
                    <span className="position-absolute start-0 bottom-0 p-3 fs-4 fw-medium">Indian Salad</span>
                </div>
            </div>
        </div>
    </section>
      <Footer />
    </>
  );
}

export default Home;
