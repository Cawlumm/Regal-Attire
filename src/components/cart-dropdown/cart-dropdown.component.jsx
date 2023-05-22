import { useContext } from 'react';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import { CartContext } from '../../contex/cart.context';

const CartDropdown = () => {
    const {setIsVisible} = useContext(CartContext);
    return(
        <div className='cart-dropdown-container' onClick={setIsVisible}>
            <div className='cart-items'/>
            <Button title='Go to Checkout'></Button>
        </div>
    )
}

export default CartDropdown;