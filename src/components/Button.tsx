import React from 'react';

interface ButtonProps {
    styles?: React.CSSProperties;
    text: string;
    onClick: () => void;
}

const Button = ({ text, onClick, styles, ...props }: ButtonProps) => {
    const buttonStyle: React.CSSProperties = {
        padding: '10px',
        fontSize: '30pt',
    };

    return <button style = { Object.assign(buttonStyle, styles) } onClick = { onClick } { ...props }>
        {text}
    </button>;
};

export default Button;