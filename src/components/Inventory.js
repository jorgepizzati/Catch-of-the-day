import React from 'react';
import PropTypes from "prop-types";
import firebase from 'firebase';
import Login from './Login';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
// default and named import
import base, { firebaseApp } from "../base"; 


class Inventory extends React.Component {
    // Regular React Component PropTypes. To know PropTypes needed ctrl+f = this.props.
    static propTypes = {
        // Use PropTypes.shape because the component required an specific set of objects
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged (user => {
            if(user) {
                this.authHandler({ user })
            };
        });
    };

    // AUTHENTICATION METHODS //
    // --------------------------------------------------------------- //
    // Method that will check for current owner or will assign new owner
    authHandler = async (authData) => {
        // 1. Look up the store in the firebase database
        const store = await base.fetch(this.props.storeId, {context: this});
        console.log(store);
        // 2. Claim if there is no owner
        if (!store.owner) { 
            // save as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        // 3. Set the state of the inventory component to reflect the current store
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
        console.log(authData);
    };
    // Authentication/Login method
    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler);
    };
    logout = async () => {
        console.log('Logging out');
        await firebase.auth().signOut();
        this.setState({ uid: null})
    };

    // RENDERING OUT TO THE PAGE //
    render(){
        const logout = <button onClick={this.logout}>Log Out!</button>
        // 1. Check if they are logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        } 
        // 2. Check if they are not the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
            <div>
                <p>Sorry, you're not the owner</p>
                {logout}
            </div>
            );
        } 
        // 3. They must be the owner, just render the inventory
        return (
           <div className="inventory">
               <h2>Inventory!</h2>
               {logout}
               {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm 
                        key={key} 
                        index={key}
                        fish={this.props.fishes[key]} 
                        updateFish={this.props.updateFish} 
                        deleteFish={this.props.deleteFish}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
           </div>
        );
    }
}

export default Inventory;