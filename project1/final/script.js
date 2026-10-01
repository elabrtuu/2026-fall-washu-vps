// click a container to puff it up like a bubble; click again to let it go:
document.querySelectorAll(".card").forEach(function (card) {
  card.addEventListener("click", function () {
    var selected = card.classList.toggle("is-selected");
    card.setAttribute("aria-pressed", selected);
  });
});