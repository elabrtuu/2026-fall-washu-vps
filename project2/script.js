// opening & closing suitcase:

// clicking either latch opens the case:
let latches = document.querySelectorAll(".latch");

latches.forEach(function (latch) {
    latch.addEventListener("click", function () {
        document.body.classList.add("is-open");
    });
});

// clicking edge button closes it back up:
let closeEdge = document.querySelector(".close-edge");

closeEdge.addEventListener("click", function () {
    document.body.classList.remove("is-open");
});


// containers:

// each item matches the id of its card:
let items = document.querySelectorAll(".item");

items.forEach(function (item) {
    item.addEventListener("click", function () {
        let card = document.getElementById(item.dataset.item);
        card.classList.add("is-active");
        document.body.classList.add("showing-card");
    });
});

function closeCard() {
    let activeCard = document.querySelector(".card.is-active");
    if (activeCard) {
        activeCard.classList.remove("is-active");
    }
    document.body.classList.remove("showing-card");
}

// the × on every card:
let closeButtons = document.querySelectorAll(".close");

closeButtons.forEach(function (button) {
    button.addEventListener("click", closeCard);
});

// clicking the dimmed background around the card:
let container = document.getElementById("container");

container.addEventListener("click", function (event) {
    if (event.target === container) {
        closeCard();
    }
});

// esc:
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeCard();
    }
});