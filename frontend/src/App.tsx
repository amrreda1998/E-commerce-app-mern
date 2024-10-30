import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RegistrationPage from "./pages/RegistrationPage";
import AuthProvider from "./Auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<RegistrationPage />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
