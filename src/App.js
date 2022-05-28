import Crypto from "./Components/Crypto/Crypto";
import ThemeToggleSwitch from "./Components/UI/ThemeToggleSwitch";
import CryptoItem from "./Routes/CryptoItem";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./Components/UI/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Crypto-Tracker</h1>
        <ThemeToggleSwitch />
        <Routes>
          <Route path="/" element={<Crypto />} />
          <Route path="/:id" element={<CryptoItem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
