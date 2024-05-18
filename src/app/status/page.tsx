"use client";

import * as React from "react";

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
import { StatusResponse } from "@server/controllers/status/types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SimpleBackdrop() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [apiResponse, setApiResponse] = React.useState<StatusResponse>();

  const handleOpen = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/status`);
      const resJson = await res.json();
      setApiResponse(resJson);
    } catch (error: any) {
      alert(`Error in console`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    if (apiResponse) {
      setIsModalOpen(true);
    }
  }, [apiResponse]);

  return (
    <div
      style={{
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        height: `100vh`,
      }}
    >
      <Button onClick={handleOpen} variant="contained">
        Conferir Status
      </Button>
      <Backdrop open={isLoading} sx={{ color: `#fff`, zIndex: theme => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        keepMounted
        onClose={handleCloseModal}
        open={isModalOpen}
        TransitionComponent={Transition}
      >
        <DialogTitle>Resposta da API</DialogTitle>
        <DialogContent>
          {apiResponse && (
            <DialogContentText id="alert-dialog-slide-description">
              {JSON.stringify(apiResponse)}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
