import React, {
  useState,
  useEffect
} from "react";

import {
  Link,
  useParams
} from "react-router-dom";

import "./InfoPage.scss";
import imgSrc from "../utils/imgSrc";

import Navbar from "../components/Navbar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

export default function InfoPage() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    getDiscData(id);
  }, [id]);

  function getDiscData(id) {
    let urlToFetch = `/api/${id}`;

    fetch(urlToFetch, {
      method: "GET"
    })
    .then(res => res.json())
    .then(json => {
      setData(json);
    })
    .catch(err => console.error(err));
  }

  return (
    <div className="info-page"> 
      <Navbar />
      <Container>
        <Link to={"/"}>
          <p>{"<"} BACK</p>
        </Link>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <div className="img-wrapper">
              <img src={data.imgSrc && `${imgSrc}${data.imgSrc}`}/>
            </div>
            <div className="stats">
              <span className="speed-lighter">Speed: {data.speed}</span>
              <span className="glide-lighter">Glide: {data.glide}</span>
              <span className="turn-lighter">Turn: {data.turn}</span>
              <span className="fade-lighter">Fade: {data.fade}</span>
            </div>
          </Grid>
          <Grid item md={6}>
          <h2>{data.name}</h2>
            <p>
              {data.description}
            </p>
            <br/>
            <p>
              - {data.manufacturer}
            </p>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
