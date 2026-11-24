// The only script on the page: makes the Print button open the print dialog.
document.getElementById("print")?.addEventListener("click", () => window.print());
