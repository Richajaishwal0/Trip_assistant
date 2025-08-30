import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import "./chatbot.css";
import { handleError } from "../utils/errorHandlerToast";
import { apiPost } from "../utils/apiUtils";

interface Message {
  text: string;
  type: "user" | "bot";
  isLoading?: boolean;
  isError?: boolean;
}

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Combined effect for event listeners
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  useEffect(() => {
    // Scroll to the bottom when messages update
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      (event.ctrlKey || event.metaKey)
    ) {
      event.preventDefault();
      // Submit the form programmatically
      formRef.current?.requestSubmit();
    }
  };

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    const userMessage = input?.value?.trim();

    if (!userMessage) return;

    // Add user message
    setMessages((prev: Message[]) => [...prev, { text: userMessage, type: "user" }]);
    input.value = "";
    
    // Add loading state for UI feedback
    setMessages((prev: Message[]) => [
      ...prev,
      { text: "Thinking...", type: "bot", isLoading: true }
    ]);

    try {
      // Use our standardized API utility
      const data = await apiPost<{ message?: string; error?: string }>(
        `${apiBaseUrl}/api/query`, 
        { prompt: userMessage },
        {
          showErrorToast: false, // We'll handle the error display ourselves
          timeout: 30000, // Chatbot responses can take longer
        }
      );
      
      // Remove the loading message
      setMessages((prev: Message[]) => prev.filter(msg => !msg.isLoading));
      
      if (data.error) {
        setMessages((prev: Message[]) => [
          ...prev,
          { text: `Sorry, I couldn't process your request: ${data.error}`, type: "bot" },
        ]);
      } else {
        setMessages((prev: Message[]) => [
          ...prev,
          { text: data.message || "No response from bot.", type: "bot" },
        ]);
      }
    } catch (error) {
      // Remove the loading message if it exists
      setMessages((prev: Message[]) => prev.filter(msg => !msg.isLoading));
      
      // Get a user-friendly error message
      const errorMsg = handleError(
        error, 
        "Sorry, I couldn't connect to my brain right now. Please try again in a moment."
      );
      
      setMessages((prev: Message[]) => [
        ...prev, 
        { text: errorMsg, type: "bot", isError: true }
      ]);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="chatbot-container"
      role="complementary"
      aria-labelledby="chatbot-title"
      aria-live="polite"
    >
      <header className="chatbot-header d-flex justify-content-between align-items-center">
        <h2 id="chatbot-title" className="m-0 h6">Travel Assistant</h2>
        <button 
          className="btn" 
          onClick={onClose}
          aria-label="Close chat assistant"
          type="button"
        >
          <FaTimes aria-hidden="true" />
        </button>
      </header>

      <main 
        className="chatbot-body" 
        ref={chatRef}
        role="log"
        aria-label="Chat conversation"
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.length === 0 ? (
          <div className="welcome-message" role="status">
            <div className="welcome-icon">🤖</div>
            <p>Hello! I'm your travel assistant. How can I help you plan your perfect trip?</p>
          </div>
        ) : (
          messages.map((msg: Message, index: number) => (
            <div
              key={`${msg.type}-${index}-${msg.text.substring(0, 10)}`}
              className={`chatbot-message p-2 rounded mb-1 ${
                msg.type === "user" ? "user-message" : "bot-message"
              } ${msg.isError ? "error-message" : ""} ${msg.isLoading ? "loading-message" : ""}`}
              role={msg.type === "user" ? "presentation" : "status"}
              aria-label={msg.type === "user" ? `You said: ${msg.text}` : `Assistant response: ${msg.text}`}
            >
              {msg.isLoading ? (
                <div className="d-flex align-items-center">
                  <div 
                    className="spinner-border spinner-border-sm me-2" 
                    role="status"
                    aria-label="Assistant is thinking"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  {msg.text}
                </div>
              ) : msg.isError ? (
                <div className="d-flex align-items-center text-danger" role="alert">
                  <span className="me-2" aria-hidden="true">⚠️</span>
                  {msg.text}
                </div>
              ) : (
                msg.text
              )}
            </div>
          ))
        )}
      </main>

      <form 

        ref={formRef}
        className="chatbot-footer p-2 d-flex" 

        onSubmit={handleSendMessage}
        role="form"
        aria-label="Send message to travel assistant"
      >
        <label htmlFor="chat-message-input" className="sr-only">
          Type your travel question or message
        </label>
        <input
          id="chat-message-input"
          type="text"
          name="message"
          className="form-control"
          placeholder="Type a message..."
          aria-describedby="chat-help"
          onKeyDown={handleInputKeyDown}
          required
        />
        <div id="chat-help" className="sr-only">
          Ask me about travel destinations, booking tips, or any travel-related questions.
        </div>
        <button 
          type="submit" 
          className="btn"
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
