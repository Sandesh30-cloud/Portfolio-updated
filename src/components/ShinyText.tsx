type ShinyTextProps = {
  text: string;
  className?: string;
  speed?: number;
  disabled?: boolean;
};

const ShinyText = ({ text, className = '', speed = 3, disabled = false }: ShinyTextProps) => {
  return (
    <span
      className={`shiny-text ${disabled ? 'shiny-text--disabled' : ''} ${className}`.trim()}
      style={{ ['--shine-duration' as string]: `${speed}s` }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
