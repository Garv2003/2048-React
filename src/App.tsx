import { useState, useEffect } from "react";
import { Wordle } from "./components";
import { solutions } from "./constants/data";

const App = () => {
  const [solution, setSolution] = useState<{ id: string; word: string } | null>(
    null
  );

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * solutions.length);
    const { id, word } = solutions[randomIndex];
    setSolution({ id: id.toString(), word });
  }, []);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution.word} />}
    </div>
  );
};

export default App;
