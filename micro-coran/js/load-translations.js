// ✅ load-translations.js
let globalData = null;

function render(data, trad, showPhonetic = true, showArabic = true) {
  const container = document.getElementById("versets-container");
  container.innerHTML = "";

  for (let i = 1; i <= 7; i++) {
    const verset = document.createElement("div");
    verset.className = "verset";

    verset.innerHTML = `
      ${showArabic ? `<h3>${i}. ${data.ar[i]}</h3>` : ""}
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
  const arabicToggle = document.getElementById("arabic-toggle");

  fetch("../translations/al-fatiha.json")
    .then(res => res.json())
    .then(data => {
      globalData = data;

      // Récupération des préférences
      const savedTranslation = localStorage.getItem("selectedTranslation") || select.value;
      const savedPhonetic = localStorage.getItem("showPhonetic");
      const savedArabic = localStorage.getItem("showArabic");

      const showPhonetic = savedPhonetic === null ? true : savedPhonetic === "true";
      const showArabic = savedArabic === null ? true : savedArabic === "true";

      // Appliquer les préférences
      select.value = savedTranslation;
      phoneticToggle.checked = showPhonetic;
      arabicToggle.checked = showArabic;

      render(globalData, savedTranslation, showPhonetic, showArabic);

      // Écouteurs
      select.addEventListener("change", () => {
        localStorage.setItem("selectedTranslation", select.value);
        render(globalData, select.value, phoneticToggle.checked, arabicToggle.checked);
      });

      phoneticToggle.addEventListener("change", () => {
        localStorage.setItem("showPhonetic", phoneticToggle.checked);
        render(globalData, select.value, phoneticToggle.checked, arabicToggle.checked);
      });

      arabicToggle.addEventListener("change", () => {
        localStorage.setItem("showArabic", arabicToggle.checked);
        render(globalData, select.value, phoneticToggle.checked, arabicToggle.checked);
      });
    });
});
