import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RegistrationPage from "./pages/RegistrationPage";
import AuthProvider from "./Auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import CartProvider from "./Cart/CartContextProvider";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/register" element={<RegistrationPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
