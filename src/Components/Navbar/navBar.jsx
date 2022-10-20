import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { auth } from "../../firebase";

export default function NavBar({ navigate }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
  }, []);

  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigate("/Intro");
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        style={{
          background: "#2E3B55",
          position: "fixed",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate("/");
            }}
          >
            GoScan
          </Typography>
          {isUserLoggedIn ? (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/add");
                }}
              >
                Add
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  handleLogOut();
                }}
              >
                LogOut
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
