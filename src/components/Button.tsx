import React from 'react';

interface ButtonProps {
    disabled?: boolean;
    text: string;
    onClick: () => void;
}

const Button = ({ disabled, text, onClick }: ButtonProps) => {
    return <button onClick = { onClick } disabled = { disabled }>{text}</button>;
};

export default Button;