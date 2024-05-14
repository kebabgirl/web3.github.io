import React from "react";
import { NavLink } from "react-router-dom";

import PollIcon from "../../assets/icons/PollIcon";

import "../../bootstrap.min.css";
import "./header.css";

const Header = () => {
  const user = localStorage.getItem("token");

  return (
    <div className="header bg-dark">
      <div className="header__container container">
        <nav className="header__nav navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">
              <PollIcon />
              PollUA
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor03"
              aria-controls="navbarColor03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor03">
              <ul className="navbar-nav me-auto">
                <li>
                  <NavLink active="active" className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink active="active" className="nav-link" to="profile">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink active="active" className="nav-link" to="about">
                    About
                  </NavLink>
                </li>
                {!user && (
                  <>
                    <li>
                      <NavLink active="active" className="nav-link" to="signup">
                        Sign Up
                      </NavLink>
                    </li>
                    <li>
                      <NavLink active="active" className="nav-link" to="login">
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
