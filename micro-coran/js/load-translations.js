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

// Chargement des données JSON à l’ouverture
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("trad-select");

  fetch("../translations/al-fatiha.json")
    .then(res => res.json())
    .then(data => {
      globalData = data;
      render(data, select.value, document.getElementById("phonetic-toggle")?.checked);

      select.addEventListener("change", () => {
        render(globalData, select.value, document.getElementById("phonetic-toggle")?.checked);
      });
    });
});
