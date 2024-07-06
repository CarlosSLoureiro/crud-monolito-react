import * as React from "react";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Copyright from "@client/components/Copyright";
import Input from "@client/components/Input";

import { useSignUpScreen } from "./hooks";

export default function SignUpScreen() {
  const { errors, handleSignUp } = useSignUpScreen();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: `secondary.main` }}>
          <PersonOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <Box component="form" onSubmit={handleSignUp} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                autoComplete="full-name"
                autoFocus
                fullWidth
                id="name"
                label="Nome Completo"
                name="name"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                _errors={errors?.email?._errors}
                autoComplete="email"
                fullWidth
                id="email"
                label="Endereço de Email"
                name="email"
                required
                type="email"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Input
                _errors={errors?.password?._errors}
                autoComplete="password"
                fullWidth
                id="password"
                label="Senha"
                name="password"
                required
                type="password"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Input
                _errors={errors?.confirmPassword?._errors}
                autoComplete="confirm-password"
                fullWidth
                id="confirmPassword"
                label="Confirmar Senha"
                name="confirmPassword"
                required
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" name="acceptedTermsAndConditions" value="1" />}
                label="Declaro que li e aceito os termos e condições"
              />
            </Grid>
          </Grid>
          <Button fullWidth sx={{ mt: 3, mb: 2 }} type="submit" variant="contained">
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Já tem uma conta? Entre aqui
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
