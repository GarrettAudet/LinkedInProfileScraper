import config from './config.js';
const apiKey = config.geminiApiKey;

async function generateMessageWithGemini(profileData) {
    console.log("Generate Message is Receiving Data");
    
    let prompt = `Generate a LinkedIn connection message based on the following profile data:
    My Name: Garrett Audet
    Key Background Characteristics of Mine: Software Engineer, Ex-Consultant, Queens University Graduate, Ex-Military Intelligence
    Key Principles: Personalize with a unique detail, max 300 characters, show value, state that I'm hoping to learn more about public policy workflows, avoid immediate meeting requests, and use a professional yet conversational tone.
    Person to Craft Message for Name: ${profileData.name}
    Headline: ${profileData.headline}
    About Section: ${profileData.aboutSection}
    Work Experience:\n `;

    profileData.experience.forEach((job, index) => {
        prompt += `\nExperience ${index + 1}: Job Title - ${job.jobTitle}, Company - ${job.company}, Description - ${job.description}`;
    });

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

        console.log("Response Status:", response.status);
        if (!response.ok) {
            console.error("Failed to fetch data from API:", await response.text());
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log("API Data:", JSON.stringify(data, null, 2));

        const message = (data.candidates && data.candidates.length > 0 && 
            data.candidates[0].content && data.candidates[0].content.parts &&
            data.candidates[0].content.parts.length > 0 && typeof data.candidates[0].content.parts[0].text === 'string')
            ? data.candidates[0].content.parts[0].text.trim()
            : "Could not generate message.";
        
        console.log("Generated Message:", message);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: "generatedMessage", message: message });
        });

    } catch (error) {
        console.error("Error in generateMessageWithGemini:", error);
    }
}

export default generateMessageWithGemini;


