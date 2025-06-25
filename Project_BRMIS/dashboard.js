let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

// Select all navigation links and the home-section text container
const navLinks = document.querySelectorAll('.nav-list li a');
const homeSectionText = document.querySelector('.home-section .text');

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
})

searchBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
})

function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
}

// Function to set the active tab
function setActiveTab(selectedTab) {
  // Remove the 'active' class from all tabs
  navLinks.forEach((link) => {
    link.parentElement.classList.remove('active');
  });

  // Add the 'active' class to the selected tab
  selectedTab.parentElement.classList.add('active');

  // Update the text in the home-section based on the selected tab
  const tabText = selectedTab.querySelector('.links_name').textContent;
  homeSectionText.textContent = tabText;
}

// Add click event listeners to all navigation links
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    setActiveTab(link);
  });
});

// Set the default active tab (Dashboard) on page load
document.addEventListener('DOMContentLoaded', () => {
  const defaultTab = document.querySelector('.nav-list li a[data-section="dashboardSection"]'); // Adjust the selector if needed
  if (defaultTab) {
    setActiveTab(defaultTab);
  }
});

// Show the logout confirmation modal
function showLogoutModal() {
    const modal = document.getElementById('logoutModal');
    modal.style.display = 'flex'; // Show the modal
}

// Hide the logout confirmation modal
function hideLogoutModal() {
    const modal = document.getElementById('logoutModal');
    modal.style.display = 'none'; // Hide the modal
}

// Handle logout confirmation
function confirmLogout() {
    // Perform logout action (e.g., redirect to login page)
    window.location.href = 'login.html';
}

// Attach event listeners to modal buttons
document.getElementById('confirmLogout').addEventListener('click', confirmLogout);
document.getElementById('cancelLogout').addEventListener('click', hideLogoutModal);

// New code to handle section display based on navigation clicks
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.nav-list a[data-section]');
    const sections = document.querySelectorAll('.content-section');

    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
                section.style.display = 'block';
            } else {
                section.classList.remove('active');
                section.style.display = 'none';
            }
        });
        // Highlight active tab
        links.forEach(link => {
            link.parentElement.classList.toggle('active', link.getAttribute('data-section') === sectionId);
        });
    }

    // Restore last active tab
    const savedSection = localStorage.getItem('activeSection') || 'dashboardSection';
    showSection(savedSection);

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('data-section');
            showSection(target);
            localStorage.setItem('activeSection', target);
        });
    });

    // System Settings Panel logic (if present)
    const openSystemSettings = document.getElementById('openSystemSettings');
    const closeSystemSettings = document.getElementById('closeSystemSettings');
    const systemSettingsPanel = document.getElementById('systemSettingsPanel');
    if (openSystemSettings && closeSystemSettings && systemSettingsPanel) {
        openSystemSettings.addEventListener('click', function () {
            systemSettingsPanel.style.display = 'block';
        });
        closeSystemSettings.addEventListener('click', function () {
            systemSettingsPanel.style.display = 'none';
        });
    }

    // Accordion logic for settings
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function () {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
});

menuBtnChange();

searchBtn.addEventListener("click", () => {
    if (!sidebar.classList.contains("open")) {
        sidebar.classList.add("open");
        menuBtnChange();
    } else {
        document.querySelector(".sidebar input").focus();
    }
    });
