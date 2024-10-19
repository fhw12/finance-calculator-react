import "./Header.css";

function Header() {
    return (
        <header className="container">
            <h1 className="name">Finance calculator</h1>
            <div className="right">
                <span className="button" href="">Converter</span>
            </div>
        </header>
    )
}

export default Header;