const quotes = [
    "The best way to predict the future is to create it.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Believe you can and you're halfway there.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Act as if what you do makes a difference. It does."
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote").innerText = quotes[randomIndex];
}

document.addEventListener("DOMContentLoaded", showRandomQuote);