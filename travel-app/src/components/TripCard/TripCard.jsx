import PropTypes from "prop-types";
import "./TripCard.css";

const TripCard = ({ image, title, startDate, endDate, onClick, isActive }) => {
  return (
    <div onClick={onClick} className={`trip-card ${isActive ? "active" : ""}`}>
      <img src={image} />
      <div className="trip-card__info">
        <p>
          <b>{title}</b>
        </p>
        <p className="trip-card__dates">
          {new Date(startDate).toLocaleDateString("uk-UA")}-
          {new Date(endDate).toLocaleDateString("uk-UA")}
        </p>
      </div>
    </div>
  );
};

TripCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default TripCard;
