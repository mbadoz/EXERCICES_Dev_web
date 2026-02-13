interface ButtonProps {
    mode?: 'filled' | 'outline' | 'text';
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    Icon?: React.ComponentType<{ className?: string }>;
}
export default function Button({ 
  mode = 'filled', 
  children, 
  Icon, 
  ...props 
}: ButtonProps) {
  return (
    <button className={`button ${mode}-button ${Icon ? 'icon-button' : ''}`} {...props}>
      {Icon && (
        <span className="button-icon">
          <Icon />
        </span>
      )}
      <span>{children}</span>
    </button>
  );

}
