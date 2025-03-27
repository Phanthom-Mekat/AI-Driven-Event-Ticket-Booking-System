import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Function to generate dynamic event descriptions
export async function generateEventDescription(eventDetails: any) {
  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: `Create an engaging event description for the following event:
      Title: ${eventDetails.title}
      Category: ${eventDetails.category}
      Date: ${eventDetails.date}
      Location: ${eventDetails.location}
      Features: ${eventDetails.features?.join(", ") || ""}
      
      The description should be compelling, informative, and approximately 2-3 sentences long.`,
      system: "You are an expert event marketer who creates engaging event descriptions.",
      maxTokens: 100, // Short descriptions to save tokens
    })

    return text.trim()
  } catch (error) {
    console.error("Error generating event description:", error)
    // Fallback to a template-based description
    return `Join us for ${eventDetails.title}, a premier ${eventDetails.category.toLowerCase()} event happening on ${eventDetails.date} in ${eventDetails.location}. Don't miss this opportunity to experience an unforgettable event.`
  }
}