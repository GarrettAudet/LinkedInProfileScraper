import generateMessageWithGemini from './generateMessage.js';
console.log("Import statement is executed")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background script received message:", message);

    if (message.type === "generateMessage") {
        console.log("Processing profile data:", message.profileData);

        // Call the `generateMessageWithGemini` function
        generateMessageWithGemini(message.profileData)
            .then(() => {
                sendResponse({ status: "Message processed successfully" });
            })
            .catch((error) => {
                console.error("Error processing message:", error);
                sendResponse({ status: "Error processing message", error: error.message });
            });

        return true; // Keep the message channel open for asynchronous response
    }
});

