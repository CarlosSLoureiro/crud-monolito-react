import TextField, { type TextFieldProps } from "@mui/material/TextField";

import Errors from "./errors";

export default function Input(props: TextFieldProps & { _errors?: string[] }) {
  return (
    <>
      <TextField {...props} error={!!props?._errors} />
      <Errors errors={props?._errors} />
    </>
  );
}
