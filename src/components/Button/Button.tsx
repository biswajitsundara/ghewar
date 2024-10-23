import "./Button.css";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline',
  size?: 'xs'| 'sm' | 'md' | 'lg' | 'full'
  children?: React.ReactNode;
}

const Button = ({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) => {
  return (
    <div>
      <button {...props} className={`btn btn-${variant} btn-${size}`}>
        {children}
      </button>
    </div>
  );
};

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
};

export default Button;
