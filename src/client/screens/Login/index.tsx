import * as React from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Copyright from "@client/components/Copyright";
import Input from "@client/components/Input";

import { useLoginScreen } from "./hooks";

export default function LoginScreen() {
  const { errors, handleLogin } = useLoginScreen();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: `secondary.main` }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <Input
            _errors={errors?.email?._errors}
            autoComplete="email"
            autoFocus
            fullWidth
            id="email"
            label="Endereço de Email"
            margin="normal"
            name="email"
            required
            type="email"
          />
          <Input
            _errors={errors?.password?._errors}
            autoComplete="password"
            fullWidth
            id="password"
            label="Senha"
            margin="normal"
            name="password"
            required
            type="password"
          />
          <Button fullWidth sx={{ mt: 3, mb: 2 }} type="submit" variant="contained">
            Entrar
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/cadastro" variant="body2">
                {`Cadastre-se`}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
