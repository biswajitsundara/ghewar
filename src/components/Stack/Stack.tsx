import { ReactNode } from "react";
import './Stack.css';

interface StackProps {
  children: ReactNode;
  gap?: string;
  direction?: "vertical" | "horizontal";
  alignment?: "start" | "center" | "end";
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
}

const Stack = ({
  children,
  gap = "0.5rem",
  direction = "vertical",
  alignment = "start",
  justifyContent = 'flex-start'
}: StackProps) => {
  return (
    <div
      className={`stack ${direction} ${direction}-${alignment}`}
      style={{ gap: `${gap}`, justifyContent: `${justifyContent}` }}
    >
      {children}
    </div>
  );
};

export default Stack;
