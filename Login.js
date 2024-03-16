import {createUser, initiateAuth,newPassword,passwordReset,respondToAuthChallenge} from "./Auth"
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

const session = await passwordReset('hasnainaskari32@gmail.com','String123@');

// Assuming you have obtained session object and user provided a new password
if(session){
    await newPassword(session.Session, 'String1234@');
}


//const res = await createUser("hasnainaskari32@gmail.com", "String123@","hasnainaskari32@gmail.com");
//console.log(res,"res");