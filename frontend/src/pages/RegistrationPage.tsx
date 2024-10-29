import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { BackendURL } from "../constants/baseURL";

const RegistrationPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  //handel errors
  const [error, setError] = useState(false);
  //handel success
  const [isRegistered, setIsRegistered] = useState(false);
  //handel email exist
  const [isEmailExist, setisEmailExist] = useState(false);

  // Handling form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handling form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form Data Submitted:", formData);

    //send the registraion info to the server
    const fetchData = async () => {
      try {
        const response = await fetch(`${BackendURL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }),
        });
        const { data } = await response.json();
        console.log(data);
        //TODO:
        //store response (the token) of the user to use it in the login phase or any other requests

        if (response.ok) {
          setIsRegistered(true);
        } else {
          setisEmailExist(true);
        }
      } catch (err) {
        setError(true);
        console.log(err);
      }
    };
    fetchData();
  };

  if (error) {
    return (
      <Box sx={{ fontSize: 30, fontWeight: 4, textAlign: "center", mt: 10 }}>
        Somtheing went wrong :( !!!!{" "}
      </Box>
    );
  }

  if (isRegistered) {
    return (
      <>
        <Box
          sx={{
            fontSize: 50,
            fontWeight: 700, // Make it bolder
            textAlign: "center",
            mt: 10,
            color: "green",
            backgroundColor: "rgba(76, 175, 80, 0.1)", // Light green background
            border: "1px solid #4CAF50", // Green border
            borderRadius: "8px", // Rounded corners
            padding: "20px", // Add some padding
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Slight shadow for depth
          }}
        >
          You have been successfully registered 😄🥳
        </Box>
      </>
    );
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
          Registration Page
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
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
              Register
            </Button>
          </Grid>
          {isEmailExist && (
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
                Email is already exist !!!!
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default RegistrationPage;
