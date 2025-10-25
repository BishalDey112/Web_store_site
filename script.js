// ===== TELEGRAM BOT CONFIG =====
// Replace these with your Telegram bot token and your chat ID
const BOT_TOKEN = "8332155747:AAE88EBK0FnkzXGDzWnaLUWmyJpX1-tdldI";
const CHAT_ID = "1612742326";
// ===== HANDLE REQUEST FORM SUBMISSION =====
document.getElementById('requestForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent page reload

  // Get form values
  const name = document.getElementById('rname').value.trim();
  const email = document.getElementById('remail').value.trim();
  const phone = document.getElementById('rphone').value.trim();
  const message = document.getElementById('rmessage').value.trim();

  // Get selected services from checkboxes
  const services = [];
  document.querySelectorAll('#selectedServices input[type=checkbox]:checked').forEach(cb => {
    services.push(cb.value);
  });

  // Validate required fields
  if(name && email && phone) {
    // Create message text for Telegram
    const text = `New Request:\nName: ${name}\nEmail: ${email}\nWhatsApp: ${phone}\nMessage: ${message}\nServices: ${services.join(', ')}`;

    // Send message to Telegram via Bot API
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`)
      .then(res => {
        // Show success message and reset form
        document.getElementById('rstatus').textContent = "Request sent successfully!";
        document.getElementById('rstatus').style.color = "green";
        document.getElementById('requestForm').reset();
      })
      .catch(err => {
        // Show error message if Telegram API fails
        document.getElementById('rstatus').textContent = "Failed to send request.";
        document.getElementById('rstatus').style.color = "red";
      });
  } else {
    // Show warning if required fields are empty
    document.getElementById('rstatus').textContent = "Please fill in all required fields.";
    document.getElementById('rstatus').style.color = "red";
  }
});
// Enable video play on hover
document.querySelectorAll('.media-container').forEach(container => {
  const video = container.querySelector('video');
  
  container.addEventListener('mouseenter', () => {
    video.play();
  });

  container.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0; // restart from beginning when hovered again
  });
});
