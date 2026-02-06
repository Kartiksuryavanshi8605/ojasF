function reply() {
    let input = document.getElementById("userInput").value.toLowerCase();
    let response = "Please ask about diet, routine, or sleep.";
  
    if (input.includes("diet"))
      response = "Prefer fresh, warm, and seasonal foods.";
    else if (input.includes("routine"))
      response = "Maintain a regular daily routine for balance.";
    else if (input.includes("sleep"))
      response = "Sleeping early helps restore energy.";
  
    document.getElementById("botReply").innerText = response;
  }
  