let sentences = "";
let currentIndex = 0;
let seconds = 0;
let minutes = 0;
let timeStarted = false;
let intervalid;
let charactersTyped = 0;
let errors = 0;

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
          const limitedWords = words.slice(0, 30).join(" ").trim();
          sentences = limitedWords.replace(/\.$/, "") + ".";
          const html = sentences.split("").map((char) => `<span>${char}</span>`).join("");          
          document.getElementById("typing-content").innerHTML = html;
          resetStats();
        })
        .catch((error) => console.error("Error fetching the text:", error));

}

function resetStats(){
  currentIndex = 0;
  charactersTyped = 0;
  errors = 0;
  if(timeStarted){
    clearInterval(intervalid);
    timeStarted = false;
  }
  seconds = 0;
  minutes = 0;
  document.querySelector('.seconds').innerHTML = '00';
  document.querySelector('.minutes').innerHTML = '00';
  document.querySelector('.wpm-counter').innerText = '0';
}

function startTimer(){
  if(!timeStarted){
    timeStarted = true;
    intervalid = setInterval(() => {
      seconds++;
      if(seconds === 60){
        seconds = 0;
        minutes++;
      }
  
      if(minutes === 5){
        clearInterval(intervalid);
        timeStarted = false;
        fetchText();
      }
  
      document.querySelector('.seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;
      document.querySelector('.minutes').innerHTML = minutes < 10 ? '0' + minutes : minutes;
      WPM();
    }, 1000);
  }
}

function WPM(){
  const timeInMinutes = (minutes * 60 + seconds) / 60;
  if(timeInMinutes > 0){
    const grossWpm = (charactersTyped / 5) / timeInMinutes;
    const netWpm = Math.max(0, grossWpm - (errors / timeInMinutes));
    document.querySelector('.wpm-counter').innerText = Math.round(netWpm);
  }
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
    if(!sentences){
      return;
    }

    let key = event.key.toLowerCase();

    if(key === " "){
      key = " ";
    }

    const currentChar = sentences[currentIndex];

    const spans = document.querySelectorAll("#typing-content span");

    if(!timeStarted){
      startTimer();
    }

    if(key === currentChar){
      spans[currentIndex].style.color = "#ccc";
      charactersTyped++;
      currentIndex++;

      if(currentIndex === sentences.length){
        fetchText();
      }
    }else{
        spans[currentIndex].style.color = "red";
        errors++;
    }

    if(currentIndex >= sentences.length){
      currentIndex = sentences.length - 1;
    }
  });
});