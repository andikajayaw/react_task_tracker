import PropTypes from 'prop-types'

const Button = ({btnClass, color, text, onClick}) => {


    return (
        <button className={btnClass} style={{ backgroundColor: color }} onClick={onClick}>{text}</button>
    )
}

Button.defaultProps = {
    color: 'steelblue',
    btnClass: 'btn',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button