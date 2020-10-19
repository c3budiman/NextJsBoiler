import styles from './styleButton.module.css'

export default function GreenButton(props) {

    return (
        <button
            type={props.type}
            className={styles.green}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}