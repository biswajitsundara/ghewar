import React from "react";
import "./SkeletonCard.css";

interface SkeletonCardProps {
  padding?: string;
  height?: string;
  width?: string;
  children?: React.ReactNode;
}

const SkeletonCard = ({
  padding = "16px",
  height = "200px",
  width = "300px",
  children,
}: SkeletonCardProps) => {
  return (
    <>
      <div className="skeleton-card" style={{ padding, height, width }}>
        {children}
      </div>
    </>
  );
};

export default SkeletonCard;
