import "./SkeletonText.css";

interface SkeletonTextProps {
  heightVariant?: "small" | "large";
}

const SkeletonText = ({ heightVariant = "small" }: SkeletonTextProps) => {
  const height = heightVariant === "large" ? "40px" : "20px";
  return (
    <div className="skeleton-text-line">
      <div className="skeleton-line" style={{ height: height }}></div>
    </div>
  );
};

export default SkeletonText;
