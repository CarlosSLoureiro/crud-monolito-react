import { forwardRef, type ReactElement, type Ref } from "react";
import JSONPretty from "react-json-pretty";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { type TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";

import { useStatusScreen } from "./hooks";
import { Container, jsonPrettyStyles } from "./styles";
import { type StatusPageProps } from "./types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StatusScreen(props: StatusPageProps) {
  const { isModalOpen, response, handleOpen, handleBack, handleCloseModal } =
    useStatusScreen(props);
  return (
    <Container>
      <Typography component="h2" textAlign="center" variant="h5">
        {props?.isWithAuthMiddleware ? (
          <>
            Ao clicar no botão abaixo, será feita 2 requisições simultâneas para a API para testar o
            fluxo de refresh tokens.
            <br />
            Vale ressaltar que o access token está configurado para expirar em 15 minutos.{` `}
            <em>(src/server/services/auth/index.ts:20)</em>
          </>
        ) : (
          <>
            Ao clicar no botão abaixo, será feita uma requisição para a API.
            <br />O resultado esperado é o horário do banco de dados.
          </>
        )}
      </Typography>
      <Button onClick={handleOpen} variant="contained">
        Conferir Status da API
      </Button>
      <Button onClick={handleBack} variant="contained">
        Voltar
      </Button>
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        color="red"
        keepMounted
        onClose={handleCloseModal}
        open={isModalOpen}
        TransitionComponent={Transition}
      >
        <DialogTitle>Resposta da API</DialogTitle>
        <DialogContent>
          {response && (
            <DialogContentText id="alert-dialog-slide-description">
              <JSONPretty data={response} id="json-pretty" theme={jsonPrettyStyles}></JSONPretty>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
