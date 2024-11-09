// Simulate Data Fetching Using Promises
// and Refactor with Async/Await

const JaneDoeInfo = "Jane Doe";

// Create three asynchronous functions to simulate data fetching for user profiles, posts, and comments.
// Rewrite each function to use async/await syntax instead of .then.
// Use try...catch blocks to handle errors and provide custom error messages for each failure point.

// fetch profile function with error if profile object is empty
async function fetchProfile(profileName) {
    console.log(`Fetching ${profileName}'s profile. Please Wait...`);
    await delay(2000);
        try { 
            let pendingProfile = JSON.stringify( await getProfile());
            profile = pendingProfile;
            if(profile == "{}" || profile == " ")  throw "No Profile to load";
            console.log(`Fetching ${profileName}'s profile successful: ${profile}`);
        }
        catch(err) {
            console.log(`Fetching ${profileName}'s profile ERROR: ${err}`);
        }      
}
// post info with potential to return empty object
async function getProfile(){
    let x = Math.round(Math.random() * 100);
    if (x > 11){
        const profileTrue = {
            name: "Jane Doe",
            posts: 1,
            comments: 1
        };
        return profileTrue;
    } else{
        const profileFalse = {}
        return profileFalse;
    }
}
// fetch posts function with potential for failure
async function fetchPosts(profileName) {
    console.log(`Fetching ${profileName}'s posts. Please Wait...`);
    await delay(1000);
    let x = Math.round(Math.random() * 100);
    let posts = "";
        try { 
            posts = await getPosts();
            if(x == 0)  throw "No Posts to load";
            if(x > 90)   throw "Too many Posts. Out of Memory.";
            console.log(`Fetching ${profileName}'s posts successful: ${posts}`);
        }
        catch(err) {
            console.log(`Fetching ${profileName}'s posts ERROR: ${err}`);
        }      
}
// post info
async function getPosts(){
    return "I like to code.";
}
// fetch comments function with potential for failure
async function fetchComments(profileName) {
        console.log(`Fetching ${profileName}'s comments. Please Wait...`);
        await delay(500);
        let x = Math.round(Math.random() * 100);
        let comments = "";
        try { 
            comments = await getComments();
            if(x == 0)  throw "No Comments to load";
            if(x > 90)   throw "Too many Comments. Out of Memory.";
            console.log(`Fetching ${profileName}'s comments successful: ${comments}`);
        }
        catch(err) {
            console.log(`Fetching ${profileName}'s comments ERROR: ${err}`);
        }      
}
// comment info
async function getComments(){
    return "Good post.";
}


// Each function should return a promise that resolves after a delay, simulating a time-intensive operation
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

fetchProfile(JaneDoeInfo);
fetchPosts(JaneDoeInfo);
fetchComments(JaneDoeInfo);







// Implement Sequential and Parallel Data Fetching
function profileGet(){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            const profileExists = true;
            if(profileExists){
                resolve("Profile Found. Information retrieved asynchronously.")
            }else{ reject("Profile does not exist.")}
        }, 1000);
    });
}

function postGet(){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            const postExists = true;
            if(postExists){
                resolve("Post Found. Information retrieved asynchronously.")
            }else{ reject("Post does not exist.")}
        }, 2000);
    });
    
}

function commentGet(){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            const commentExists = true;
            if(commentExists){
                resolve("Comment Found. Information retrieved asynchronously.")
            }else{ reject("Comment does not exist.")}
        }, 500);
    });

}


// Sequential (synchronous)
function sequentialGetUserInfo(){
    const profileExists = true;
    setTimeout(() =>{ if(profileExists){
            console.log("Profile Found. Information retrieved Sequentially.")
        }else{ console.log("Profile does not exist.")};
    }, 1000);
        const postExists = true;
        setTimeout(() =>{ if(postExists){
            console.log("Post Found. Information retrieved Sequentially.")
        }else{ console.log("Post does not exist.")};
    }, 2000);
        const commentExists = true;
        setTimeout(() =>{  if(commentExists){
            console.log("Comment Found. Information retrieved Sequentially.")
        }else{ console.log("Comment does not exist.")};
    }, 500);
}

sequentialGetUserInfo();

// Parallel (asynchronous)
async function parallelGetUserInfo(){
    const profileFound = await profileGet();
    console.log(profileFound);
    const postFound = await postGet();
    console.log(postFound);
    const commentFound = await commentGet();
    console.log(commentFound);
}
parallelGetUserInfo();







// Chaining Async Functions

let promiseChain = new Promise((resolve, reject) => {
    try{
        resolve(JaneDoeInfo);
    }
    catch{
        reject("Aborted. Item not found.");
    };
  });


  
async function getUserContent(){ 
promiseChain
  .then(user => {
    console.log(`Fetching ${user}'s profile from chain...`);
    profileGet(user)
    return user;}, 
    error => {
    console.log(`ERROR retrieving profile: ${error}`)})
  .then(user => {
    console.log(`Fetching ${user}'s posts from chain...`);
    postGet(user)
    return user;}, 
    error => {
    console.log(`ERROR retrieving posts: ${error}`)})
  .then(user => {
    console.log(`Fetching ${user}'s comments from chain...`);
    commentGet(user)
    return user;}, 
    error => {
    console.log(`ERROR retrieving comments: ${error}`)});
  }


  getUserContent();