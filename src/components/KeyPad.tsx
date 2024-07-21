import { useEffect, useState } from "react";

export default function Keypad({
  usedKeys,
}: {
  usedKeys: { [key: string]: string };
}) {
  const [letters, setLetters] = useState<{ key: string }[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/letters")
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);

  return (
    <div className="keypad">
      {letters &&
        letters.map((l: { key: string }) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color}>
              {l.key}
            </div>
          );
        })}
    </div>
  );
}
