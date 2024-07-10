"use strict";

const input = document.getElementById("input");
const rezultati = document.getElementById("rezultati");
let timeoutId;

input.addEventListener("input", () => {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(async () => {
    const inputText = input.value.trim();

    if (inputText.length === 0) {
      rezultati.innerHTML = "";
      return;
    }

    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(inputText)}`);
      const data = await response.json();

      rezultati.innerHTML = "";
      data.results.forEach((item) => {
        const resultatiItem = document.createElement("div");
        resultatiItem.classList.add("resultati-item");
        resultatiItem.innerHTML = `
             ${item.artistName}</p> - <p><strong>${item.trackName}</strong> 
            `;
        rezultati.appendChild(resultatiItem);
      });
    } catch (error) {
      console.error("Greška prilikom dohvaćanja podataka:", error);
      rezultati.innerHTML = "<p>Došlo je do greške prilikom dohvaćanja podataka.</p>";
    }
  }, 500);
});
