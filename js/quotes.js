// Daily Fitness Quotes
const fitnessQuotes = [
    "The only bad workout is the one that didn't happen.",
    "Your body can stand almost anything. It's your mind you have to convince.",
    "Success isn't always about greatness. It's about consistency.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Don't limit your challenges. Challenge your limits.",
    "The difference between try and triumph is a little umph.",
    "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
    "Your only limit is you.",
    "Push yourself because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success starts with self-discipline.",
    "Train like a beast, look like a beauty.",
    "Whether you think you can or you think you can't, you're right.",
    "Make yourself proud.",
    "Strive for progress, not perfection.",
    "The body achieves what the mind believes.",
    "You don't have to be extreme, just consistent.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Your health is an investment, not an expense.",
    "The only way to finish is to start.",
    "Fitness is not about being better than someone else. It's about being better than you used to be.",
    "Sweat is fat crying.",
    "You're stronger than you think.",
    "One day or day one. You decide.",
    "A champion is someone who gets up when they can't.",
    "Take care of your body. It's the only place you have to live.",
    "The best project you'll ever work on is you.",
    "Believe in yourself and all that you are.",
    "Fall in love with taking care of yourself.",
    "Small daily improvements are the key to staggering long-term results."
];

// Get quote for today based on day of the month
function getDailyQuote() {
    const today = new Date();
    const dayOfMonth = today.getDate(); // 1-31
    const quoteIndex = (dayOfMonth - 1) % fitnessQuotes.length;
    return fitnessQuotes[quoteIndex];
}

// Display the daily quote
function displayDailyQuote() {
    const quoteElement = document.getElementById('dailyQuote');
    if (quoteElement) {
        quoteElement.textContent = getDailyQuote();
    }
}

// Initialize quote on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayDailyQuote);
} else {
    displayDailyQuote();
}
