import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Input from "@client/components/Input";

import { usePasswordScreenTab } from "./hooks";
import { TabContent } from "../../styles";

export default function PasswordScreenTab() {
  const { errors, handleChangePassword } = usePasswordScreenTab();

  return (
    <TabContent>
      <Box component="form" onSubmit={handleChangePassword} sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          <Grid xs={12}>
            <Input
              _errors={errors?.currentPassword?._errors}
              fullWidth
              id="currentPassword"
              label="Sua senha Atual"
              margin="normal"
              name="currentPassword"
              required
              type="password"
            />
          </Grid>
          <Grid xs={6}>
            <Input
              _errors={errors?.newPassword?._errors}
              fullWidth
              id="newPassword"
              label="Nova senha"
              margin="normal"
              name="newPassword"
              required
              type="password"
            />
          </Grid>
          <Grid xs={6}>
            <Input
              _errors={errors?.confirmNewPassword?._errors}
              fullWidth
              id="confirmNewPassword"
              label="Confirme a nova senha"
              margin="normal"
              name="confirmNewPassword"
              required
              type="password"
            />
          </Grid>
          <Button fullWidth sx={{ mt: 3, mb: 2 }} type="submit" variant="contained">
            Alterar senha
          </Button>
        </Grid>
      </Box>
    </TabContent>
  );
}
