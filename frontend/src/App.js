import "./App.css";
import { GlobalStateProvider } from "./GlobalStateProvider";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <GlobalStateProvider>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
