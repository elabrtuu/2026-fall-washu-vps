// opening & closing suitcase:

// clicking either latch opens the case:
let latches = document.querySelectorAll(".latch");

latches.forEach(function (latch) {
    latch.addEventListener("click", function () {
        document.body.classList.add("is-open");
    });
});

// clicking edge button closes it back up (and re-buckles the straps, like repacking):
let closeEdge = document.querySelector(".close-edge");

closeEdge.addEventListener("click", function () {
    document.body.classList.remove("is-open");

    straps.forEach(function (strap) {
        strap.classList.remove("is-open");
        strap.querySelector(".buckle").setAttribute("aria-pressed", "false");
    });
    updateBuckles();
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


// buckles: both have to be undone before anything in the base can be reached:
let base = document.querySelector(".base");
let baseItems = base.querySelectorAll(".item");
let straps = base.querySelectorAll(".strap");

function bothUnbuckled() {
    let openCount = base.querySelectorAll(".strap.is-open").length;
    return openCount === straps.length;
}

function updateBuckles() {
    let unlocked = bothUnbuckled();

    base.classList.toggle("is-buckled", !unlocked);

    baseItems.forEach(function (item) {
        item.disabled = !unlocked;
    });

    packingNote.textContent = currentNote();
}

straps.forEach(function (strap) {
    let buckle = strap.querySelector(".buckle");

    buckle.addEventListener("click", function () {
        strap.classList.toggle("is-open");
        buckle.setAttribute("aria-pressed", strap.classList.contains("is-open"));
        updateBuckles();
    });
});


// reads each item's tag (its image alt text) on hover:
let packingNote = document.querySelector(".packing-note");

function currentNote() {
    if (bothUnbuckled()) {
        return "hover an item to read its tag";
    }
    return "undo both buckles to unpack the clothes";
}

items.forEach(function (item) {
    let name = item.querySelector("img").alt;

    function showTag() {
        if (!item.disabled) {
            packingNote.textContent = name;
        }
    }

    function hideTag() {
        packingNote.textContent = currentNote();
    }

    item.addEventListener("mouseenter", showTag);
    item.addEventListener("focus", showTag);
    item.addEventListener("mouseleave", hideTag);
    item.addEventListener("blur", hideTag);
});

// start strapped down:
updateBuckles();