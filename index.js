import { generateText } from "./api/generate.js"

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




