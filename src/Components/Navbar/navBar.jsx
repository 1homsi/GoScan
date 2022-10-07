import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { auth, db } from "../../firebase";

export default function NavBar({ navigate }) {
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigate("/");
      window.location.reload();
    });
  };

  React.useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await db
          .collection("Students")
          .doc(user.uid)
          .get()
          .then((doc) => {
            setUser(doc.data());
          });
        setUserLoggedIn(true);
      }
    });
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        style={{
          background: "#6e2479",
          position: "fixed",
        }}
      >
        <Toolbar>
          <Typography
            style={{
              cursor: "pointer",
            }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              if (auth.currentUser) {
                if (user.isAdmin) {
                  navigate("/admin");
                } else if (!user.isAdmin) {
                  navigate("/carowner");
                }
              } else {
                navigate("/");
              }
            }}
          >
            RHU Carpooling App
          </Typography>
          <>
            {userLoggedIn ? (
              <>
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
                  LogIn Car Owner
                </Button>
              </>
            )}
          </>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
