"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, ChevronRight } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "How to book a free 3-day trial?",
  "What courses are offered?",
  "Do you have female teachers?",
  "What are the class timings?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Assalamu Alaikum! 🌙 I am Noor, your AI assistant at Maqsad-e-Quran Academy. How can I help you or your children start your Quran learning journey today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, scrollToBottom]);

  const handleSend = useCallback(async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.response || "Assalamu Alaikum! Thank you for contacting us.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Failed to send chat message:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Assalamu Alaikum! Please click the WhatsApp button or submit our contact form to talk to our support team.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Noor Quran Student AI Assistant"
          aria-modal="false"
          className="mb-4 w-[90vw] max-w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-emerald-100 flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative p-2 bg-emerald-600/40 rounded-full border border-emerald-400/30">
                <Bot className="w-6 h-6 text-emerald-200" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-800 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-base tracking-wide flex items-center gap-1.5">
                  Noor <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" aria-hidden="true" />
                </h3>
                <p className="text-xs text-emerald-100/90 font-light">
                  Quran Student AI Assistant
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              aria-label="Close Chatbot"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Messages Body */}
          <div role="log" aria-live="polite" className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-3.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    msg.sender === "user"
                      ? "bg-emerald-700 text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <User className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Bot className="w-4 h-4" aria-hidden="true" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-emerald-700 text-white rounded-tr-none"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      msg.sender === "user" ? "text-emerald-200" : "text-slate-400"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs p-2 bg-white rounded-xl border border-slate-200/80 w-fit">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" aria-hidden="true" />
                <span>Noor is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-3 py-2 bg-slate-100 border-t border-slate-200/70 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Ask AI: ${prompt}`}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="text-[11px] bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-1 rounded-full transition-all shrink-0 flex items-center gap-1 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <span>{prompt}</span>
                <ChevronRight className="w-3 h-3 text-emerald-600" aria-hidden="true" />
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Noor about Quran classes..."
              aria-label="Type message to AI assistant"
              className="flex-1 bg-slate-100 text-slate-800 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl outline-none border border-transparent focus:border-emerald-500 transition-all placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl transition-all shadow-md shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="group relative flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white p-3.5 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-amber-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
        aria-label="Toggle AI Student Chatbot"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400"></span>
        </span>
        {isOpen ? (
          <X className="w-6 h-6 text-white" aria-hidden="true" />
        ) : (
          <div className="flex items-center gap-2 px-1">
            <Bot className="w-6 h-6 text-amber-300 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className="hidden sm:inline-block font-semibold text-xs text-emerald-50 tracking-wide">
              Ask AI
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
