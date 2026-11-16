/* =====================================
   1. OPEN THE BIRTHDAY SURPRISE
===================================== */

function openSurprise() {
    const welcome = document.getElementById("welcome");
    const main = document.getElementById("main-content");

    if (!welcome || !main) {
        console.error("Opening screen or main content is missing.");
        return;
    }

    welcome.classList.add("hide");
    main.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    setTimeout(() => {
        welcome.style.display = "none";
    }, 850);

    celebrate();
}


/* =====================================
   2. MOBILE NAVIGATION
===================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        menuToggle.textContent =
            navLinks.classList.contains("active") ? "✕" : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.textContent = "☰";
        });
    });
}


/* =====================================
   3. BIRTHDAY COUNTDOWN
===================================== */

const birthdayDate = new Date(
    "2026-11-17T00:00:00+01:00"
).getTime();

function updateCountdown() {
    const countdown = document.getElementById("countdown");
    const countdownMessage =
        document.getElementById("countdown-message");

    if (!countdown || !countdownMessage) return;

    const now = Date.now();
    const distance = birthdayDate - now;

    if (distance <= 0) {
        countdown.innerHTML =
            "<h2>It's Your Special Day! 🎉</h2>";

        countdownMessage.textContent =
            "Happy Birthday, Aanuoluwatomiwa! Today is all about you. 🤍";

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (daysElement) {
        daysElement.textContent = String(days).padStart(2, "0");
    }

    if (hoursElement) {
        hoursElement.textContent = String(hours).padStart(2, "0");
    }

    if (minutesElement) {
        minutesElement.textContent = String(minutes).padStart(2, "0");
    }

    if (secondsElement) {
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =====================================
   4. SCROLL REVEAL ANIMATION
===================================== */

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    document.querySelectorAll(".reveal").forEach(element => {
        observer.observe(element);
    });
} else {
    document.querySelectorAll(".reveal").forEach(element => {
        element.classList.add("visible");
    });
}


/* =====================================
   5. PHOTO GALLERY AND LIGHTBOX
===================================== */

const galleryImages = Array.from(
    document.querySelectorAll(".gallery img")
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const photoCounter = document.getElementById("photo-counter");

let currentPhoto = 0;

function showPhoto(index) {
    if (!galleryImages.length || !lightboxImage) return;

    currentPhoto =
        (index + galleryImages.length) % galleryImages.length;

    const selectedImage = galleryImages[currentPhoto];

    lightboxImage.src = selectedImage.src;
    lightboxImage.alt = selectedImage.alt;

    if (photoCounter) {
        photoCounter.textContent =
            "${currentPhoto + 1} of ${galleryImages.length}";
    }
}

galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
        if (!lightbox) return;

        showPhoto(index);
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

const closeButton = document.getElementById("close-lightbox");
const previousButton = document.getElementById("prev-photo");
const nextButton = document.getElementById("next-photo");

if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
}

if (previousButton) {
    previousButton.addEventListener("click", () => {
        showPhoto(currentPhoto - 1);
    });
}

if (nextButton) {
    nextButton.addEventListener("click", () => {
        showPhoto(currentPhoto + 1);
    });
}

if (lightbox) {
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}


/* =====================================
   6. LIGHTBOX KEYBOARD CONTROLS
===================================== */

document.addEventListener("keydown", event => {
    if (!lightbox || !lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showPhoto(currentPhoto + 1);
    }

    if (event.key === "ArrowLeft") {
        showPhoto(currentPhoto - 1);
    }
});


/* =====================================
   7. SECRET GIFT
===================================== */

const giftBox = document.getElementById("gift-box");
const secretMessage = document.getElementById("secret-message");

if (giftBox && secretMessage) {
    giftBox.addEventListener("click", () => {
        secretMessage.classList.toggle("show");

        if (secretMessage.classList.contains("show")) {
    giftBox.textContent = "💝 YOUR GIFT IS OPENED!";
    celebrate();
} else {
    giftBox.textContent = "🎁 CLICK TO OPEN";
}
       
});
    

/* =====================================
   8. CONFETTI CELEBRATION
===================================== */

function celebrate() {
    const container =
        document.getElementById("confetti-container");

    if (!container) return;

    const colors = [
        "#e8b7b9",
        "#c99d78",
        "#873d57",
        "#f5e7e4",
        "#ffffff",
        "#d9a6a0"
    ];

    for (let i = 0; i < 100; i++) {
        const piece = document.createElement("div");

        piece.classList.add("confetti");

        piece.style.left = Math.random() * 100 + "%";

        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDuration =
            (Math.random() * 2 + 2) + "s";

        piece.style.animationDelay =
            Math.random() * 0.8 + "s";

        piece.style.transform = "rotate(" + (Math.random() * 360) + "deg)";

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 5000);
    }
}


/* =====================================
   9. CELEBRATE AGAIN BUTTON
===================================== */

function celebrateAgain() {
    celebrate();
}
}