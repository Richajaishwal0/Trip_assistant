import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaRobot, FaComments } from "react-icons/fa";
import "./chatbot.css";
import { handleError } from "../utils/errorHandlerToast";

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
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    // Scroll to the bottom when messages update
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      // Force re-render when theme changes
      // The CSS will handle the visual changes automatically
    };

    window.addEventListener("themeChanged", handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener("themeChanged", handleThemeChange as EventListener);
    };
  }, []);

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    const userMessage = input?.value?.trim();

    if (!userMessage) return;

    // Add user message
    setMessages((prev: Message[]) => [...prev, { text: userMessage, type: "user" }]);
    input.value = "";

    try {
      const res = await fetch(`${apiBaseUrl}/api/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      // Add loading state for UI feedback
      setMessages((prev: Message[]) => [
        ...prev,
        { text: "Thinking...", type: "bot", isLoading: true }
      ]);

      // Check if response is ok and has content
      if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      const responseText = await res.text();
      if (!responseText) {
        throw new Error("Empty response from server");
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.error("Response text:", responseText);
        throw new Error("Invalid response format from server");
      }
      
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
    <aside 
      className="chatbot-container card shadow"
      role="complementary"
      aria-labelledby="chatbot-title"
      aria-live="polite"
    >
      <header className="chatbot-header bg-primary text-white p-2 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <h2 id="chatbot-title" className="m-0 h6">
            🤖 Travel Assistant
          </h2>
        </div>
        <button 
          className="btn btn-sm text-white border-0 bg-transparent" 
          onClick={onClose}
          aria-label="Close chat assistant"
          type="button"
        >
          <FaTimes aria-hidden="true" />
        </button>
      </header>

      <main 
        className="chatbot-body p-2" 
        ref={chatRef}
        role="log"
        aria-label="Chat conversation"
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.length === 0 ? (
          <div className="welcome-message text-center p-3">
            <div className="chatbot-logo mx-auto mb-2">
              <FaComments size={16} />
            </div>
            <p className="text-muted mb-1" role="status">
              🤖 Hello! I'm your AI Travel Assistant
            </p>
            <p className="text-muted small" role="status">
              Ask me about destinations, travel tips, or booking help!
            </p>
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
          placeholder="Ask about travel destinations, tips, or help..."
          aria-describedby="chat-help"
          required
        />
        <div id="chat-help" className="sr-only">
          Ask me about travel destinations, booking tips, or any travel-related questions.
        </div>
        <button 
          type="submit" 
          className="btn btn-primary ms-2"
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </aside>
  );
};

export default Chatbot;
