document.addEventListener('keydown', function(event) {
    // Listen for F5 key press
    if (event.key === 'F5') {
        event.preventDefault(); // Prevent default reload
        scrapeProfileData();
    }
});

function scrapeProfileData() {
    // Check that the page is a LinkedIn profile
    if (window.location.href.includes('linkedin.com/in/')) {
        // Extract profile information
        let name = document.querySelector('.text-heading-xlarge')?.innerText || "Name not found";
        let headline = document.querySelector('.text-body-medium')?.innerText || "Headline not found";
        let bio = document.querySelector('.pv-about-section')?.innerText || "Bio not found";

        // Format data
        let profileData = {
            name: name,
            headline: headline,
            bio: bio
        };

        // Display extracted data (for testing purposes)
        alert(`Profile Data:\nName: ${profileData.name}\nHeadline: ${profileData.headline}\nBio: ${profileData.bio}`);
    } else {
        alert("This script only works on LinkedIn profile pages.");
    }
}
