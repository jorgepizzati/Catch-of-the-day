import React from 'react';
import PropTypes from "prop-types";
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    // Every function that alters the state needs to live in the where the state lives.
    state = {
      fishes: {},
      order: {}  
    };

    // Regular React Component PropTypes. To know PropTypes needed ctrl+f = this.props.
    static propTypes = {
        // Use PropTypes.shape because the component required an specific set of objects
        match: PropTypes.object
    };

    // LifeCycle Methods (Firebase Stuff) //
    componentDidMount() {
        const { params } = this.props.match;
        // First reinstate localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        // ref references to piece of data in database(react specific)
        this.ref = base.syncState(`${params.storeId}/fishes`, { 
        context: this,
        // Sync fish state
        state: "fishes"
        });
    };

    // LifeCycle Methods (localstorage) //
    componentDidUpdate() {
        console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    };

    // App will no longer show. Remove reference to database when abandoning page.
    componentWillUnmount(){
        base.removeBinding(this.ref);
    };


    // All of our app's functions //
    addFish = fish => {
        // 1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. Add new fish to that fishes varibale
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set the new fishes object to state
        this.setState ({ fishes });
    };
    updateFish = (key, updatedFish) => {
        // 1 Take a copy of current state
        const fishes = { ...this.state.fishes };
        // 2 Update state
        fishes[key] = updatedFish;
        // 3 set that to state
        this.setState({ fishes });
    };
    deleteFish = (key) => {
        // 1 Take a copy of current state
        const fishes = { ...this.state.fishes };
        // 2 Update state
        fishes[key] = null;
        // 3 set that to state
        this.setState({ fishes });
    }
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };
    addToOrder = key => {
        // 1. Take copy of state
        const order = { ...this.state.order };
        // 2. Either add to the order or update the number in order
        order[key] = order[key] + 1 || 1;
        // 3. Call setState to update to our state object
        this.setState({ order });
    };
    removeFromOrder = key => {
       // 1. Take copy of state
       const order = { ...this.state.order };
       // 2. Remove item from order
       delete order[key];
       // 3. Call setState to update to our state object
       this.setState({ order });
    };

    
    // This is how the app is actually being rendered. //
    render() {
        return (
           <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish 
                            key={key} 
                            // To access key as prop
                            index = {key}
                            details={this.state.fishes[key]} 
                            addToOrder={this.addToOrder} />
                        ))}
                    </ul>
                </div>
                {/* or use {...this.state} if you NEED all the data */}
                <Order  
                    fishes={this.state.fishes} 
                    order={this.state.order} 
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory 
                    addFish={this.addFish}  
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}  
                    loadSampleFishes={this.loadSampleFishes} 
                    fishes={this.state.fishes}    
                    storeId={this.props.match.params.storeId}        
                />
           </div>
        );
    }
}

export default App;