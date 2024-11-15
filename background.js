import generateMessageWithGemini from './generateMessage.js';
console.log("Import statement is executed")

// Listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background script is working");

    if (message.type === "generateMessage") {
        console.log("Received profile data:", message.profileData);

        // Call the generateMessageWithGemini function and pass the profile data
        generateMessageWithGemini(message.profileData);
    }
});
