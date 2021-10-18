import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import MovieCard from "../components/moviecard/MovieCard";
import CustomPagination from "../components/pagination/CustomPagination";
import Genres from "../components/genres/Genres";
import useGenre from "../hooks/useGenre";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numberOfPages, setnumberOfPages] = useState();

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    // console.log(data.results);
    // console.log(data.results);
    setContent(data.results);
    setnumberOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);
  return (
    <>
      <PageTitle pageTitle="Trending Web series" />
      <div className="mb-3">
        <Genres
          selectedGenres={selectedGenres}
          type="tv"
          genres={genres}
          setGenres={setGenres}
          setSelectedGenres={setSelectedGenres}
          setPage={setPage}
        />
      </div>

      <div className="row">
        {content &&
          content.map((item, index) => {
            return (
              <>
                <div className="col-sm-3 mb-5 moviecardDiv">
                  <MovieCard key={item.id} data={item} media_type="tv" />
                </div>
              </>
            );
          })}
      </div>

      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </>
  );
};

export default Series;
