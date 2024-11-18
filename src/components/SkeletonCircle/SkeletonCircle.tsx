import "./SkeletonCircle.css";

const SkeletonCircle = ({ size = "100px" }) => {
  return (
    <div className="circle-skeleton" style={{ width: size, height: size }} />
  );
};

export default SkeletonCircle;
