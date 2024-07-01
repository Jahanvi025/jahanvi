document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('nav button');
    const moonButton = document.getElementById('moon-button');
    const sections = {
        home: document.getElementById('home'),
        about: document.getElementById('about'),
        skills: document.getElementById('skills'),
        services: document.getElementById('services'),
        projects: document.getElementById('projects'),
        newsletter: document.getElementById('newsletter'),
        education: document.getElementById('education')
    };

    // Smooth scrolling to section
    function scrollToSection(sectionId) {
        const section = sections[sectionId];
        if (section) {
            if(sectionId === 'home') {
                window.scrollTo(0,0);
            } else {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            console.error(`Element with id ${sectionId} not found.`);
        }
    }

    function setActiveButton(button) {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      
        // Reset all images to their default state
        const fimages = document.querySelectorAll('.inactive-icon');
        const limages = document.querySelectorAll('.active-icon');
        fimages.forEach(image => image.style.display = 'block');
        limages.forEach(image => image.style.display = 'none');
      
        // Set the images of the active button to their active state
        const activeFimage = button.querySelector('.inactive-icon');
        const activeLimage = button.querySelector('.active-icon');
        if (activeFimage && activeLimage) { // added null checks
          activeFimage.style.display = 'none';
          activeLimage.style.display = 'block';
        }
    }

    // Change icons on hover
    function changeHoverIcon(button) {
      const fImage = button.querySelector('.inactive-icon');
      const lImage = button.querySelector('.active-icon');
      fImage.style.display = 'none';
      lImage.style.display = 'block';
    }

    function resetHoverIcon(button) {
      if (!button.classList.contains('active')) {
        const fImage = button.querySelector('.inactive-icon');
        const lImage = button.querySelector('.active-icon');
        fImage.style.display = 'block';
        lImage.style.display = 'none';
      }
    }

    // Toggle dark mode
    let isDarkMode = false;

    function changeImage() {
      const moonImage = document.getElementById('moon-image');
      const moonImageAlt = document.getElementById('hover-moon');

      if (isDarkMode) {
        moonImage.style.display = 'block';
        moonImageAlt.style.display = 'none';
      } else {
        moonImage.style.display = 'none';
        moonImageAlt.style.display = 'block';
      }

      isDarkMode = !isDarkMode;
    }

    function changeHover(button) {
      const moonImage = button.querySelector('#moon-image');
      const hoverMoon = button.querySelector('#hover-moon');
      moonImage.style.display = 'none';
      hoverMoon.style.display = 'block';
    }

    function resetHover(button) {
      const moonImage = button.querySelector('#moon-image');
      const hoverMoon = button.querySelector('#hover-moon');
      if (isDarkMode) {
        moonImage.style.display = 'none';
        hoverMoon.style.display = 'block';
      } else {
        moonImage.style.display = 'block';
        hoverMoon.style.display = 'none';
      }
    }

    // Scroll event to update active button
    function onScroll() {
        let currentSection = null;

        Object.keys(sections).forEach(sectionId => {
            const section = sections[sectionId];
            const rect = section.getBoundingClientRect();
            
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                currentSection = sectionId;
            } else if (rect.top < window.innerHeight && rect.bottom >= 0) {
                currentSection = sectionId;
            }
        });

        if (currentSection) {
            buttons.forEach(button => {
                if (button.onclick && button.onclick.toString().includes(currentSection)) {
                    setActiveButton(button);
                }
            });

            // Special handling for the moon button
            if (currentSection === 'education') {
                changeHover(moonButton);
            } else {
                resetHover(moonButton);
            }
        }
    }

    window.addEventListener('scroll', onScroll);

    // Expose functions to global scope
    window.scrollToSection = scrollToSection;
    window.setActiveButton = setActiveButton;
    window.changeHoverIcon = changeHoverIcon;
    window.resetHoverIcon = resetHoverIcon;
    window.changeImage = changeImage;
    window.changeHover = changeHover;
    window.resetHover = resetHover;

    // Set current year in footer
    const d = new Date();
    const yearElement = document.getElementById('copyright');
    yearElement.textContent = d.getFullYear();
});
