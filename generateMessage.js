import config from './config.js';
const apiKey = config.geminiApiKey;

async function generateMessageWithGemini(profileData) {
    console.log("Generate Message is Recieving Data");
    const prompt = `Generate a LinkedIn connection message based on the following profile data:
    Name: ${profileData.name}
    Headline: ${profileData.headline}
    About Section: ${profileData.aboutSection}
    First Experience: Job Title - ${profileData.experience[0]?.jobTitle}, Company - ${profileData.experience[0]?.company}, Description - ${profileData.experience[0]?.description}`;

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

    const data = await response.json();
    const message = data.choices ? data.choices[0].text.trim() : "Could not generate message.";

    // Log the generated message
    console.log("Generated Message:", message);

    // Optionally send the generated message back to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "generatedMessage", message: message });
    });
}

export default generateMessageWithGemini;

