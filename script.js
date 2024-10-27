fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=1")
        .then((response) => response.json())
        .then((data) => {
          const text = data[0]; 
          const sentences = text.split(". ").slice(0, 2).join(" ") + ""; 
          document.getElementById("typing-content").innerText = sentences;
        })
        .catch((error) => console.error("Error fetching the text:", error));
