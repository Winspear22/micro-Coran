// ✅ toggle-phonetic.js (version simple)
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("phonetic-toggle");
  const select = document.getElementById("trad-select");

  if (!checkbox || typeof globalData === "undefined") return;

  // Appliquer la valeur enregistrée au chargement
  const saved = localStorage.getItem("showPhonetic");
  if (saved !== null) {
    checkbox.checked = saved === "true";
  }

  // Réagir au changement de la case à cocher
  checkbox.addEventListener("change", () => {
    localStorage.setItem("showPhonetic", checkbox.checked);
    render(globalData, select.value, checkbox.checked);
  });
});
