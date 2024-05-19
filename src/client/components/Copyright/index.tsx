import { Link } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Copyright(props: any) {
  return (
    <Typography align="center" color="text.secondary" variant="body2" {...props}>
      {`Copyright © `}
      <Link color="inherit" href={window.location.origin}>
        Eu Gestor
      </Link>
      {` `}
      {new Date().getFullYear()}
      {`.`}
    </Typography>
  );
}
