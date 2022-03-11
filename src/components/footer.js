import {
  Avatar,
  Box,
  Container,
  Grid,
  Link,
  Switch,
  Typography,
} from "@mui/material";
import LogoFooter from "../img/logo.png";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MapIcon from "@mui/icons-material/Map";
import { useEffect, useState } from "react";
import Feedback from "./feedback";

const Footer = () => {
  const [theme, setTheme] = useState(false);

  const toogle = (event) => {
    if (event === false) {
      setTheme(false);
      localStorage.setItem("theme", false);
    } else {
      setTheme(true);
      localStorage.setItem("theme", true);
    }
  };

  const themeFooter = () => {
      if(localStorage.getItem('theme')==="true"){
          return '#7d7f7d'
      }else{
          return "#1976d2"
      }
  }

  useEffect(() => {
    setTheme(localStorage.getItem("theme") === "true");
    
  }, []);

  return (
    <div>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor={themeFooter}
        color="white"
        margin={0}
        sx={{ borderRadius: 4, boxShadow: 8 }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Avatar
                src={LogoFooter}
                sx={{ width: 150, height: 150 }}
                variant="rounded"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h6">
                <Box borderBottom={1}>Информация</Box>
                <Box>
                  <Link href="/" color="inherit">
                    <LocalPhoneIcon /> Телефон
                  </Link>
                </Box>
                <Box>
                  <Link href="/info/comp" color="inherit">
                    <MapIcon /> О нас
                  </Link>
                </Box>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography>
                <Switch
                  checked={theme}
                  onChange={(e) => toogle(e.target.checked)}
                />
                Изменить тему
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Feedback/>
            </Grid>
          </Grid>
          
        </Container>
      </Box>
    </div>
  );
};

export default Footer;
