import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import "swiper/swiper-bundle.css";
import styles from "./Carousel.module.css";
import Frame from "./Frame";
import * as api from "../../api";
import Spinner from "../../Spinner";
import { useHistory } from "react-router-dom";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const LIMIT = 10;

const Carousel = () => {
  const history = useHistory();
  const [frames, setFrames] = useState({
    isLoading: true,
    data: [],
  });

  useEffect(() => {
    async function getTrending() {
      try {
        const { data } = await api.getTrending(LIMIT);
        setFrames({
          isLoading: false,
          data,
        });
      } catch (error) {
        const { errno } = error.response.data;
        if (errno === "ECONNRESET")
          setTimeout(() => {
            getTrending();
          }, 4000);
      }
    }
    getTrending();
  }, []);

  return (
    <div className={styles.carousel}>
      {frames.isLoading ? (
        <div className={styles.spinner_container}>
          <Spinner height={100} width={100} />
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          onSwiper={(swiper) => {
            window.swiper = swiper;
          }}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
        >
          {frames.data.map((frame) => (
            <SwiperSlide
              key={frame.id}
              onClick={() => history.push(`/${frame.media_type}/${frame.id}`)}
            >
              <Frame
                id={frame.id}
                media_type={frame.media_type}
                title={frame.title}
                overview={frame.overview}
                rating={frame.rating}
                backdrop_path={frame.backdrop_path}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;
