import PropTypes from "prop-types";

function Popup({ closePopup, children }) {
    return (
        <div className="popup">
            <span className="close-popup" onClick={closePopup}>
                &times;
            </span>
            {children}
        </div>
    );
}

Popup.propTypes = {
    closePopup: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Popup;
