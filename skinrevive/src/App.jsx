import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import Shop from "./Components/Shop";
import CategoryPage from "./Components/CategoryPage";
import Navigation from "./Components/Navigation";
import SignIn from "./Components/SignIn";

const App = () => {
  const location = useLocation();
  const excludePath = ["/signin"];

  const shouldRenderNavigation = !excludePath.includes(location.pathname);
  return (
    <div className="flex flex-col">
      {shouldRenderNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;
