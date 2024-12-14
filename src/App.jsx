import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import JobList from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/result" element={<JobList />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
