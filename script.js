let sentences = "";
let currentIndex = 0;

function processText(text){
  return text
    .replace(/[^\w\s.]/g, "") 
    .replace(/\s+/g, " ")    
    .toLowerCase();
}

function fetchText(){
  fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=1")
        .then((response) => response.json())
        .then((data) => {
          const words = processText(data[0]).split(" ");
          const limitedWords = words.slice(0, 15).join(" ").trim();
          sentences = limitedWords.replace(/\.$/, "") + ".";
          const html = sentences.split("").map((char) => `<span>${char}</span>`).join("");          
          document.getElementById("typing-content").innerHTML = html;
          currentIndex = 0;
        })
        .catch((error) => console.error("Error fetching the text:", error));

}


  
document.addEventListener('DOMContentLoaded', function(){
  fetchText();
  document.addEventListener('keydown', function(event){
    let key = event.key.toUpperCase();

    if(key === " "){
      key = 'SPACE';
    }

    const button = Array.from(document.querySelectorAll('button')).find(btn => {
      return btn.innerText.trim().toUpperCase() === key ||
        (key === 'CONTROL' && btn.innerText.trim().toUpperCase() === 'CTRL') ||
        (key === 'SHIFT' && btn.innerText.trim().toUpperCase() === 'SHIFT') ||
        (key === 'ALT' && btn.innerText.trim().toUpperCase() === 'ALT');
    });

    if(button){
      button.classList.add('active');
    }
  });

  document.addEventListener('keyup',function(event){
    let key = event.key.toUpperCase();

    if(key === " "){
      key = 'SPACE';
    }

    const button = Array.from(document.querySelectorAll('button')).find(btn => {
      return btn.innerText.trim().toUpperCase() === key ||
        (key === 'CONTROL' && btn.innerText.trim().toUpperCase() === 'CTRL') ||
        (key === 'SHIFT' && btn.innerText.trim().toUpperCase() === 'SHIFT') ||
        (key === 'ALT' && btn.innerText.trim().toUpperCase() === 'ALT');
    });

    if(button){
      button.classList.remove('active');
    }
  });

  document.addEventListener('keydown', function(event){
    let textSize = sentences.length;

    if(!sentences){
      return;
    }

    let key = event.key.toLowerCase();

    if(key === " "){
      key = " ";
    }

    const currentChar = sentences[currentIndex];

    const spans = document.querySelectorAll("#typing-content span");
    if(key === currentChar){
      spans[currentIndex].style.color = "#ccc";
      currentIndex++;
    }else{
        spans[currentIndex].style.color = "red";
    }

    if(textSize === currentIndex){
      fetchText();
    }

    if(currentIndex >= sentences.length){
      currentIndex = sentences.length - 1;
    }
  });
});