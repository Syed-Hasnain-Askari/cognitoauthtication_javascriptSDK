import { CognitoIdentityProviderClient, InitiateAuthCommand, RespondToAuthChallengeCommand,AdminSetUserPasswordCommand} from "@aws-sdk/client-cognito-identity-provider";

// Initialize CognitoIdentityProviderClient
const cognitoClient = new CognitoIdentityProviderClient({ region: "ap-south-1" });

// Initialize function to configure SDK
async function initializeCognito() {
    // You can add any additional configuration here
}

// Function to initiate authentication
async function initiateAuth(username, password) {
    try {
        const response = await cognitoClient.send(new InitiateAuthCommand({
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: "51uf6q4h1llc4n80hsle6lhqpk",
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password
            }
        }));
        console.log(response);
        return response.AuthenticationResult;
    } catch (error) {
        console.error("Error initiating authentication:", error);
        throw error;
    }
}
// Function to respond to authentication challenge
async function respondToAuthChallenge(session, challengeResponses) {
    console.log(challengeResponses,"challengeResponses");
    console.log(session,"session");
    try {
        const response = await cognitoClient.send(new RespondToAuthChallengeCommand({
            ChallengeName: "NEW_PASSWORD_REQUIRED", // Change according to the challenge type
            ClientId: "51uf6q4h1llc4n80hsle6lhqpk",
            ChallengeResponses: {
                USERNAME:"hasnainaskari32@gmail.com",
                NEW_PASSWORD: challengeResponses.newPassword,
                 
            },  
            Session:"AYABeMcHlLsre8g9MrBGEvl7PAAAHQABAAdTZXJ2aWNlABBDb2duaXRvVXNlclBvb2xzAAEAB2F3cy1rbXMATGFybjphd3M6a21zOmFwLXNvdXRoLTE6NjU0NDM0NDQ0NzkwOmtleS8yNjg1NWU1NC05NTMzLTRhNDctYjYxNy1hYjgwYjMyNDkxZWQAuAECAQB4IiNWL_vNLuA_HYRb4PrTYxCHn3uVXc9cwgKEMGhCAIsBJaHsAe9149bgTXUZx6xo-QAAAH4wfAYJKoZIhvcNAQcGoG8wbQIBADBoBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDCwgLmmayIt5vqIU-gIBEIA7fWzFo8_6TVIrV_s5P4ScyLNRNbAT7_XOgOKpZAW4OFvnJuxUO8pZvAVk7HxuNxzByG9VeQ8N0_QnqLwCAAAAAAwAABAAAAAAAAAAAAAAAAAACbVOSj3gCylCb1vJmAXQl_____8AAAABAAAAAAAAAAAAAAABAAAA1SKichaAynsqIn0J8SbJH-4aGn6cL0xM8a6orGKZYeYTu2vVK5BurZQc90HQmPA8MSkZMBIo2AoX8b4jzKel4leDepvsaA3vUMjDtbV71p7WWXxBgO85ufLkbzrMHmnqKzvmh5dgEPCUFwH-6RTNPpAcFcRszwSraDRQ86l3vyI1yfTrfkPAWpwSsacfCazmUIfLyLnyXmXLMG09sWtAGk98j4hYh45ydLmM0v5FqFhZjYE9MZsNzDIKiTHa7tiB-lKIrqgVsWRWv_P68nB_J-6xTer4x8w6dILkbUtxqQrXHys6Q84"    
        }));

        return response;
    } catch (error) {
        console.error("Error responding to authentication challenge:", error);
        throw error;
    }
}

// const res = await initiateAuth("hasnainaskari32@gmail.com","String123@")
// console.log(res);
async function initiateAndRespondToAuth(username, password, newPassword) {
    try {
        // Initiate authentication
        const authResult = await initiateAuth(username, password);

        // Handle authentication challenge if necessary
        if (authResult.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
            const session = {
                username: username,
                secretHash:"/TJzL+NqFoqJYYMQy0iCY8T/SvHxGlT9nGKccw11yEYQ=",
                // Add other session parameters if needed
            };
            const challengeResponses = {
                newPassword: newPassword,
                // Add other challenge responses if needed
            };
            const newAuthResult = await respondToAuthChallenge(session, challengeResponses);
            console.log('New authentication result:', newAuthResult);
            return newAuthResult;
        } else {
            // Authentication successful without any challenge
            console.log('Authentication successful:', authResult);
            return authResult;
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Example usage
// const res = await initiateAndRespondToAuth('hasnainaskari32@gmail.com', 'String123@', 'String1234@')
// console.log(res);

// Other functions for PasswordReset, NewPassword, TokenRefresh, MFA, ConfirmMFA, etc. can be similarly implemented

// Export the functions
async function resetPassword(username, newPassword) {
    
    try {
        const params = {
            UserPoolId: '51uf6q4h1llc4n80hsle6lhqpk', // Replace 'your_user_pool_id' with your actual user pool ID
            Username: username,
            Password: newPassword,
            Permanent: true
        };

        const command = new AdminSetUserPasswordCommand(params);
        const data = await cognitoClient.send(command);
        
        console.log("Password reset successfully:", data);
        return data;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
}

export {
    initializeCognito,
    initiateAuth,
    respondToAuthChallenge,
    resetPassword
};
