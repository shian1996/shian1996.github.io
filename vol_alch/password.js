document.addEventListener('DOMContentLoaded', function () {
  const passwordForm = document.getElementById('passwordForm');
  const errorMessage = document.getElementById('errorMessage');
  const photoLinks = document.getElementById('photoLinks');

  passwordForm.addEventListener('submit', function (event) {
    event.preventDefault(); // 防止表單提交

    const passwordInput = document.getElementById('password').value;

    const correctPassword = 'alch_mypasswd'; 
    if (passwordInput === correctPassword) {
      errorMessage.style.display = 'none';
      photoLinks.style.display = 'block'; 
    } else {
      errorMessage.style.display = 'block'; 
      photoLinks.style.display = 'none';
    }
  });
});
