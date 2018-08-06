// Import React dependency!
// You could also do: import { Component } from 'react'; 
import React from 'react'; 

//Import React specific method 
import { render } from 'react-dom';

//Import method created and give specific file.
import Router from "./components/Router";

//Import your css, relative path
import "./css/style.css";

// Mounting point. DOM Element
//<StorePicker /> ---> Self-closing tag.
//Store your components in separate files to import and use whenever we want!.
//Components folder.
render(<Router />, document.querySelector('#main'));