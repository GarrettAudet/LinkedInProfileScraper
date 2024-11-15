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

        // Extract Work Experience 
        let experiences = [];
        let experienceElements = document.querySelectorAll('.experience-item'); 

        // Format data
        let profileData = {
            name: name,
            headline: headline,
            aboutSection: aboutSection
        };

        // Display extracted data (for testing purposes)
        alert(`Profile Data:\nName: ${profileData.name}\nHeadline: ${profileData.headline}\nAbout: ${profileData.aboutSection}`);
    } else {
        alert("This script only works on LinkedIn profile pages.");
    }
}
