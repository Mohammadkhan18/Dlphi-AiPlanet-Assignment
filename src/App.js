import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Form from "./Components/Form/Form";
import './App.css'
import CardDetails from "./Components/Card/CardDetails";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="form" element={<Form />} />
        <Route path="/details/:name" element={<CardDetails/>}/>
        {/* <Route path="data-related-to-submission" element={<DataRelated />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
