//Always need to import react into your components.
import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

// Create class, component is the thing we are extending. Every component we create is going to be a class.
class StorePicker extends React.Component {
    // Regular React Component PropTypes. To know PropTypes needed ctrl+f = this.props.
    static propTypes = {
        // Use PropTypes.shape because the component required an specific set of objects
        history: PropTypes.object
    };

    myInput = React.createRef();
    // We do this bc of React Binding.
    goToStore = (event) => {
        // 1. Stop the form from submitting
        event.preventDefault();
        // 2. Get the text from that input
        const storeName = this.myInput.value.value;
        // 3. Change the page to /store/whatever-user-inputs
        this.props.history.push(`/store/${storeName}`);
    };

    // What html do I put on the page?**
    render() {
        // Return is a keyword!
        return (
            /* This is JSX Comment, JS Comments will break your code! */
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter A Store.</h2>
                <input 
                type="text" 
                ref={this.myInput}
                required 
                placeholder="Store Name" 
                defaultValue={getFunName()} 
                />
                <button type="submit">Visit Store -></button>
            </form>
        )
    }
}

export default StorePicker; 

