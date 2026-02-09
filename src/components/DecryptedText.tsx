import { useEffect, useMemo, useState } from 'react';

type DecryptedTextProps = {
  text: string;
  className?: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
};

const DecryptedText = ({
  text,
  className = '',
  speed = 28,
  maxIterations = 12,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
}: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [iteration, setIteration] = useState(0);

  const target = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    setIteration(0);
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    if (iteration >= target.length + maxIterations) {
      setDisplayText(text);
      return;
    }

    const timeout = window.setTimeout(() => {
      const next = target
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) return char;
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');

      setDisplayText(next);
      setIteration((prev) => prev + 1);
    }, speed);

    return () => window.clearTimeout(timeout);
  }, [characters, iteration, maxIterations, speed, target, text]);

  return <span className={className}>{displayText}</span>;
};

export default DecryptedText;
