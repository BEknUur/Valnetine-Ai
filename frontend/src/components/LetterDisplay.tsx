interface LetterDisplayProps {
  letter: string;
}

export default function LetterDisplay({ letter }: LetterDisplayProps) {
  return (
    <div className="letter-container">
      
      <div className="heart-container">
        <span
          className="animate-floating"
          style={{
            '--float-distance': '-30px',
            '--rotate': '15deg',
            '--scale': '1.1',
            '--float-duration': '6s',
            '--size': '2rem',
            '--opacity': '0.7',
          } as React.CSSProperties}
        >
          ❤️
        </span>
        <span
          className="animate-floating"
          style={{
            '--float-distance': '-20px',
            '--rotate': '-10deg',
            '--scale': '1.2',
            '--float-duration': '5s',
            '--size': '1.5rem',
            '--opacity': '0.7',
          } as React.CSSProperties}
        >
          💖
        </span>
      </div>

      <h2 className="letter-title">Your Love Letter</h2>

      <div className="letter-text">
        {letter.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-4 text-right italic text-sm text-pink-300">
        With love, Valentine AI ✨
      </div>
    </div>
  );
}
