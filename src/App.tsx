import "./styles.css";
import { useState, useEffect } from "react";

//1. Render all the countries and captails in random order
//2.Aim of the game is to select the country and captail
//3. User can select 2 options and default border is #414141
//4. Selected option border should be in blue
//5. If selected options are correct need change border color to green after 1000ms both options should disappear
//6. If select options are wrong need to higlight border in red and after 1000ms need to reset

const data = {
  India: "New Delhi",
  "United states": "Washington DC",
  China: "Beijing",
  Japan: "Tokyo",
  "United kingdom": "London",
  France: "Paris",
  Germany: "Berlin",
  Russia: "Moscow",
  Netherlands: "Amsterdam",
  Thailand: "Bangkok",
};

const shuffleArray = (array) => {
  // Create a shallow copy to keep the operation immutable
  const shuffled = [...array];

  // Walk backward from the end of the array down to the second element
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at index i and index j using ES6 destructuring shorthand
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};
export default function App() {
  const [options, setOptions] = useState([]);
  const [pair, setPair] = useState([]);
  useEffect(() => {
    const items = Object.entries(data).flat();
    setOptions(shuffleArray(items));
  }, []);

  const onSelect = (e) => {
    const { target } = e;
    const selectedItem = target.dataset.item;
    pair.length < 2 && setPair((prev) => [...prev, selectedItem]);
    pair.length == 1 &&
      setTimeout(() => {
        setPair([]);
      }, 1000);
  };
  const isCorrect = (item) => {
    const [first, second] = pair;
    if (pair.length == 2 && pair.includes(item)) {
      if (data[first] == second || data[second] == first) {
        setTimeout(() => {
          setOptions((prev) => prev.filter((i) => i !== first && i !== second));
        }, 1000);
        return "green";
      } else {
        return "red";
      }
    }
  };
  if (options.length == 0) {
    return <p> COngrats</p>;
  }
  return (
    <div className="App">
      {options.map((item) => {
        return (
          <button
            className={`item ${pair.includes(item) && "blue"} ${isCorrect(
              item
            )}`}
            key={item}
            onClick={onSelect}
            data-item={item}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
