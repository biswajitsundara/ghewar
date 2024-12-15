import "./Avatar.css";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  initials?: string;
}

const Avatar = ({
  src,
  alt = "User Avatar",
  size = 50,
  initials,
}: AvatarProps) => {
  const avatarSize = { width: size, height: size, fontSize: size / 2 };

  const renderAvatarContent = () => {
    if (src) {
      return <img src={src} alt={alt} className="avatar-image" />;
    } else if (initials) {
      return <span className="avatar-initials">{initials}</span>;
    }
    return <span className="avatar-placeholder">!</span>;
  };

  return (
    <div className="avatar" style={avatarSize}>
      {renderAvatarContent()}
    </div>
  );
};

export default Avatar;
