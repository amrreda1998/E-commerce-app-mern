import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { BackendURL } from "../constants/baseURL";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // define the navigation hook
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //handel errors
  const [Error, setError] = useState(false);
  //handel success
  const [isLogin, setIsLogin] = useState(false);
  //handel email exist
  const [isValidEmail, setIsValidEmail] = useState(true);

  // Handling form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //use authenticatinContext
  const { setAuthData } = useAuth();

  // Handling form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form Data Submitted:", formData);

    // send the login info to the server
    const fetchData = async () => {
      try {
        const response = await fetch(`${BackendURL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const { data } = await response.json();
        console.log(data);

        if (response.ok) {
          //store response (the token) of the user to
          //use it when the user try to request a service form the backend (authentucat)
          setAuthData(formData.email, data);
          setIsLogin(true);
        } else {
          setIsValidEmail(false);
        }
      } catch (err) {
        setError(true);
        console.log(err);
      }
    };
    fetchData();
  };

  if (Error) {
    return (
      <Box sx={{ fontSize: 30, fontWeight: 4, textAlign: "center", mt: 10 }}>
        Something went wrong ☹️ !!!!
      </Box>
    );
  }

  if (isLogin) {
    //navigate to the home page
    navigate("/");
  }

  return (
    <Container
      sx={{
        mt: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
          Login Page
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              sx={{ m: "auto", display: "flex" }}
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Login
            </Button>
          </Grid>
          {isValidEmail || (
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  fontSize: 20,
                  fontWeight: 4,
                  textAlign: "center",
                  mt: 2,
                  color: "#ff1744",
                }}
              >
                Wrong Email or Password !!!!
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;
