import React from 'react';
import PropTypes from "prop-types";


const Login = (props) => (
    <nav className="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's Inventory</p>
        <button className="github" onClick={() => props.authenticate("Github")}>Log in with Github</button>
        <button className="twitter" onClick={() => props.authenticate("Twitter")}>Log in with Twitter</button>
        <button className="facebook" onClick={() => props.authenticate("Facebook")}>Log in with Facebook</button>
    </nav>
);

// Component Validation, valide the data being passed!
// Stateless functional component
// Login tagline expects a "func" as its value.
Login.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default Login;