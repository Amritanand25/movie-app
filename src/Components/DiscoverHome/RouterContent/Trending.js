import React, { useState, useEffect, useContext } from "react";
import { Context1, Context2 } from "../../../App";
import {
  typeCheck,
  filteredData,
  searchList
} from "./Popular";
import Card from "../UI/Card";
const Trending = () => {
  const [movieData, setMovieData] = useState([]);
  const [movieDataOriginal, setMovieDataOriginal] = useState([]);
  const [tvData, setTvData] = useState([]);
  const [tvDataOriginal, setTvDataOriginal] = useState([]);
  const formData = useContext(Context1);
  const searchData = useContext(Context2);
  const [movieVisible, setMovieVisible] = useState(true);

  //trending movie data
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=3a94078fb34b772a31d9a1348035bed7"
    )
      .then((data) => {
        if (data.status >= 200 && data.status <= 299) return data.json();
        else throw Error(data.statusText);
      })
      .then((data) => {
        setMovieData(data.results);
        setMovieDataOriginal(data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  //trending tv data
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=3a94078fb34b772a31d9a1348035bed7"
    )
      .then((data) => {
        if (data.status >= 200 && data.status <= 299) return data.json();
        else throw Error(data.statusText);
      })
      .then((data) => {
        setTvData(data.results);
        setTvDataOriginal(data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const visible = typeCheck(formData.type);
    setMovieVisible(visible);
    let arr1 = filteredData([...movieDataOriginal], formData);
    let arr2 = filteredData([...tvDataOriginal], formData);
    setMovieData(arr1);
    setTvData(arr2);
  }, [formData, movieDataOriginal, tvDataOriginal]);

  useEffect(() => {
    const searchWord = searchData.trim();
    const dataMovie = searchList(searchWord, movieDataOriginal);
    const dataTv = searchList(searchWord, tvDataOriginal);

    if (dataMovie === true) setMovieData(movieDataOriginal);
    else setMovieData(dataMovie);

    if (dataTv === true) setTvData(tvDataOriginal);
    else setTvData(dataTv);
  }, [searchData, movieDataOriginal, tvDataOriginal]);

  return (
    <div className="wrapper">
      {movieVisible && movieData.length === 0 && (
        <p style={{ textAlign: "center" }}>Nothing found. Please try again.</p>
      )}

      {movieVisible &&
        movieData &&
        movieData.map((item) => (
          <Card
            key={item.id}
            url={item.poster_path}
            alt={item.original_title}
            title={item.title}
            release_date={item.release_date}
            vote_average={item.vote_average}
          />
        ))}

      {!movieVisible && tvData.length === 0 && (
        <p style={{ textAlign: "center" }}>Nothing found. Please try again.</p>
      )}

      {!movieVisible &&
        tvData &&
        tvData.map((item) => (
          <Card
            key={item.id}
            url={item.poster_path}
            alt={item.original_name}
            title={item.name}
            release_date={item.first_air_date}
            vote_average={item.vote_average}
          />
        ))}
    </div>
  );
};

export default Trending;
