import React from "react";
import { APP_NAME } from "../constants";

const Footer = () => (
    <footer className="footer" style={styles.footer}>
        <div className="container text-center">
            <span className="text-muted">
                {APP_NAME} &copy; 2020 &nbsp;
                <a target="_blank" href="https://github.com/kkamara">
                    Kelvin Kamara
                </a>
            </span>
        </div>
    </footer>
);

const styles = {
    footer: {
        marginTop: 30
    }
};

export default Footer;
