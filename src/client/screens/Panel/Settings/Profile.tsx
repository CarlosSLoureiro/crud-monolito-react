import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Input from "@client/components/Input";
import { Auth } from "@client/utils/auth";

import { TabContent } from "./styles";

export default function ProfileScreenTab() {
  return (
    <TabContent>
      <Box component="form" onSubmit={() => console.log(`handle profile`)} sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          <Grid xs={6}>
            <Input
              autoFocus
              defaultValue={Auth.user?.name}
              fullWidth
              id="name"
              label="Nome"
              margin="normal"
              name="name"
              required
              type="text"
            />
          </Grid>
          <Grid xs={6}>
            <Input
              autoFocus
              fullWidth
              id="name"
              label="Sobrenome"
              margin="normal"
              name="name"
              required
              type="text"
            />
          </Grid>
          <Button fullWidth sx={{ mt: 3, mb: 2 }} type="submit" variant="contained">
            Salvar
          </Button>
        </Grid>
      </Box>
    </TabContent>
  );
}
