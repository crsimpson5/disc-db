import React from "react";

import Container from "@material-ui/core/Container";

export default function Navbar() {
  return (
    <nav style={{ height: 80, backgroundColor: "hsl(0, 0%, 90%)", marginBottom: 40, display: "flex", alignItems: "center" }}>
      <Container>
        <h1 style={{ fontSize: 35, margin: 0 }}>Disc Database</h1>
      </Container>
    </nav>
  );
}
