console.log(firebase)
// Grab IDs
console.log("Hello World")
const auth = firebase.auth();
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const signInButton = document.getElementById('signInButton');
const signOutButton = document.getElementById('signOutButton');
const userDetails = document.getElementById('userDetails');
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

let guestRef;
let unsubscribe;

signInButton.onclick = () => {
    auth.signInWithPopup(provider);
}

signOutButton.onclick = () => {
    user = auth.currentUser
    guestRef = db.collection('guests')
    guestRef.doc(user.uid).set({
        Attending:document.getElementById("attending").checked,
        Name:`${user.displayName}`,
        Attendants: parseInt(document.getElementById("attendants").value)

    })
    auth.signOut()
}



auth.onAuthStateChanged(async user =>{
    console.log(user)
    if(user){
        guestRef = db.collection('guests')
        /*
        if(guestRef.doc(user.uid).exists){
            //Do nothing
        } else {
            guestRef.doc(user.uid).set({
                Attending:false,
                Name:`${user.displayName}`,
                Attendants:0
            })
        }
        */
        
        //User is signed in, 'user' variable is not null/false
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3>Hello ${user.displayName}</h3> <p>User ID: ${user.uid}</p><p>Will you be attending this imaginary event?</p><input type="checkbox"id="attending"> <br><input type="number" id="attendants" min="0" max="3">`

        const snapshot = await guestRef.doc(user.uid).get()
        document.getElementById("attending").checked =  snapshot.data().Attending
        document.getElementById("attendants").value = snapshot.data().Attendants
        

    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';

    }
});