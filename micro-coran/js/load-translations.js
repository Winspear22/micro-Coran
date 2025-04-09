// ✅ load-translations.js
let globalData = null;

function render(data, trad, showPhonetic = true, showArabic = true, showFrench = true) {
  const container = document.getElementById("versets-container");
  container.innerHTML = "";

  for (let i = 1; i <= 7; i++) {
    const showNothing = !showArabic && !showPhonetic && !showFrench;

    const verset = document.createElement("div");
    verset.className = "verset";

    if (showNothing) {
      verset.innerHTML = `<p style="opacity: 0.5; font-style: italic;">Verset ${i} (aucun contenu à afficher)</p>`;
    } else {
      verset.innerHTML = `
        ${showArabic ? `<h3>${i}. ${data.ar[i]}</h3>` : ""}
        ${showFrench ? `<p><strong>Français (${trad}) :</strong> ${data[trad][i]}</p>` : ""}
        ${showPhonetic ? `<p><em>Phonétique :</em> ${data.phonetic[i]}</p>` : ""}
        <audio controls>
          <source src="../audio/00100${i - 1}.mp3" type="audio/mpeg">
        </audio>
      `;
    }

    container.appendChild(verset);
  }

  const fullAudio = document.querySelector(".sourate-global-audio audio source");
  if (fullAudio) {
    fullAudio.src = `../audio/al-fatiha-full.mp3`;
    fullAudio.parentElement.load();
  }
}

// Chargement initial
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("trad-select");
  const phoneticToggle = document.getElementById("phonetic-toggle");
  const arabicToggle = document.getElementById("arabic-toggle");
  const frenchToggle = document.getElementById("french-toggle");

  fetch("../translations/al-fatiha.json")
    .then(res => res.json())
    .then(data => {
      globalData = data;

      // Récupération des préférences
      const savedTranslation = localStorage.getItem("selectedTranslation") || select.value;
      const savedPhonetic = localStorage.getItem("showPhonetic");
      const savedArabic = localStorage.getItem("showArabic");
      const savedFrench = localStorage.getItem("showFrench");

      const showPhonetic = savedPhonetic === null ? true : savedPhonetic === "true";
      const showArabic = savedArabic === null ? true : savedArabic === "true";
      const showFrench = savedFrench === null ? true : savedFrench === "true";

      // Appliquer les préférences
      select.value = savedTranslation;
      phoneticToggle.checked = showPhonetic;
      arabicToggle.checked = showArabic;
      frenchToggle.checked = showFrench;

      render(globalData, savedTranslation, showPhonetic, showArabic, showFrench);

      // Écouteurs
      select.addEventListener("change", () => {
        localStorage.setItem("selectedTranslation", select.value);
        render(globalData, select.value, phoneticToggle.checked, arabicToggle.checked, frenchToggle.checked);
      });

      phoneticToggle.addEventListener("change", () => {
        localStorage.setItem("showPhonetic", phoneticToggle.checked);
        render(globalData, select.value, phoneticToggle.checked, arabicToggle.checked, frenchToggle.checked);
      });

      arabicToggle.addEventListener("change", () => {
        localStorage.setItem("showArabic", arabicToggle.checked);
        render(globalData, select.value, phoneticToggle.checked, arabicToggle.checked, frenchToggle.checked);
      });

      frenchToggle.addEventListener("change", () => {
        localStorage.setItem("showFrench", frenchToggle.checked);
        render(globalData, select.value, phoneticToggle.checked, arabicToggle.checked, frenchToggle.checked);
      });
    });
});