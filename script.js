fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=1")
        .then((response) => response.json())
        .then((data) => {
          const text = data[0]; 
          const sentences = text.split(". ").slice(0, 2).join(" ") + ""; 
          document.getElementById("typing-content").innerText = sentences;
        })
        .catch((error) => console.error("Error fetching the text:", error));

  
document.addEventListener('DOMContentLoaded', function(){
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
});