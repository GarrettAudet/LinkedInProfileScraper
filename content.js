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
        let experienceElements =  document.querySelectorAll('[data-view-name="profile-component-entity"]');

        // Extract Attributes for Each Professional History 
        experienceElements.forEach(exp => {

            // Job title might be the first `span` element within the container
            let jobTitle = exp.querySelector('.t-bold span')?.innerText || "Job title not found";
            
            // Company might be in a div within the container; use `.children` to navigate
            let company = exp.querySelector('.t-normal span')?.innerText || "Company not found";
            
            // Date range might be within a span or div with specific ordering; adjust index if needed
            let jobDescription = exp.querySelector('.pvs-entity__sub-components span')?.innerText || "Job description not found";
            
            // Append to List
            experiences.push({
                jobTitle: jobTitle,
                company: company,
                description: jobDescription
            });
        });

        console.log(experiences);

        // Format data
        let profileData = {
            name: name,
            headline: headline,
            aboutSection: aboutSection,
            experience: experiences
        };

        // Display extracted data (for testing purposes)
        alert(`Profile Data:\nName: ${profileData.name}\nHeadline: ${profileData.headline}\nAbout: ${profileData.aboutSection}\nWork Experience: ${JSON.stringify(profileData.experience, null, 2)}`);    } else {
        alert("This script only works on LinkedIn profile pages.");
    }
}
