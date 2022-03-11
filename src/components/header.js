import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../img/logo.png";
import { Link } from "@mui/material";
import ModalRegAut from "./ModalRegAut";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElRegAuth, setAnchorElRegAuth] = useState(null);

  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("token") ? true : false
  );

  useEffect(() => {
    setIsAuth(localStorage.getItem("token") ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("token")]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenAuthRegMenu = (event) => {
    setAnchorElRegAuth(event.currentTarget);
  };
  const handleCloseAuthRegMenu = () => {
    setAnchorElRegAuth(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };
  const handleLogOuClick = async () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("isEmailConfirmed");
      setIsAuth(true);
      setAnchorElUser(false);
    }
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    const timer = setInterval(() => {
      if (localStorage.getItem("theme") === "true") {
        setTheme("#7d7f7d");
      } else {
        setTheme("#1976d2");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppBar
      position="static"
      sx={{ borderRadius: 4, boxShadow: 8, backgroundColor: theme }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            noWrap
            component="div"
            sx={{ mr: 5, display: { xs: "none", md: "flex" } }}
          >
            <Avatar
              src={logo}
              alt="Logo"
              sx={{ width: 100, height: 100 }}
              variant="rounded"
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="default"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                sx={{ display: "flex", flexDirection: "column" }}
                onClick={handleCloseNavMenu}
              >
                <Typography sx={{ m: 1 }}>
                  <Link href="/" sx={{ textDecoration: "none" }}>
                    Главная
                  </Link>
                </Typography>
                <Typography sx={{ m: 1 }}>
                  <Link href="/uslugi" sx={{ textDecoration: "none" }}>
                    Услуги
                  </Link>
                </Typography>
                <Typography sx={{ m: 1 }}>
                  <Link href="/info/comp" sx={{ textDecoration: "none" }}>
                    О нас
                  </Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Avatar
              src={logo}
              alt="Logo"
              sx={{ width: 70, height: 70 }}
              variant="rounded"
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Typography sx={{ m: 1 }}>
              <Link href="/" sx={{ textDecoration: "none", color: "white" }}>
                Главная
              </Link>
            </Typography>
            <Typography sx={{ m: 1 }}>
              <Link
                href="/uslugi"
                sx={{ textDecoration: "none", color: "white" }}
              >
                Услуги
              </Link>
            </Typography>
            <Typography sx={{ m: 1 }}>
              <Link
                href="/info/comp"
                sx={{ textDecoration: "none", color: "white" }}
              >
                О нас
              </Link>
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuth ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ height: 50, width: 50 }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    sx={{ display: "flex", flexDirection: "column" }}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography sx={{ m: 1 }}>
                      <Link href="/user" sx={{ textDecoration: "none" }}>
                        Профиль
                      </Link>
                    </Typography>
                    <Typography sx={{ m: 1 }}>
                      <Link
                        href="/"
                        onClick={handleLogOuClick}
                        sx={{ textDecoration: "none" }}
                      >
                        Выход
                      </Link>
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <div>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                >
                  <AccountCircleIcon
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenAuthRegMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </AccountCircleIcon>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElRegAuth}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElRegAuth)}
                    onClose={handleCloseAuthRegMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <MenuItem
                      sx={{ display: "flex", flexDirection: "column" }}
                      onClick={handleCloseAuthRegMenu}
                    >
                      <ModalRegAut />
                    </MenuItem>
                  </Menu>
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <ModalRegAut />
                </Box>
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
