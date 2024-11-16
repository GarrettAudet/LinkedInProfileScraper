document.addEventListener('keydown', function(event) {

    // Listen for F5 key press
    if (event.key === 'F11') {
        event.preventDefault(); // Prevent default reload
        setTimeout(scrapeProfileData, 2000); // Add a 2-second delay to wait for content to load
    }

});

function scrapeProfileData() {
    // Check that the page is a LinkedIn profile
    if (window.location.href.includes('linkedin.com/in/')) {
        // Extract High-Level Information
        let name = document.querySelector('.text-heading-xlarge')?.innerText || "Name not found";
        let headline = document.querySelector('.text-body-medium')?.innerText || "Headline not found";

        // Extract About Content
        let aboutSection = document.querySelector('.inline-show-more-text--is-collapsed span')?.innerText || "About section not found";

        // Extract Professional History
        let experiences = [];

        // Identify the Closest Section with Sub-Element of Experience
        let experienceSection = document.querySelector('div[id="experience"]')?.closest('section');

        // Extract Professional History
        if (experienceSection) {
            // Extract Work History from Profile
            let experienceElements = experienceSection.querySelectorAll('[data-view-name="profile-component-entity"]');

            // Extract Attributes for Each Job
            experienceElements.forEach(exp => {

                // Extract Job Title
                let jobTitle = exp.querySelector('.t-bold span')?.innerText || "Job title not found";

                // Extract Company Name
                let company = exp.querySelector('.t-normal span')?.innerText || "Company not found";

                // Extract Job Description
                let jobDescription = exp.querySelector('.inline-show-more-text--is-collapsed-with-line-clamp span')?.innerText || "Job description not found";
                
                // Append to List
                experiences.push({
                    jobTitle: jobTitle,
                    company: company,
                    description: jobDescription
                });
            });
        }

        // Format data
        let profileData = {
            name: name,
            headline: headline,
            aboutSection: aboutSection,
            experience: experiences
        };

        // Pass to Background Script
        chrome.runtime.sendMessage(
            { type: "generateMessage", profileData: profileData },
            (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending message:", chrome.runtime.lastError.message);
                } else {
                    console.log("Message sent successfully, response:", response);
                }
            }
        );

    } else {
        alert("This script only works on LinkedIn profile pages.");
    }
}

// Listener to receive the generated message from background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "generatedMessage") {
        console.log("Received generated message:", message.message);
        // Display the generated message in an alert or another way you prefer
        alert(`Generated Message: ${message.message}`);
    }
});
