import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import Glide from "@glidejs/glide";
import { useQuery } from "react-query";
import { getProducts } from "../../data/product.data";
import Loading from "./Loading";
import { ProductModel } from "../../models/product.model";
// @ts-ignore
import { Controls } from "@glidejs/glide/dist/glide.modular.esm";
import Glide from "@glidejs/glide";

const Landing = () => {
  const { data, isLoading } = useQuery("get products", getProducts);

  useEffect(() => {
    new Glide(".glide", {
      // type: "carousel",
      startAt: 0,
      perView: 3,
      // focusAt: "center",
      breakpoints: {
        840: {
          perView: 2,
        },
        480: {
          perView: 1,
        },
      },
    }).mount({
      Controls,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.products]);

  return (
    <div style={{ lineHeight: 1.5 }}>
      {isLoading && <Loading />}
      <div className="l-nav-wrapper">
        <nav className="l-nav">
          <Link to="/" id="logo">
            EzzyFoods
          </Link>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <a href="#!">about</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header">
        <div>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 200,
            }}
          >
            Thinking about buying food
          </h2>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Worry no more, We've got you covered
          </div>
          <Link className="gotoshop" to="/shop">
            Go to shop
          </Link>
        </div>

        <div>
          <img src="/landing_pic.jpg" alt="Pic" className="responsive" />
        </div>
      </div>
      <div className="show-slides">
        <div className="glide">
          <div data-glide-el="controls" className="controls">
            <button data-glide-dir="<">
              <div className="material-icons">arrow_back_ios</div>
            </button>
            <button data-glide-dir=">">
              <div className="material-icons">arrow_forward_ios</div>
            </button>
          </div>
          <div data-glide-el="track" className="glide__track">
            <ul className="glide__slides">
              {data?.products &&
                data.products.map((product: ProductModel) => (
                  <li key={product._id} className="glide__slide">
                    <div className="slide-card">
                      <img src={product.image} alt="" width="250" />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="othersselling">
        <div style={{ maxWidth: "90%" }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 600,
              textAlign: "end",
            }}
          >
            You have a Restaurant
          </h2>
          <div
            style={{
              fontSize: 28,
              fontWeight: 200,
              textAlign: "end",
            }}
          >
            lets deliver your food
          </div>
          <a className="sellwithus" href="mailto:ndiwa.ek@gmail.com">
            Sell With Us
          </a>
        </div>
      </div>
      <div
        id="contact"
        style={{
          padding: "5%",

          background: "#d1f9c5",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            minHeight: 250,
            margin: "auto",
            alignItems: "center",
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          <div>
            <h4
              style={{
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              Wanna talk to us?
            </h4>
            <div
              style={{
                fontSize: 32,
                fontWeight: 200,
              }}
            >
              Use any channel you want
            </div>
          </div>
          <div>
            <div>
              Phone: <a href="tel:+254726718344">+254726718344</a>
            </div>
            <div>
              Email: <a href="mailto:email@us.domain">email@us.domain</a>
            </div>
          </div>
        </div>
      </div>
      <footer
        style={{
          padding: 16,
          background: `#444`,
          textAlign: "center",
        }}
      >
        <div style={{ color: `#fff` }}>
          <span
            style={{ color: `#fff` }}
            dangerouslySetInnerHTML={{ __html: "&copy;" }}
          />
          Vansoundz 2020
        </div>
      </footer>
    </div>
  );
};

export default Landing;
