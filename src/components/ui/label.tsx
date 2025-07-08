import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    className?: string;
    htmlFor?: string;
}

const Label: React.FC<LabelProps> = ({ children, className = '', htmlFor, ...props }) => (
    <label
        htmlFor={htmlFor}
        className={`text-sm font-medium leading-none ${className}`}
        {...props}
    >
        {children}
    </label>
);

export { Label };
