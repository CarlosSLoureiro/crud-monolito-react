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

import ColorSchemeSwitch from "@client/components/ColorSchemeSwitch";

import { useStatusScreen } from "./hooks";
import { Container, jsonPrettyStyles } from "./styles";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StatusScreen() {
  const { isModalOpen, response, handleOpen, handleCloseModal } = useStatusScreen();
  return (
    <Container>
      <Button onClick={handleOpen} variant="contained">
        Conferir Status
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
      <ColorSchemeSwitch />
    </Container>
  );
}
