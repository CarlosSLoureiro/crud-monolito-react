"use client";

import Button from "@mui/material/Button";
import * as React from "react";

export default function ButtonUsage() {
  const onClick = () => {
    document.title = `teste`;
  };
  return (
    <Button onClick={onClick} variant="contained">
      Hello world
    </Button>
  );
}
