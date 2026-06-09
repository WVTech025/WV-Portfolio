// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Select all elements with the 'hidden' class
    const hiddenElements = document.querySelectorAll('.hidden');

    // 2. Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry);
            // If the element is visible on screen
            if (entry.isIntersecting) {
                // Add the 'show' class (which triggers the CSS animation)
                entry.target.classList.add('show');
            } 
            // Optional: else { entry.target.classList.remove('show'); } 
            // (Uncomment the else block if you want them to fade out again when you scroll up)
        });
    });

    // 3. Tell observer to watch all hidden elements
    hiddenElements.forEach((el) => observer.observe(el));

// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        // Check if the top of the element is within 80% of the viewport height
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        // We only check rect.top because we want it to trigger as soon as it scrolls down
    );
}

// Function to handle the animation on scroll
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.hidden');
    elements.forEach((element) => {
        if (isElementInViewport(element)) {
            // Add the 'show' class to trigger the CSS transition
            element.classList.add('show');
            // Optimization: Remove the 'hidden' class once shown
            element.classList.remove('hidden');
        }
    });
}

// Initial check when the page loads
document.addEventListener('DOMContentLoaded', handleScrollAnimation);

// Listen for scroll events
window.addEventListener('scroll', handleScrollAnimation);

// Also run it on window resize (in case viewport size changes)
window.addEventListener('resize', handleScrollAnimation);

/* OPTIONAL: Smooth Scroll for Navigation Links
  This function makes clicking on internal links scroll smoothly instead of jumping.
*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
});