import React from 'react';
import PropTypes from "prop-types";
import { formatPrice } from '../helpers';

class Fish extends React.Component {
    // Regular React Component PropTypes. To know PropTypes needed ctrl+f = this.props.
    static propTypes = {
        // Use PropTypes.shape because the component required an specific set of objects
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        addToOrder: PropTypes.func
    };
    // handleClick = () => {
    //     this.props.addToOrder(this.props.index);
    // }; Did this inline bc only runs once
    render(){
        // Shorthand variables
        const {image, name, price, desc, status} = this.props.details;
        const isAvailable = status === 'available';
        return (
           <li className="menu-fish">
               <img src={image} alt={name} />
               <h3 className="fish-name">{name}
                    <span className="price">{formatPrice(price)}</span>
               </h3>
               <p className="desc">{desc}</p>
               <button  disabled={!isAvailable} onClick={() => {this.props.addToOrder(this.props.index)}}>
                    {isAvailable ? 'Add to Order' : 'Sold Out!'}
               </button>
           </li>
        );
    }
}

export default Fish;