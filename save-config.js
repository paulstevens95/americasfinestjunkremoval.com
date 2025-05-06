// This is a client-side solution for saving config.json
// Note: This approach works for local development or when using
// services that support client-side file writes (like Netlify Functions)

// Function to download the config file
function downloadConfigFile(config) {
  const configJson = JSON.stringify(config, null, 2);
  const blob = new Blob([configJson], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'config.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Function to handle form submission
function handleFormSubmission(formElement) {
  formElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide any existing messages
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    
    // Get form data
    const formData = new FormData(this);
    
    // Convert to JSON structure
    let config = {};
    
    formData.forEach((value, key) => {
      // Handle nested properties (e.g., "banner.title")
      const parts = key.split('.');
      
      if (parts.length === 2) {
        // Simple nesting (e.g., banner.title)
        if (!config[parts[0]]) {
          config[parts[0]] = {};
        }
        config[parts[0]][parts[1]] = value;
      } else if (parts.length === 3) {
        // Deeper nesting (e.g., pricing.option1.price)
        if (!config[parts[0]]) {
          config[parts[0]] = {};
        }
        if (!config[parts[0]][parts[1]]) {
          config[parts[0]][parts[1]] = {};
        }
        config[parts[0]][parts[1]][parts[2]] = value;
      }
    });
    
    try {
      // In a static context, we'll download the file for the user to upload manually
      downloadConfigFile(config);
      
      // Show success message
      successMessage.textContent = 'Configuration file generated! Please upload the config.json file to your server.';
      successMessage.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      errorMessage.textContent = 'Error generating configuration file: ' + error.message;
      errorMessage.classList.remove('hidden');
      console.error('Error:', error);
    }
  });
}

// Initialize the form functionality
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('content-form');
  if (form) {
    handleFormSubmission(form);
  }
});
