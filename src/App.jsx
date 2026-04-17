import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Button } from "./components/Button/Button";
import { List } from "./List";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button className="counter" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <Button onClick={() => setCount((count) => count + 1)} text={`Count is ${count}`} />
      </section>
      <hr />
      <List />
    </>
  );
}

export default App;
