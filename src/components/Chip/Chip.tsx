import "./Chip.css";

interface ChipProps {
  text: string;
  onClose: () => void;
  image?: string;
  shape?: "oval" | "rectangular";
  size?: "small" | "medium" | "large";
}

const Chip = ({
  text,
  onClose,
  image,
  shape = "oval",
  size = "medium",
}: ChipProps) => {
  const customClass = `chip-${shape} chip-${size}`;

  return (
    <div className={`chip ${customClass}`}>
      {image && (
        <img
          src={image}
          alt="chip Icon"
          className={`chip-image chip-${size}`}
        />
      )}
      <span className="chip-text">{text}</span>
      <button className="chip-close-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Chip;
