import axios from 'axios';

// Define the type for a single message in the conversation
type Message = {
    role: 'system' | 'user' | 'assistant'; // Define the allowed roles
    content: string;
};

// Define the type for the conversation context
type ConversationContext = Message[];

// Define the type for the API response structure
interface OpenAIResponse {
    choices: {
        message: {
            content: string;
        };
    }[];
}

// Import the API key from your environment variables
const apiKey = import.meta.env.VITE_API_KEY as string; // Ensure the API key is typed as a string
// const apiKey = "dad"; // Ensure the API key is typed as a string

const API_URL = 'https://api.openai.com/v1/chat/completions';

// Function to get response from OpenAI API
export const getChatGPTResponse = async (
    message: string,
    conversationContext: ConversationContext = []
): Promise<string> => {
    // Ensure the conversation context starts with a system role message
    if (conversationContext.length === 0) {
        conversationContext.push({ role: 'system', content: 'You are an AI assistant.' });
    }

    // Add the user's message to the context
    conversationContext.push({ role: 'user', content: message });

    try {
        // Send a POST request to OpenAI API
        const response = await axios.post<OpenAIResponse>(
            API_URL,
            {
                model: 'gpt-4', // Replace with the model you want to use
                messages: conversationContext,
                max_tokens: 150, // Adjust as per your requirement
                temperature: 0.7, // Adjust to control randomness
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        // Extract the assistant's response
        const assistantMessage = response.data.choices[0].message.content;

        // Add the assistant's reply to the context
        conversationContext.push({ role: 'assistant', content: assistantMessage });

        // Return the assistant's response
        return assistantMessage;
    } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
        return 'Error: Unable to fetch response';
    }
};
