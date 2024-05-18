"use client";

import { forwardRef, ReactElement, Ref } from "react";
import JSONPretty from "react-json-pretty";

import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import ColorSchemeSwitch from "@client/components/ColorSchemeSwitch";
import GlobalProvider from "@client/providers/Global";

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
  const { isLoading, isModalOpen, apiResponse, handleOpen, handleCloseModal } = useStatusScreen();
  return (
    <GlobalProvider>
      <Container>
        <Button onClick={handleOpen} variant="contained">
          Conferir Status
        </Button>
        <Backdrop open={isLoading} sx={{ color: `#fff`, zIndex: theme => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
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
            {apiResponse && (
              <DialogContentText id="alert-dialog-slide-description">
                <JSONPretty
                  data={apiResponse}
                  id="json-pretty"
                  theme={jsonPrettyStyles}
                ></JSONPretty>
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Fechar</Button>
          </DialogActions>
        </Dialog>
        <ColorSchemeSwitch />
      </Container>
    </GlobalProvider>
  );
}
