import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Draw from "./Pages/Draw";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/room/:id" element={<Draw />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
