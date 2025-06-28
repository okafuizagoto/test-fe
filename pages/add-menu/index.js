import { useState } from "react";
import { useRouter } from "next/router";
import { addUserMenu } from "../../utils/storage";
import {
  TextField,
  Button,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function AddMenuPage() {
  const [menu, setMenu] = useState("");
  const [path, setPath] = useState("");
  const router = useRouter();

  const handleAdd = () => {
    if (!menu || !path) return;
    addUserMenu({
  menu: menu,
  path: "/"+path,
  iconName: "BarChartIcon" // hanya string, bukan elemen!
});
    router.push("/"+path);
    router.reload()
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" mb={2}>
        Tambah Menu Baru
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Nama Menu"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
        />
        <TextField
          label="Path URL (cth: /fitur-baru)"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd}>
          Simpan Menu
        </Button>
      </Stack>
    </Container>
  );
}
