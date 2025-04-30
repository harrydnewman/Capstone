import styles from '../styles/Button.module.css'
import PropTypes from 'prop-types';

export default function Button({ onClick, text }) {
    return (
      <button className={styles.button} onClick={onClick}>
        {text}
      </button>
    );
  }


  Button.propTypes = {
      onClick: PropTypes.func,
      text: PropTypes.string
  };