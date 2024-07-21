import { useState, useEffect } from "react";
import { Wordle } from "./components";

const App = () => {
  const [solution, setSolution] = useState<{ id: string; word: string } | null>(
    null
  );

  useEffect(() => {
    fetch("http://localhost:3000/solutions")
      .then((response) => response.json())
      .then((data) => {
        const randomSolution = data[Math.floor(Math.random() * data.length)];
        setSolution(randomSolution.word);
      });
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
};

export default App;
