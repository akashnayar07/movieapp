import React, { useState, useEffect } from "react";
import PageTitle from '../components/PageTitle'
import axios from "axios"
import MovieCard from "../components/moviecard/MovieCard";
import CustomPagination from "../components/pagination/CustomPagination";



const Trending = () => {
  const [page, setPage] = useState(1)
  const [content, setContent] = useState([]);
    let searchType = "tv";

   
    const fetchTrending = async ()=> {
      const {data} = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      ); 
      console.log(data.results);
      setContent(data.results);

    }

    useEffect(() => {
        fetchTrending();
    }, [page])

    return (
      <>
        <PageTitle pageTitle="Home| Trending Movies & Shows" />
        <div className="row">
          {content &&
            content.map((item, index) => {
              return (
                <>
                  <div className="col-sm-3 mb-5 moviecardDiv">
                    <MovieCard key={index} data={item} media_type={item.media_type} />
                  </div>
                </>
              );
            })}
        </div>
        {
          
        }
        <CustomPagination setPage={setPage} />
      </>
    );
}

export default Trending
