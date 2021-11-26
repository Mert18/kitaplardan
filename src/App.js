import "./App.css";
import data from "./data.json";
import { useState } from "react";

function App() {
  console.log(data);
  const [index, setIndex] = useState();
  return <div className="container"></div>;
}

export default App;
