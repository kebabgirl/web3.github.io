import React, { useState, useEffect } from "react";
import axios from "axios";

import CreatePollModal from "../../components/CreatePollModal/CreatePollModal";
import Poll from "../../components/Poll/Poll";

import "../../bootstrap.min.css";
import "./mainPage.css";

const MainPage = () => {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPolls = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/poll/all");
      setPolls(response.data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch polls");
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <>
      <div className="page">
        <section className="page__home home">
          <div className="home__buttons">
            <button
              type="button"
              className="btn btn-info button-add create__button"
              onClick={() => setIsModalOpen(true)}
            >
              Створити опитування
            </button>
          </div>
          <div className="home__container container">
            <div className="pools">
              {polls.map((poll) => (
                <Poll
                  key={poll.id}
                  id={poll.id}
                  title={poll.title}
                  variants={poll.variants}
                  fetchPolls={fetchPolls}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      {isModalOpen && (
        <CreatePollModal
          setIsModalOpen={setIsModalOpen}
          fetchPolls={fetchPolls}
        />
      )}
    </>
  );
};

export default MainPage;
