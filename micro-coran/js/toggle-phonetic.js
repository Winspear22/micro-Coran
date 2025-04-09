document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("phonetic-toggle");
    const select = document.getElementById("trad-select");
  
    if (!checkbox) return;
  
    checkbox.addEventListener("change", () => {
      if (typeof globalData !== "undefined" && globalData !== null) {
        render(globalData, select.value, checkbox.checked);
      }
    });
  });
  