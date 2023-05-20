/*
default

inverted

google sign in

*/

import './button.styles.scss';
const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',

}

const Button = ({title, buttonType, ...otherProps}) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}{...otherProps}>
            {title}
        </button>
    )
}

export default Button;