const fs = require('fs');
const casual = require('casual');

const numberOfUsers = 100; // Number of users you want to generate
const data = [];
const generatedUsernames = new Set(); // Keep track of generated usernames
const generatedEmails = new Set(); // Keep track of generated emails

function generateRoboHashAvatar(email) {
    const hash = Buffer.from(email).toString('base64');
    return `https://robohash.org/${hash}.png`;
}

function validateFullName(fullName) {
    // Add your validation logic here
    // For example, check if fullName contains only letters and spaces
    return /^[A-Za-z\s]+$/.test(fullName);
}

function sanitizeUsername(username) {
    // Add your sanitization logic here
    // For example, replace any non-alphanumeric characters with underscores
    return username.replace(/[^A-Za-z0-9]/g, '_');
}

function generateUniqueUsername() {
    // Generate a random username
    const username = casual.username;

    // Check if the username is already taken
    if (generatedUsernames.has(username)) {
        // If the username is taken, generate a new one
        return generateUniqueUsername();
    }

    // The username is unique, so add it to the set and return it
    generatedUsernames.add(username);
    return username;
}

function generateUniqueEmail() {
    // Generate a random email
    const email = casual.email;

    // Check if the email is already taken
    if (generatedEmails.has(email)) {
        // If the email is taken, generate a new one
        return generateUniqueEmail();
    }

    // The email is unique, so add it to the set and return it
    generatedEmails.add(email);
    return email;
}

for (let i = 1; i <= numberOfUsers; i++) {
    const fullName = casual.full_name;
    const username = generateUniqueUsername();
    const email = generateUniqueEmail();

    // Validate and sanitize full name
    if (!validateFullName(fullName)) {
        console.log(`Skipping user ${i} due to invalid full name: ${fullName}`);
        continue;
    }

    const user = {
        name: fullName,
        username: sanitizeUsername(username),
        email: email,
        password: casual.password,
        isVerified: casual.boolean,
        profilePicture: generateRoboHashAvatar(email)
    };
    data.push(user);
}

// Write the generated data to a JSON file
fs.writeFileSync('generated_users.json', JSON.stringify(data, null, 2));

console.log(`Generated ${numberOfUsers} users with fake profile pictures and saved to generated_users.json`);
