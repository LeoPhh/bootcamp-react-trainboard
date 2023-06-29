import React from 'react';

interface ButtonProps {
    disabled?: boolean;
    text: string;
    onClick: () => void;
    classes?: string;
}

const Button = ({ disabled, text, onClick, classes }: ButtonProps) => {
    return <button className = { 'button ' + classes } onClick = { onClick } disabled = { disabled }>
        {text}
    </button>;
};

export default Button;