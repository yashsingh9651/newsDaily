import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import News from "./components/News";
function App() {
  return (
    <section className="bg-gray-100 w-full min-h-screen text-blue-950">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:newsId" element={<News />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
