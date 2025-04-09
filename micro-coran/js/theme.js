function repeatVerse(id) {
    const audio = document.getElementById(id);
    audio.loop = true;
    audio.play();
  }
  
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    const body = document.body;
  
    if (localStorage.getItem("theme") === "dark") 
    {
      body.classList.add("dark");
    }
  
    toggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
    });
  });

  function toggleMenu() {
    const menu = document.getElementById("navbar-menu");
    menu.classList.toggle("show");
  }
  