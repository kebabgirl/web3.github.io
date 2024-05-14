import React, { useState } from "react";
import axios from "axios";

import "../../bootstrap.min.css";
import "./signInPage.css";

const SignInPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/profile";
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

  const resetFields = () => {
    setData({ email: "", password: "" });
  };

  return (
    <div className="page">
      <div className="page__signin signin">
        <div className="signin__container container">
          <form className="main-login__form" action="#" onSubmit={handleSubmit}>
            <fieldset>
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
            </fieldset>
            {error && (
              <div className="profile__alert alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="buttons">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                onClick={() => resetFields()}
                type="reset"
                className="btn btn-secondary"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
