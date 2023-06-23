import { useContext } from 'react';
import { CartContext } from '../../contex/cart.context';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
    const {isVisible, setIsVisible, cartCount} = useContext(CartContext);
    const toggleIsVisible = () => setIsVisible(!isVisible);
    return (
        <CartIconContainer onClick={toggleIsVisible}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;