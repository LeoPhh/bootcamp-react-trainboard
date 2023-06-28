import React from 'react';

interface ButtonProps {
    disabled?: boolean;
    text: string;
    onClick: () => void;
    classes?: string;
}

const Button = ({ disabled, text, onClick, classes, ...props }: ButtonProps) => {
    return <button className = { 'button ' + classes } onClick = { onClick } disabled = { disabled } { ...props }>
        {text}
    </button>;
};

export default Button;