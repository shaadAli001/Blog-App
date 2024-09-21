import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
