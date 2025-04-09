// ✅ load-translations.js
let globalData = null;

function render(data, trad, showPhonetic = true) {
  const container = document.getElementById("versets-container");
  container.innerHTML = "";

  for (let i = 1; i <= 7; i++) {
    const verset = document.createElement("div");
    verset.className = "verset";

    verset.innerHTML = `
      <h3>${i}. ${data.ar[i]}</h3>
      <p><strong>Français (${trad}) :</strong> ${data[trad][i]}</p>
      ${showPhonetic ? `<p><em>Phonétique :</em> ${data.phonetic[i]}</p>` : ""}
      <audio controls>
        <source src="../audio/00100${i - 1}.mp3" type="audio/mpeg">
      </audio>
    `;

    container.appendChild(verset);
  }
}

// Chargement initial
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("trad-select");
  const phoneticToggle = document.getElementById("phonetic-toggle");

  fetch("../translations/al-fatiha.json")
    .then(res => res.json())
    .then(data => {
      globalData = data;

      // Restaurer les préférences
      const savedTranslation = localStorage.getItem("selectedTranslation") || select.value;
      const savedPhonetic = localStorage.getItem("showPhonetic");
      const phoneticChecked = savedPhonetic === null ? true : savedPhonetic === "true";

      select.value = savedTranslation;
      phoneticToggle.checked = phoneticChecked;

      render(globalData, savedTranslation, phoneticChecked);

      // Écouteurs d'événements
      select.addEventListener("change", () => {
        const selected = select.value;
        localStorage.setItem("selectedTranslation", selected);
        render(globalData, selected, phoneticToggle.checked);
      });

      phoneticToggle.addEventListener("change", () => {
        localStorage.setItem("showPhonetic", phoneticToggle.checked);
        render(globalData, select.value, phoneticToggle.checked);
      });
    });
});