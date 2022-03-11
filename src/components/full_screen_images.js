import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BgImage from "../img/bg_img.jpg";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";

const FullScreenImages = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    const timer = setInterval(() => {
      if (localStorage.getItem("theme") === "true") {
        setTheme("90%");
      } else {
        setTheme("1");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const styles = {
    bgContainer: {
      backgroundImage: `url(${BgImage})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      height: "100%",
      filter: `brightness(${theme})`,
    },
    modalBox: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      minWidth: 250,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: 4,
    },
  };

  return (
    <div>
      <Box
        py={{ xs: 10, sm: 30 }}
        style={styles.bgContainer}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
        }}
      >
        <Card
          sx={{
            minWidth: 275,
            maxWidth: 400,
            flexWrap: "wrap",
            p: 1,
            m: 1,
            mt: 2,
            bgcolor: "background.paper",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Автосервис по ремонту автомобилей в Владимире
            </Typography>
            <Typography variant="body2">
              Нажмите на кнопку перезвонить
              <br />
              Что бы узнать больше о нас
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={handleOpen} size="small">
              Перезвонить
            </Button>
          </CardActions>
        </Card>
        <Modal open={open} onClose={handleClose}>
          <Box sx={styles.modalBox}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Оставьте свой номер для звонка:
            </Typography>
            <Input></Input>
            <Button size="small">Позвонить вам</Button>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default FullScreenImages;
