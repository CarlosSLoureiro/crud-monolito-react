import { Link } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Copyright(props: any) {
  return (
    <Typography align="center" color="text.secondary" paddingTop={2} variant="body2" {...props}>
      {`Copyright © `}
      <Link color="inherit" href="mailto:loureiro.s.carlos@gmail.com">
        Carlos Loureiro
      </Link>
      {` `}
      {new Date().getFullYear()}
      {`.`}
    </Typography>
  );
}
