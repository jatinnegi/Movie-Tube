import Slider from "react-slick";
import Cast from "./Cast";
import CastListLoading from "./CastListLoading";
import styles from "./MediaDetails.module.css";
import PropTypes from "prop-types";

CastList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function CastList({ data: { isLoading, data } }) {
  const settings = {
    infinite: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.cast_list}>
      <p
        style={{
          padding: "0 40px",
          marginTop: "10px",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        Cast
      </p>
      {isLoading ? (
        <CastListLoading />
      ) : data.length > 0 ? (
        <Slider {...settings}>
          {data.map((cast, index) => (
            <Cast
              key={index}
              profilePath={cast.profile_path}
              name={cast.name}
              character={cast.character}
            />
          ))}
        </Slider>
      ) : (
        <p
          style={{
            padding: "0 40px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          No data found
        </p>
      )}
    </div>
  );
}
