import { signUp,confirmSignUp,signIn,signOut } from 'aws-amplify/auth';

async function handleSignUp({ username, password, email }) {
  console.log(username, password, email);
    try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
        },
        // optional
        autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      }
    });

    console.log(userId);
  } catch (error) {
    console.log('error signing up:', error);
  }
}
// const res = await handleSignUp({
//     username: "hasnainaskari32@gmail.com",
//     password: "String123@",
//     email: "hasnainaskari32@gmail.com"
//   });
async function handleSignUpConfirmation({ username, confirmationCode }) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode
      });
      console.log(isSignUpComplete,"isSignUpComplete");
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }
//   const res = await handleSignUpConfirmation({
//     username:"hasnainaskari32@gmail.com",
//     confirmationCode:"793001"
//   })
async function handleSignIn({ username, password }) {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    console.log(isSignedIn,"isSignedIn");
  } catch (error) {
    console.log('error signing in', error);
  }
}
// const res = await handleSignIn({
//     username:"hasnainaskari32@gmail.com",
//     password:"String123@"
// })
async function handleSignOut() {
    try {
      const res = await signOut({ global: true });
      console.log(res,"Response");
    } catch (error) {

      console.log('error signing out: ', error);
    }
  }
const  res = await handleSignOut()
console.log(res,"Res");