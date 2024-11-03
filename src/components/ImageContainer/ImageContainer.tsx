import "./ImageContainer.css";

interface ImageContainerProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  size?: "xs" | "sm" | "md" | "lg";
  overlayText?: string;
}

function ImageContainer({
  src,
  alt,
  size = "sm",
  overlayText,
  ...rest
}: ImageContainerProps) {
  return (
    <div className="image-container">
      <img src={src} alt={alt} className={`image image-${size}`} {...rest} />
      {overlayText && <div className="overlay">{overlayText}</div>}
    </div>
  );
}

export default ImageContainer;
