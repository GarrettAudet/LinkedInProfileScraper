async function generateMessageWithGemini(profileData) {
    const apiKey = 'YOUR_GEMINI_API_KEY'; // Replace with your actual Gemini API key
    const prompt = `Generate a LinkedIn connection message based on the following profile data:
    Name: ${profileData.name}
    Headline: ${profileData.headline}
    About Section: ${profileData.aboutSection}
    First Experience: Job Title - ${profileData.experience[0]?.jobTitle}, Company - ${profileData.experience[0]?.company}, Description - ${profileData.experience[0]?.description}
    
    Write a friendly and professional message to connect with them.`;

    // Replace with the actual Gemini endpoint URL
    const response = await fetch("https://api.gemini.com/v1/generate", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "text-generation",  // Adjust this if Gemini requires a specific model name
            prompt: prompt,
            max_tokens: 150
        })
    });

    const data = await response.json();
    const message = data.choices ? data.choices[0].text.trim() : "Could not generate message.";

    // Display the generated message
    prompt("Generated Message:", message);

    // Optionally copy to clipboard
    navigator.clipboard.writeText(message).then(() => {
        alert("Message copied to clipboard!");
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });
}

// Main scraping function
function scrapeProfileData() {
    if (window.location.href.includes('linkedin.com/in/')) {
        // Extract profile data as before...
        let profileData = {
            name: name,
            headline: headline,
            aboutSection: aboutSection,
            experience: experiences
        };

        // Call the Gemini function to generate the message
        generateMessageWithGemini(profileData);
    } else {
        alert("This script only works on LinkedIn profile pages.");
    }
}

