import Typography from "@mui/material/Typography";

import { useThemeContext } from "@client/contexts/Theme";

export default function Errors(props: { errors?: string[] }) {
  const { theme } = useThemeContext();

  return (
    props.errors?.length && (
      <>
        {props.errors.map(err => (
          <>
            <Typography
              color={theme === `light` ? `#d32f2f` : `#f44336`}
              gutterBottom
              variant="caption"
            >
              {err}
            </Typography>
          </>
        ))}
      </>
    )
  );
}
