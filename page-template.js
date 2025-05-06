// This is a template script to be modified and added to each page

// Load content from config.json
function loadPageContent(pageName) {
  fetch('config.json?v=' + new Date().getTime())
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then(config => {
      // Get the page-specific configuration
      const pageConfig = config[pageName];
      
      if (!pageConfig) {
        console.warn(`No configuration found for page: ${pageName}`);
        return;
      }
      
      // Banner section
      if (pageConfig.banner) {
        const bannerTitle = document.getElementById('banner-title');
        const bannerDescription = document.getElementById('banner-description');
        
        if (bannerTitle) bannerTitle.textContent = pageConfig.banner.title;
        if (bannerDescription) bannerDescription.textContent = pageConfig.banner.description;
      }
      
      // Content section
      if (pageConfig.content) {
        const introText = document.getElementById('intro-text');
        const mainContent = document.getElementById('main-content');
        const additionalInfo = document.getElementById('additional-info');
        
        if (introText) introText.textContent = pageConfig.content.intro;
        if (mainContent) mainContent.textContent = pageConfig.content.main;
        if (additionalInfo) additionalInfo.textContent = pageConfig.content.additional;
      }
      
      // Section-specific logic can be added here based on the page
      
      // Global footer
      if (config.global?.footer) {
        const footerCopyright = document.getElementById('footer-copyright');
        if (footerCopyright) footerCopyright.textContent = config.global.footer.copyright;
      }
    })
    .catch(error => {
      console.error('Error loading configuration:', error);
    });
}

// Example usage (add to the bottom of each page with the correct page name):
// document.addEventListener('DOMContentLoaded', function() {
//   loadPageContent('pageName'); // Replace 'pageName' with the actual page key in config.json
// });
