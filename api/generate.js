


// generate bot's response with Gemini API
export default async function generateText(prompt) {
  console.log(prompt);
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`; 
  const data = {
      contents: [{
          parts: [{ text: prompt }]
      }]
  };
  console.log(data)
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