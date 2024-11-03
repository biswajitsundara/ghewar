import "./Heading.css";
import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  lineClamp?: number;
  transform?: "upper" | "lower" | "capitalize";
  textStyle?: "bold" | "italic" | "underline";
  children: React.ReactNode;
}

function Heading({
  level = 1,
  lineClamp = 1,
  transform,
  children,
  textStyle,
  ...props
}: HeadingProps) {
  const Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = `h${level}`;

  const clampedTextStyle: React.CSSProperties = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lineClamp,
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxHeight: `${lineClamp * 1.5}em`,
    lineHeight: "1.5em",
  };

  let headingClassName = `heading heading-h${level}`;
  if (transform) {
    headingClassName = `${headingClassName} text-${transform}`;
  }

  if (textStyle) {
    headingClassName = `${headingClassName} text-${textStyle}`;
  }

  return (
    <Tag {...props} className={headingClassName} style={clampedTextStyle}>
      {children}
    </Tag>
  );
}

export default Heading;
