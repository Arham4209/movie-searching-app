import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import { useState } from "react";
import axios from "axios";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "4540c658";

const Container = styled.div`
  display: flex;
  flex-direction: column;
 
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #ffd700; /* Gold */
  color: #003366;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 15px 5px #555;
  align-items: center;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieImg = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 10px;
  margin-left: 40px;
  width: 50%; /* Adjust this width as needed */
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 20px;
  margin-left: 10px;
  width: 100%;
  padding: 0 10px 0 10px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeOut] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    console.log(response);
    updateMovieList(response.data.Search);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 700);
    updateTimeOut(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImg src="/img.png"></MovieImg>
          Search Movies
        </AppName>

        <SearchBox>
          <SearchIcon src="/search icon.png"></SearchIcon>
          <SearchInput
            placeholder="Search movie name"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} />}

      <MovieListContainer>
        {movieList?.length
          ? movieList.map((movie, idx) => (
              <MovieComponent
                key={idx}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          : "No Movie Search"}
      </MovieListContainer>
    </Container>
  );
}

export default App;
