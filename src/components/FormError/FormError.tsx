import React from "react";
import styles from "./FormError.module.css";

interface FormErrorProps {
    message?: string;
    className?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message, className }) => {
    if (!message) return null;

    return (
        <p className={className || styles.errorMessage}>
            {message}
        </p>
    );
};
