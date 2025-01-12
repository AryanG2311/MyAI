async function sendMessage() {
  const chatArea = document.getElementById("chatArea");
  const chatInput = document.getElementById("chatInput");

  if (chatInput.value.trim() !== "") {
    // Display user's message
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = chatInput.value;
    chatArea.appendChild(userMessage);

    // Clear input
    const userInput = chatInput.value;
    chatInput.value = "";

    // Show a loading message
    const botLoading = document.createElement("div");
    botLoading.className = "message bot-message";
    botLoading.textContent = "Typing...";
    chatArea.appendChild(botLoading);

    // Scroll to the bottom
    chatArea.scrollTop = chatArea.scrollHeight;

    try {
      // Make API call to Gemini AI (replace with actual API details)
      const response = await fetch('http://localhost:2424/api/get-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userInput,
          max_tokens: 500, // Adjust as needed
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botResponse = data.response || "Sorry, I couldn't understand that."; // Replace with actual API response key

        // Display bot's response
        const botMessage = document.createElement("div");
        botMessage.className = "message bot-message";
        botMessage.textContent = botResponse;
        chatArea.replaceChild(botMessage, botLoading); // Replace loading message
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      // Handle API errors
      const errorMessage = document.createElement("div");
      errorMessage.className = "message bot-message";
      errorMessage.textContent = "Something went wrong. Please try again.";
      chatArea.replaceChild(errorMessage, botLoading);
      console.error(error);
    }

    // Scroll to the bottom
    chatArea.scrollTop = chatArea.scrollHeight;
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("send-button").click();
  }
});


function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}
