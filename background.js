// Listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "generateMessage") {
        console.log("Received profile data:", message.profileData);

        // Call the generateMessageWithGemini function and pass the profile data
        generateMessageWithGemini(message.profileData);
    }
});
