import { useContext } from 'react';
import { CartContext } from '../../contex/cart.context';
import { CartIconContainer, ItemCount, DefaultShoppingIcon, HomeShoppingIcon, HomeItemCount, DefaultItemCount } from './cart-icon.styles';

const CartIcon = (props) => {
    const {color} = props
    const {isVisible, setIsVisible, cartCount} = useContext(CartContext);
    const toggleIsVisible = () => setIsVisible(!isVisible);
    return (
        <CartIconContainer onClick={toggleIsVisible}>
            {color === 'white' ? <HomeShoppingIcon className='shopping-icon'/> : <DefaultShoppingIcon className='shopping-icon'/>}
            {color === 'white'? <HomeItemCount>{cartCount}</HomeItemCount> : <DefaultItemCount>{cartCount}</DefaultItemCount>}
        </CartIconContainer>
    );
}

export default CartIcon;