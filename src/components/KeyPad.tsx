import { letters } from "../constants/data";

export default function Keypad({
  usedKeys,
}: {
  usedKeys: { [key: string]: string };
}) {
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
