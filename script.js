document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animation (Fade-in) ---
    const scrollTargets = document.querySelectorAll('.scroll-target');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    scrollTargets.forEach(target => {
        observer.observe(target);
    });

    // --- Discord Username Copy ---
    const copyButton = document.getElementById('copy-button');
    const discordUser = document.getElementById('discord-user');

    if (copyButton && discordUser) {
        copyButton.addEventListener('click', () => {
            const username = discordUser.innerText;
            navigator.clipboard.writeText(username).then(() => {
                // Success feedback
                copyButton.innerText = 'Copied!';
                setTimeout(() => {
                    copyButton.innerText = 'Copy Username';
                }, 2000); // Reset text after 2 seconds
            }).catch(err => {
                // Error feedback
                console.error('Failed to copy: ', err);
                copyButton.innerText = 'Failed!';
            });
        });
    }

});