import Circle from "react-circle";
import PropTypes from "prop-types";

const Rating = ({ rating, size }) => {
  return (
    <Circle
      animate={true}
      animationDuration="1s"
      size={size}
      lineWidth={45}
      progress={rating}
      progressColor="cornflowerblue"
      bgColor="whitesmoke"
      textColor="whitesmoke"
      textStyle={{
        font: "bold 6rem Quicksand, sans-serif",
      }}
      percentSpacing={10}
      roundedStroke={true}
      showPercentage={true}
      showPercentageSymbol={true}
    />
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};

export default Rating;
