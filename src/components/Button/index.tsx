import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", className = "", children, disabled, ...props }) => {
  const buttonStyles = {
    primary: "text-white focus:ring-blue-500 bg-primary",
    secondary: "bg-gray-100 text-primary  focus:ring-gray-500",
    outline: "border border-border text-black focus:ring-blue-500",
    danger: "bg-red-500 text-white focus:ring-red-500",
  };

  return (
    <button
      {...props}
      className={`px-2 py-1  font-medium transition-all focus:outline-none focus:ring-2 ${buttonStyles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
