import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../bootstrap.min.css";
import "./signUpPage.css";

const SignUpPage = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    console.log("1");
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="page">
      <section className="page__signup signup">
        <div className="signup__container container">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className="form-group">
                <label className="form-label mt-4">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label mt-4">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  required
                  className="form-control"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label className="form-label mt-4">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label mt-4">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className="form-control"
                />
              </div>
              {error && (
                <div className="profile__alert alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <button type="submit" className="btn btn-primary signup-btn">
                Sign up
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
