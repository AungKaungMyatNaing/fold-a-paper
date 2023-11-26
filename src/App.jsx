import { useEffect } from "react";
import { useState } from "react";
import data from "./data.json";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);
  const [thick, setThick] = useState(0.1);

  const adjustUnit = (val) => {
    if (val < 100) {
      return `${round(val)}mm`;
    } else if (val > 100 && val < 1000) {
      return `${round(val / 10)}cm`;
    } else if (val > 1000 && val < 1000000) {
      return `${round(val / 1000)}m`;
    } else if (val > 1000000) {
      let number = round(val / 1000000);
      return `${
        number < 1000
          ? number.toLocaleString("en-US")
          : Math.round(number).toLocaleString("en-US")
      }km`;
    }
  };

  function round(value) {
    let multiplier = Math.pow(10, 1);
    return Math.round(value * multiplier) / multiplier;
  }

  return (
    <>
      <div className="container">
        <h1>Here's your piece of paper</h1>
        <h1>
          {count} fold{count > 1 ? "s" : ""}
        </h1>
        <img src={`../public/photos/${count}.jpg`} alt="" />
        <p className="small-text">{data[count].text}</p>
        {count > 0 ? (
          <p className="text">Your paper is now {adjustUnit(thick)} tall.</p>
        ) : (
          ""
        )}
        <button
          onClick={() => {
            setCount((prevCount) => prevCount - 1);
            setThick((prevThick) => prevThick / 2);
          }}
          disabled={count === 0}
          className={count > 0 ? "red" : "disabled"}
        >
          Unfold
        </button>
        <button
          onClick={() => {
            setCount((prevCount) => prevCount + 1);
            setThick((prevThick) => prevThick * 2);
          }}
          disabled={count === 42}
          className={count < 42 ? "green" : "disabled"}
        >
          Fold
        </button>
      </div>
    </>
  );
};

export default App;
