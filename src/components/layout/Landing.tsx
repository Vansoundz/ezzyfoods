import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={{ lineHeight: 1.5 }}>
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
