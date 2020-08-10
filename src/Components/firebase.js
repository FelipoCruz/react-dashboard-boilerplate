import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

////////////////////////
// Update the Firebase Credentials below
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
}
//////////////////////////

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth.signOut()
    }

    async register(firstname, lastname, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password)
        return this.userProfile(firstname, lastname)
    }

    userProfile(firstname, lastname) {
        let name = firstname.concat(' ', lastname)
        if(!this.auth.currentUser) {
            return alert('User Not Authorised!')
        }
        return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
            name: name,
            email: this.auth.currentUser.email,
            id: this.auth.currentUser.uid,
            currency: '₹'
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    async getCurrentUsername() {
        const username = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
        return username.get('name')
    }

    async getCurrency() {
        const currency = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
        return currency.get('currency')
    }

    getAuthStatus() {
        if(this.auth.currentUser) {
            return true
        } else {
            return false
        }
    }

    setCurrency(currency) {
        if(!this.getAuthStatus()) {
            return alert('User Not Authorised')
        }
        return this.db.doc(`users/${this.auth.currentUser.uid}`).update({
            currency: currency
        })
    }

    setUserName(name) {
        if(!this.getAuthStatus()) {
            return alert('User Not Authorised')
        }
        return this.db.doc(`users/${this.auth.currentUser.uid}`).update({
            name: name
        })
    }
}

export default new Firebase()