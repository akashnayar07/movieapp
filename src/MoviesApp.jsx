import { Container } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import SimpleBottomNavigation from './components/MainNav';
import  "./components/moviesapp.css";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import Series from "./pages/Series";
import Trending from "./pages/Trending";

const MoviesApp = () => {
    return (
      <>
        <BrowserRouter>
          <div className="moviesApp">
            <Header />
            <div className="mainContent py-1">
              <Container>
                <Switch>
                  <Route path="/" component={Trending} exact/>
                  <Route path="/movies" component={Movies}/>
                  <Route path="/series" component={Series}/>
                  <Route path="/search" component={Search}/>
                </Switch>
           
              </Container>

            </div>
            <SimpleBottomNavigation />
          </div>
        </BrowserRouter>
      </>
    );
}

export default MoviesApp
