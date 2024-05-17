'use client'

import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonUsage() {
  const onClick = () => {
    document.title = 'teste';
  };
  return <Button variant="contained" onClick={onClick}>Hello world</Button>;
}