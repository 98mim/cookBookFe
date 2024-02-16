import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import CustomNavbar from "./components/CustomNavbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="bg-indigo-300 h-screen">
      <UserProvider>
        <BrowserRouter>
          <CustomNavbar />
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/recipe/:id"} element={<RecipeDetail />} />
    </Routes>
  );
}

export default App;
