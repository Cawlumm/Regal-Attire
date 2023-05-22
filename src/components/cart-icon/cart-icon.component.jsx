import { useContext } from 'react';
import { CartContext } from '../../contex/cart.context';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = () => {
    const {isVisible, setIsVisible} = useContext(CartContext);

    const toggleIsVisible = () => setIsVisible(!isVisible);
    return (
        <div className='cart-icon-container' onClick={toggleIsVisible}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    );
}

export default CartIcon;