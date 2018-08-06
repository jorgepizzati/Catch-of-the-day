import React from 'react';
import PropTypes from "prop-types";
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
    // Regular React Component PropTypes. To know PropTypes needed ctrl+f = this.props.
    static propTypes = {
        // Use PropTypes.shape because the component required an specific set of objects
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    };

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 500, exit: 500 }
        };
        // Make sure the fish is loaded before it continues. Null returns nothing.
        if (!fish) return null;

        if (!isAvailable) {
            return (
                <CSSTransition {...transitionOptions}>
                    <li  key={key}>
                    {/* Fallback in case the fish removed from cart has been deleted from DB */}
                        Sorry {fish ? fish.name : 'fish'} is no longer available.
                    </li>
                </CSSTransition>
            );
        };
        return ( 
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                    <TransitionGroup component="span" className="count">
                        <CSSTransition {...transitionOptions}>
                            <span>{count}</span>
                        </CSSTransition>
                    </TransitionGroup>
                        lbs {fish.name}
                        {formatPrice(count * fish.price)}
                        <button onClick={() => this.props.removeFromOrder(key)}>
                            &times;
                        </button>
                    </span>
                </li>
            </CSSTransition>
        );
    };

    render(){
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            // What fish is being added?
            const fish = this.props.fishes[key];
            // How many fish is being added?
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
            // reduce requires a starting value = 0
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                {/* Replace Ul tag with TransitionGroup tag and specify the html tag. */}
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total: <strong>{formatPrice(total)}</strong>
                </div>
           </div>
        );
    }
}

export default Order;