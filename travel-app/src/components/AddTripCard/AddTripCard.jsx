import PropTypes from "prop-types";
import "./AddTripCard.css";

const AddTripCard = ({ onClick }) => (
  <div onClick={onClick} className="add-trip">
    <div className="add-trip__inner">
      <div className="add-trip__text">
        <p>
          <b>+</b>
          <br />
          Add trip
        </p>
      </div>
    </div>
  </div>
);

AddTripCard.propTypes = {
  onClick: PropTypes.func,
};

export default AddTripCard;
