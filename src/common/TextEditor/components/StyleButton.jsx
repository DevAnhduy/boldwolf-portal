import React from 'react';

export const StyleButton = ({ active, label, onClick }) => {
    let className = "RichEditor-styleButton";

    if (active) className += " RichEditor-activeButton";
    return (
        <span className={className} 
              onClick={onClick}>
            {label}
        </span>
    )
}