import React from 'react';
import './Card.css';

interface CardProps {
  variant: 'small' | 'medium' | 'large';
  backgroundColor: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ variant, backgroundColor, children }) => {
  return (
    <div className={`card ${variant}`} style={{ backgroundColor }}>
      {children}
    </div>
  );
};

export default Card;
