import React from 'react';
import PropTypes from "prop-types";

//SAVE TIME AND CODE!!! Stateless Functional Component if only has render method and proptypes!
const Header = (props) => (
        <header className="top">
            <h1>
            Catch 
            <span className="ofThe">
            <span className="of">of</span> 
            <span className="the">the</span>
            </span>
            Day</h1>
            <h3 className="tagline">
                <span>{props.tagline}</span>
            </h3>
        </header>
    );
    // Component Validation, valide the data being passed!
    // Stateless functional component
    // Header tagline expects a "string" as its value.
    Header.propTypes = {
        tagline: PropTypes.string.isRequired
    };

export default Header;