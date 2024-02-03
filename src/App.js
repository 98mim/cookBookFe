import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import CustomNavbar from "./components/CustomNavbar";

function App() {
  return (
    <div className="bg-indigo-300">
      <CustomNavbar />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/recipe/:id"} element={<RecipeDetail />} />
    </Routes>
  );
}

export default App;
