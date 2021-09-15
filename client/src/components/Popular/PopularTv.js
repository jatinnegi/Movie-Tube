import { useEffect, useState } from "react";
import * as api from "../../api";

import MediaItem from "../Media/MediaItem";
import MediaItemLoading from "../Media/MediaItemLoading";

const PopularTv = () => {
  const [tvs, setTvs] = useState({
    isLoading: true,
    data: [],
  });

  useEffect(() => {
    async function getPopularTv() {
      try {
        const { data } = await api.getPopularTv(20);
        setTvs((prevState) => ({
          ...prevState,
          isLoading: false,
          data,
        }));
      } catch (error) {
        if (error.response.data.errno) {
          const { errno } = error.response.data;

          if (errno === "ECONNRESET") setTimeout(() => getPopularTv(), 4000);
        }
      }
    }
    getPopularTv();
  }, []);

  const totalItems = [];
  for (let i = 0; i < 20; i++) totalItems.push(i);

  return tvs.isLoading
    ? totalItems.map((item) => (
        <div key={item} style={{ height: "350px" }}>
          <MediaItemLoading />
        </div>
      ))
    : tvs.data.map((tv) => (
        <MediaItem
          key={tv.id}
          id={tv.id}
          media_type={tv.media_type}
          title={tv.title}
          rating={tv.rating}
          first_air_date={tv.first_air_date}
          poster_path={tv.poster_path}
        />
      ));
};

export default PopularTv;
