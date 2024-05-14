import React, { useState } from "react";
import axios from "axios";

import DeleteIcon from "../../assets/icons/DeleteIcon";

import "../../bootstrap.min.css";
import "./poll.css";

const Poll = ({ id, title, variants, fetchPolls }) => {
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [isPollActive, setIsPollActive] = useState(true);
  const [isVoted, setIsVoted] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:8080/api/poll/", {
        data: { title },
      });
      console.log("Poll deleted successfully");
      fetchPolls();
    } catch (error) {
      console.log(error);
    }
  };

  const handleVote = () => {
    setIsPollActive(false);
    setIsVoted(true);
  };

  const handleCancel = () => {
    setSelectedVariants([]);
  };

  const handleVariantSelect = (index) => {
    if (!isVoted) {
      if (selectedVariants.includes(index)) {
        setSelectedVariants(selectedVariants.filter((item) => item !== index));
      } else {
        setSelectedVariants([...selectedVariants, index]);
      }
    }
  };

  return (
    <div className="pool">
      <div className="pool__title-wrapper">
        <span className="pool__title">{title}</span>
        <div className="button-delete delete-poll-btn" onClick={handleDelete}>
          <DeleteIcon />
        </div>
      </div>
      <div className="separator" />
      <div className="pool__variants">
        {variants.map((variant, index) => (
          <div
            key={variant.id}
            className={`pool__variants__item ${
              selectedVariants.includes(index) && "selected"
            } ${(!isPollActive || isVoted) && "disabled"}`}
            onClick={() => handleVariantSelect(index)}
          >
            <div className="variant__number">{index + 1}.</div>
            <div className="variant__content">
              <div className="variant__title">{variant}</div>{" "}
              <div className="variant__progress-wrapper">
                <div className="variant__progress-bar">
                  <div className="progress">
                    <div
                      className={`progress-bar-${index} progress-bar-striped progress-bar-animated`}
                      role="progressbar"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        width: `${
                          selectedVariants.includes(index) ? "100%" : "0%"
                        }`,
                        backgroundColor: `${
                          selectedVariants.includes(index)
                            ? "#001eff89"
                            : "#fff"
                        }`,
                      }}
                    />
                  </div>
                </div>
                <div className="variant__progress-percent">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={`optionsRadios${id}-${index}`}
                      id={`optionsRadios${id}-${index}`}
                      value={`option${id}-${index}`}
                      checked={selectedVariants.includes(index)}
                      disabled={!isPollActive || isVoted}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button
          type="button"
          className="btn btn-primary vote-poll-btn"
          onClick={handleVote}
          disabled={!isPollActive || isVoted}
        >
          Vote
        </button>
        <button
          type="button"
          className="btn btn-secondary cancel-poll-btn"
          onClick={handleCancel}
          disabled={isVoted}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Poll;
