import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        // <div>
        //     Home
        // </div>

        <main className="home">
            {/* Hero */}
            <section className="hero">
                <h1>Find your place</h1>
                <p>Buy or sell homes with confidence</p>

                <div className="actions">
                    <Link to="/buy" className="action-card">
                        <img src="/img/house1.jpg" alt="Buy a home" />
                        <div className="overlay">
                            <span>Buy a home →</span>
                        </div>
                    </Link>

                    <Link to="/sell" className="action-card">
                        <img src="/img/house2.jpg" alt="Sell a home" />
                        <div className="overlay">
                            <span>Sell your home →</span>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    )

}

