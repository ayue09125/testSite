

const createMessageElement = function(content, classes) {
  const div = document.createElement("div");
  div.classList.add(classes);
  div.innerHTML = content;
  return div;
}


const handleMessage = async function(userMessage) {
    console.log(userMessage)
    const botText = await generateText(userMessage);

    const botMessageElement = createMessageElement(botText, "bot-text")

    const chatBody = document.querySelector(".chat-body");
    const thinking = document.querySelector(".chat-body .thinking");
    chatBody.replaceChild(botMessageElement, thinking);
}


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

// generate bot's response with Gemini API


async function generateText(prompt) {
    const apiKey = "AIzaSyBF25RiQ9RSbgxXVyP5gVRCrRujLqk8IjA"; // Replace with your actual API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

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
        
        //return result; // Process the response as needed

        const responseText = result.candidates[0].content.parts[0].text.trim();
        console.log("API Response:", responseText);
        return responseText;
    } catch (error) {
        console.error("Fetch Error:", error);
        return null;
    }
}

