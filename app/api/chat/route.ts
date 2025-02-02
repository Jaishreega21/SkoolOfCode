import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(req: Request) {
  try {
    // Extract the `prompt` from the body of the request
    const { prompt } = await req.json()

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 })
    }

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "system",
          content: `You are a friendly and patient coding tutor for kids learning Python. 
Explain concepts in a way that's easy for a child to understand. 
Use simple language and create a fun, structured response with the following sections:

1. Introduction: A brief, engaging introduction to the Python topic.
2. Fun Fact: Share an interesting fact related to the topic or Python.
3. Simple Explanation: Explain the concept in 2-3 short, easy-to-understand sentences.
4. Python Example: Provide a very simple Python code snippet (2-4 lines) related to the topic.
5. Practice Idea: Suggest a fun, hands-on coding activity for the child to try in Python.
6. Encouragement: End with a motivational message.

Use emojis where appropriate to make it visually appealing.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1,
    })

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)

    // Respond with the stream
    return new StreamingTextResponse(stream)
  } catch (error: unknown) {
    console.error("Error in API route:", error)
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: "An error occurred", details: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    } else {
      return new Response(JSON.stringify({ error: "An error occurred" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }
  }
}

