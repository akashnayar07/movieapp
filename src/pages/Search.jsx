import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button, Tab, Tabs } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import MovieCard from "../components/moviecard/MovieCard";
import CustomPagination from "../components/pagination/CustomPagination";

const Search = () => {

  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numberOfPages, setnumberOfPages] = useState();
  let searchType = "tv";


  if (type==true) {
    searchType = "tv";
  }
  else
  {
        searchType = "movie";
  }
    // let searchType = type === true ? "tv" : "movie";

   
 

   const fetchSearch = async () => {
     const { data } = await axios.get(
       `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
         process.env.REACT_APP_API_KEY
       }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
     );

     setContent(data.results);
     setnumberOfPages(data.total_pages);
   };

   useEffect(() => {
     window.scroll(0,0);
     fetchSearch();
   }, [type, page]);

    return (
      <>
        <PageTitle pageTitle="Search Movies/Web Series/Shows" />
        <div className="mt-4 bg-light p-1 d-flex align-items-center">
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            style={{ flex: 1 }}
            className="searchBox"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>
        <div>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="background"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
          >
            <Tab label="Search for Movies" style={{ width: "50%" }} />
            <Tab label="Search for Series" style={{ width: "50%" }} />
          </Tabs>
        </div>
        <div className="row mt-5">
          {content &&
            content.map((item, index) => {
              return (
                <>
                  <div className="col-sm-3 moviecardDiv mb-5">
                    <MovieCard
                      key={item.id}
                      data={item}
                      media_type={searchType}
                    />
                  </div>
                </>
              );
            })}
        </div>
        <div>
          {numberOfPages > 1 && (
            <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
          )}
        </div>
      </>
    );
}

export default Search
