import "./App.css";
import { GlobalStateProvider } from "./GlobalStateProvider";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Authentication from "./pages/Authentication/Authentication";

function App() {
  return (
    <GlobalStateProvider>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authentication" element={<Authentication />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
