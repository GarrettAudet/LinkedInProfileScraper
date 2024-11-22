// Import API Key
import config from './config.js';
const apiKey = config.geminiApiKey;

// Function to Generate Message
async function generateMessageWithGemini(profileData) {

    // Generate Prompt
    let prompt = 
        `Generate a LinkedIn connection message based on the following profile data:
        My Name: Garrett Audet
        My Key Background Info: Software Developer, Ex-Consultant, Ex-Military Intelligence, exploring public policy workflows and the role of technology in supporting them.
        My Goal: Understand challenges in policy workflows and explore opportunities for collaboration or shared learning.
        Key Principles: Personalize with a unique detail, max 300 characters, show value, state that I'm hoping to learn more about public policy workflows, avoid immediate meeting requests, and use a professional yet conversational tone.
        Recipient's Name: ${profileData.name}
        Recipient's Headline: ${profileData.headline}
        About Recipient: ${profileData.aboutSection}
        Recipient's Work Experience:\n `;

    // Append Work Experience 
    profileData.experience.forEach((job, index) => {
        prompt += `\nExperience ${index + 1}: Job Title - ${job.jobTitle}, Company - ${job.company}, Description - ${job.description}`;
    });

    // Further Prompt Structure
    prompt += `
        - Tone: Professional yet conversational.
        - Length: Max 300 characters.
        - Key Principles: Personalize with a unique detail from their profile (e.g., shared background, a specific project they worked on). Demonstrate value by explaining why their input is valuable to me.
        - Exact Message Format:
        - Specific Question Should be focused on understanding challenges in policy workflows that they've experienced.
        
        Hi [Recipient's Name],

        I hope you're doing well! I'm a software developer and veteran exploring how technology can improve policy research. Your [specific expertise] really stood out, and i'd greatly value your feedback given your [connection point]. Would you be open to a quick chat? 

        Best,
        Garrett`;

    // Attempt API Query 
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            })
        });

        // Log Errors 
        if (!response.ok) {
            console.error("Failed to fetch data from API:", await response.text());
            throw new Error(`API request failed with status ${response.status}`);
        }

        // Await Response for API
        const data = await response.json();
        console.log("API Data:", JSON.stringify(data, null, 2));

        // Append Message 
        const message = (data.candidates && data.candidates.length > 0 && 
            data.candidates[0].content && data.candidates[0].content.parts &&
            data.candidates[0].content.parts.length > 0 && typeof data.candidates[0].content.parts[0].text === 'string')
            ? data.candidates[0].content.parts[0].text.trim()
            : "Could not generate message.";
        
        // Log Message
        // console.log("Generated Message:", message);

        // Copy to Clipboard
        navigator.clipboard.writeText(message)
        .then(() => console.log('Message copied to clipboard!'))
        .catch(err => console.error('Could not copy text: ', err));

        // Send Message to Background Script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: "generatedMessage", message: message });
        });

    } catch (error) {
        console.error("Error in generateMessageWithGemini:", error);
    }
}

export default generateMessageWithGemini;


