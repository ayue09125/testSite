
const API_KEY = 'AIzaSyBN4fQz--u5kHNLOZvkrUnGc7QJgifMbXo'
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}';

const createMessageElement = function(content, classes) {
  const div = document.createElement("div");
  div.classList.add(classes);
  div.innerHTML = content;
  return div;
}


const handleMessage = function(userMessage) {
  console.log(userMessage)
  const botText = userMessage; // temporary
  const botMessageElement = createMessageElement(botText, "bot-text")

  const chatBody = document.querySelector(".chat-body");
  const chatMessage = document.querySelector(".chat-body .bot-text");

  chatBody.replaceChild(botMessageElement, chatMessage);
  console.log(generateBotResponse(userMessage))
}


document.querySelector(".message-input").addEventListener("keydown", function(e){
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage) {
    handleMessage(userMessage)
  }
})

// generate bot's response with Gemini API
const generateBotResponse = async function(userMessage) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: userMessage }]
      }]
    })
  }
  try {
    // fetch response from API
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    console.log(data);
  }
  catch (error) {
    console.log(error);
  }
}

