const dropdownTrigger = document.getElementById("dropdown-trigger");
const dropdownMenu = document.querySelector(".dropdown-menu");


dropdownTrigger.addEventListener("click", function() {
    dropdownMenu.style.display = (dropdownMenu.style.display === "none") ? "block" : "none";
});