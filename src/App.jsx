import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AddQuote from "./pages/AddQuote";
import About from "./pages/About";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/add-quote" element={<AddQuote />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}