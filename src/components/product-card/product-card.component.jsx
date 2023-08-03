import { useContext } from 'react';
import { CartContext } from '../../contex/cart.context';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import { ProductCardContainer, ProductCardFooter } from './product-card.styles';
const ProductCard = ({product}) => {
    const {addItemToCart} = useContext(CartContext);
    const {name, price, imageUrl} = product;
    const addProductToCart = () => addItemToCart(product)
    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name}/>
            <ProductCardFooter>
                <span className='name'>{name}</span>
                <span className='price'>${price}</span>
            </ProductCardFooter>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} title='Add to cart' onClick={addProductToCart}/>
        </ProductCardContainer>
    );
}

export default ProductCard;