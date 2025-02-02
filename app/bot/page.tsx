"use client"

import { useChat } from "ai/react"

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  })

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <h1 className="text-2xl font-bold text-center mb-4">Chat with the Python Coding Helper!</h1>
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap mb-4">
          <strong>{m.role === "user" ? "You: " : "AI: "}</strong>
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="prompt" className="mb-2">
          Ask a question about Python:
        </label>
        <textarea
          id="prompt"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={input}
          onChange={handleInputChange}
          rows={4}
          placeholder="Ask about Python coding!"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Ask
        </button>
      </form>
    </div>
  )
}

