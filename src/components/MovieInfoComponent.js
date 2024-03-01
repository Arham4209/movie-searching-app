import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_KEY } from "../App";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 20px 30px;
  border-bottom: 1px solid lightgray;
  box-shadow: 2px 2px 10px black;
`;

const CoverImg = styled.img`
  object-fit: cover;
  height: 352px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  margin: 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);

  return (
    <Container>
      <CoverImg src={movieInfo?.Poster} />
      <InfoColumn>
        <MovieName>
          {movieInfo?.Type}: {movieInfo?.Title}
        </MovieName>
        <MovieInfo>
          IMDB Ratting: <span>{movieInfo?.imdbRating}</span>
        </MovieInfo>
        <MovieInfo>
          Language: <span>{movieInfo?.language}</span>
        </MovieInfo>
        <MovieInfo>
          Rated: <span>{movieInfo?.Rated}</span>
        </MovieInfo>
        <MovieInfo>
          Released: <span>{movieInfo?.Released}</span>
        </MovieInfo>
        <MovieInfo>
          Runtime: <span>{movieInfo?.Runtime}</span>
        </MovieInfo>
        <MovieInfo>
          Genre: <span>{movieInfo?.Genre}</span>
        </MovieInfo>
        <MovieInfo>
          Director: <span>{movieInfo?.Director}</span>
        </MovieInfo>
        <MovieInfo>
          Actors: <span>{movieInfo?.Actors}</span>
        </MovieInfo>
      </InfoColumn>
    </Container>
  );
};

export default MovieInfoComponent;
