import React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
    classes?: string;
}

const Button = ({ text, onClick, classes, ...props }: ButtonProps) => {
    return <button className = { 'button ' + classes } onClick = { onClick } { ...props }>
        {text}
    </button>;
};

export default Button;