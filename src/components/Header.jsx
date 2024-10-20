import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.container}>
            <h1 className={styles.name}>Finance calculator</h1>
            <div className={styles.right}>
                <span className={styles.button}>Converter</span>
            </div>
        </header>
    )
}

export default Header;