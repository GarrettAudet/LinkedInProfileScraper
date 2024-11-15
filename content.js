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

        // Extract profile information
        let name = document.querySelector('.text-heading-xlarge')?.innerText || "Name not found";
        let headline = document.querySelector('.text-body-medium')?.innerText || "Headline not found";

        // Target the section with the specific ID for the "About" section
        // Use relative positioning to find the "About" section after the headline
        // Attempt to find the "About" section using different approaches

        let aboutSection = "test";
        console.log(aboutSection);

        let bio = document.querySelector('.pv-about-section')?.innerText || "Bio not found";

        // Format data
        let profileData = {
            name: name,
            headline: headline,
            bio: bio,
            aboutSection: aboutSection
        };

        // Display extracted data (for testing purposes)
        alert(`Profile Data:\nName: ${profileData.name}\nHeadline: ${profileData.headline}\nBio: ${profileData.bio}\nBio: ${profileData.aboutSection}`);
    } else {
        alert("This script only works on LinkedIn profile pages.");
    }
}
