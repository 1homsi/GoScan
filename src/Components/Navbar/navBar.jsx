import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { auth } from "../../firebase";

export default function NavBar({ navigate }) {
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
            Inventory System
          </Typography>
          {auth.currentUser ? (
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
            <></>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
