import { ReactNode } from "react";
import "./Card.css";
import classNames from "classnames";

interface CardProps {
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  size?: "default" | "small" | "medium" | "large";
  variant?: "default" | "primary" | "secondary";
  onClick?: () => void;
}

const Card = ({
  header,
  body,
  footer,
  size = "default",
  variant = "default",
  onClick,
}: CardProps) => {
  const cardClassNames = classNames(
    "card",
    `size-${size}`,
    `variant-${variant}`,
    {
      "card-hover": onClick,
    }
  );

  return (
    <div className={cardClassNames} onClick={onClick}>
      {header && <div className="card-header">{header}</div>}
      {body && <div className="card-body">{body}</div>}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
