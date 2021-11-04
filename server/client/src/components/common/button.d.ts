import React from "react";
interface Props {
    color?: "primary" | "secondary" | "disabled";
    className?: string;
    onClick: () => void;
}
declare const Button: React.FC<Props>;
export default Button;
