import React, { useState } from "react";
import axios from "axios";

import DeleteIcon from "../../assets/icons/DeleteIcon";

import "../../bootstrap.min.css";
import "./createPollModal.css";

const CreatePollModal = ({ setIsModalOpen, fetchPolls }) => {
  const [data, setData] = useState({ title: "", variants: [] });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    if (input.name === "text") {
      const variantsArray = input.value.split(",").map((item) => item.trim());
      setData({ ...data, variants: variantsArray });
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/poll/create";
      await axios.post(url, data);
      fetchPolls();
      setIsModalOpen(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="add-modal">
      <div className="add-modal__content">
        <div className="add-modal__header">
          <h4 className="add-modal__title">Створити опитування</h4>
          <div
            className="add-modal__close button-delete"
            onClick={() => setIsModalOpen(false)}
          >
            <DeleteIcon />
          </div>
        </div>
        <div className="add-modal__body">
          <form onSubmit={handleSubmit} action="#" className="add-modal__form">
            <input
              type="text"
              placeholder="Назва"
              name="title"
              onChange={handleChange}
              value={data.title}
              required
              className="add-modal__name"
            />
            <textarea
              required
              placeholder="Варіанти відповідей (через кому), наприклад '1, 2, 3, 4'"
              name="text"
              type="text"
              onChange={handleChange}
              value={data.variants.join(", ")}
              className="add-modal__variants"
            ></textarea>
            <button type="submit" className="btn btn-success add-modal__button">
              Створити
            </button>
          </form>
          <p id="addErrorMessage" />
        </div>
      </div>
    </div>
  );
};

export default CreatePollModal;
