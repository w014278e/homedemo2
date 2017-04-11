if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {

    console.log('Service worker registered successfully');
  }).catch(function(err) {
    console.log('Service worker registration failed: ', err);
  });
}

window.onload = function() {

  // Check for LocalStorage support.
  if (localStorage) {

    // Add an event listener for form submissions
    document.getElementById('contactForm').addEventListener('submit', function() {
      // Get the value of the name field.
      var name = document.getElementById('name').value;
	  var email = document.getElementById('email').value;
	  var message = document.getElementById('message').value;

      // Save the name in localStorage.
      localStorage.setItem('name', name);
	  localStorage.setItem('email', email);
	  localStorage.setItem('message', message);
    });

  }

}

