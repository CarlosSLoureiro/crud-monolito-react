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
              defaultValue={Auth.user?.name}
              disabled
              fullWidth
              id="name"
              label="Nome"
              margin="normal"
              name="name"
              required
              type="text"
            />
          </Grid>
        </Grid>
      </Box>
    </TabContent>
  );
}
