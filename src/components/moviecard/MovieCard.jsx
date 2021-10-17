import React from 'react'
import "./moviecard.css";
import { img_500, unavailable } from "../../config/config";
import ContentModal from '../ContentModal';
const MovieCard = ({data,media_type}) => {
    return (
      <ContentModal media_type={media_type} id={data.id} data={data}>
        <div>
          <span className="ratingNo">{data.vote_average} imdb</span>
          <img
            className="img-fluid poster"
            src={
              data.poster_path ? `${img_500}/${data.poster_path}` : unavailable
            }
            alt={data.title}
          />
          <div className="px-2">
            <h6 className="movieTitle">{data.title || data.name}</h6>

            <p className="movieSmallDetals mb-2">
              <span className="text-blue float-right small">
                {data.first_air_date || data.release_date}
              </span>
              <span className="badge badge-warning float-right badge-sm">
                {media_type === "tv" ? "TV Series" : "Movie"}
              </span>
            </p>
          </div>
        </div>
      </ContentModal>
    );
}

export default MovieCard
