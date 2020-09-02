import React from "react";
import {
  Link
} from "react-router-dom";
import "./Navbar.scss";

import Container from "@material-ui/core/Container";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Container>
        <Link to={"/"}>
          <h1>Disc Database</h1>
        </Link>
      </Container>
    </nav>
  );
}
