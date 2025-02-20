import { useState } from "react";
import LetterForm from "./components/LetterForm";
import LetterDisplay from "./components/LetterDisplay";
import { LoveLetterResponse } from "./api/api";

export default function App() {
  const [letter, setLetter] = useState<LoveLetterResponse | null>(null);

  return (
    <div className="container">
      
      <div className="floating-hearts">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="animate-floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <h1 className="title">💌 Valentine AI 💌</h1>
      <LetterForm onLetterGenerated={setLetter} />
      {letter && <LetterDisplay letter={letter.letter} />}
    </div>
  );
}
