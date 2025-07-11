import React, { createContext, useContext } from 'react';
import { toast } from 'sonner';

interface FeedbackContextType {
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
    showInfo: (message: string) => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const useFeedback = () => {
    const context = useContext(FeedbackContext);
    if (context === undefined) {
        throw new Error('useFeedback must be used within a FeedbackProvider');
    }
    return context;
};

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const showSuccess = (message: string) => {
        toast.success(message);
    };

    const showError = (message: string) => {
        toast.error(message);
    };

    const showInfo = (message: string) => {
        toast.info(message);
    };

    return (
        <FeedbackContext.Provider value={{ showSuccess, showError, showInfo }}>
            {children}
        </FeedbackContext.Provider>
    );
};
