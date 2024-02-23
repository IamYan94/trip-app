import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddTripCard.css";

const AddTripCard = ({
  trips,
  onCreateTrip,
  modalOpen,
  setModalOpen,
  cities,
}) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [originalButtonText, setOriginalButtonText] = useState("");

  const handleOpenModal = () => {
    if (!modalOpen) {
      setOriginalButtonText("Add trip");
      setModalOpen(true);
    }
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal")) {
      setModalOpen(false);
    }
  };

  const handleCreateTrip = () => {
    if (selectedCity && startDate && endDate) {
      const city = cities.find((city) => city.title === selectedCity);
      if (city) {
        onCreateTrip({ ...city, startDate, endDate });
        setModalOpen(false);
        setSelectedCity("");
        setStartDate("");
        setEndDate("");
        setOriginalButtonText("");
      } else {
        alert("City not found");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="add-trip" onClick={handleOpenModal}>
        <div className="add-trip__inner">
          <div className="add-trip__text">
            <p>
              <b>+</b>
              <br />
              {originalButtonText || "Add trip"}
            </p>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <p className="create-trip-text">Create Trip</p>
            <button className="close" onClick={() => setModalOpen(false)}>
              &times;
            </button>
            <label>* City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city.title}>
                  {city.title}
                </option>
              ))}
            </select>
            <label>* Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>* End date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="buttons-container">
              <button className="button" onClick={handleCancel}>Cancel</button>
              <button className="button button_blue" onClick={handleCreateTrip}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

AddTripCard.propTypes = {
  trips: PropTypes.array.isRequired,
  onCreateTrip: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
};

export default AddTripCard;
