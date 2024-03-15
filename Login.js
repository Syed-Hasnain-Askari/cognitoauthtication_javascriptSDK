import {initiateAuth,respondToAuthChallenge} from "./Auth"
// Login function
async function login(username, password) {
    try {
        const authResult = await initiateAuth(username, password);
        console.log('Login successful!');
        // Here, you can store the tokens in localStorage or sessionStorage for future use
        return authResult;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}
// const res = await login("hasnainaskari32@gmail.com","String123@")
// console.log(res);

async function passwordReset(username,password) {
    try {
        const authResult = await initiateAuth(username,password); // Provide a dummy password for initiating password reset
        // Here, you may want to handle the challenge, but in this example, we'll assume it's handled externally
        console.log('Password reset initiated. Challenge response needed:', authResult);
        return authResult;
    } catch (error) {
        console.error('Password reset initiation failed:', error);
        throw error;
    }
}

// Function to set new password after password reset
async function newPassword(session, newPassword) {
    try {
        const authResult = await respondToAuthChallenge(session, { newPassword });
        console.log('New password set successfully!');
        // Here, you can store the tokens in localStorage or sessionStorage for future use
        return authResult;
    } catch (error) {
        console.error('Setting new password failed:', error);
        throw error;
    }
}
// // Assuming you have obtained session object from passwordReset() function
const session = await passwordReset('hasnainaskari32@gmail.com','String123@');
console.log(session,"session");
// // // Assuming you have obtained session object and user provided a new password
await newPassword(session, 'String1234@');
