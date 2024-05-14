import React from "react";

import "../../bootstrap.min.css";
import "./profilePage.css";

const ProfilePage = () => {
  const user = localStorage.getItem("token");

  const logOut = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  return (
    <div className="page">
      <div className="page__profile profile">
        <div className="profile__container container">
          {!user && (
            <div className="profile__alert alert alert-danger" role="alert">
              You need to sign in to get access to profile page!
            </div>
          )}
          {user && (
            <>
              <table className="profile__table table table-info">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>Olya</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>olapetruk2003@gmail.com</td>
                  </tr>
                  <tr>
                    <th>Gender</th>
                    <td>Female</td>
                  </tr>
                  <tr>
                    <th>Birthday</th>
                    <td>31.12.2003</td>
                  </tr>
                </tbody>
              </table>
              <button
                type="button"
                className="btn btn-primary signup-btn"
                onClick={() => logOut()}
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
