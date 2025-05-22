import { createContext, useState, useContext } from 'react';

const ConversationContext = createContext();

// Context provider component
export const ConversationProvider = ({ children }) => {
    const [conversation, setConversation] = useState([]);

    return (
        <ConversationContext.Provider value={{ conversation, setConversation }}>
            {children}
        </ConversationContext.Provider>
    );
};

// Custom hook to use conversation context
export const useConversation = () => {
    const context = useContext(ConversationContext);
    if (!context) {
        throw new Error("useConversation must be used within a ConversationProvider");
    }
    return context;
};