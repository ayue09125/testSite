const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

const createMessageElement = function(content, classes) {
  const div = document.createElement("div");
  div.classList.add(classes);
  div.innerHTML = content;
  return div;
}


const handleMessage = async function(userMessage) {
    console.log(userMessage)
    const botText = await generateText(userMessage);
    const formattedBotText = botText.replaceAll("\n", "<br>");

    const botMessageElement = createMessageElement(formattedBotText, "bot-text")

    const chatBody = document.querySelector(".chat-body");
    const thinking = document.querySelector(".chat-body .thinking");
    chatBody.replaceChild(botMessageElement, thinking);
}

// submit prompt with enter key functionality
document.querySelector(".message-input").addEventListener("keydown", function(e){
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage) {

    const loadingElement = createMessageElement("<div class='dot'></div><div class= 'dot'></div><div class='dot'></div>", "thinking")
    const chatBody = document.querySelector(".chat-body");
    const chatMessage = document.querySelector(".chat-body .bot-text");
    chatBody.replaceChild(loadingElement, chatMessage);
    handleMessage(userMessage);
    e.preventDefault();
        
  }
})

// submit prompt button functionality
document.querySelector(".material-symbols-rounded").addEventListener("click", function(){
  const userMessage = document.querySelector(".message-input").value
  const loadingElement = createMessageElement("<div class='dot'></div><div class= 'dot'></div><div class='dot'></div>", "thinking")
  const chatBody = document.querySelector(".chat-body");
  const chatMessage = document.querySelector(".chat-body .bot-text");
  chatBody.replaceChild(loadingElement, chatMessage);
  handleMessage(userMessage);
})


// generate bot's response with Gemini API
async function generateText(prompt) {    
    const data = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("API Error:", error);
            return null;
        }

        const result = await response.json();
        const responseText = result.candidates[0].content.parts[0].text.trim();
        console.log("API Response:", responseText);
        return responseText;
    } catch (error) {
        console.error("Fetch Error:", error);
        return null;
    }
}

