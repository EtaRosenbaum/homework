import React from "react";



export default function SellHome() {
    return (
        // <div> Sell Home </div>
        <main className="sell">
            <h2>Sell your home</h2>
            <p className="subtitle">
                See how much your home could be worth
            </p>

            <section className="grid">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <div className="home-card" key={index}>
                        <img
                            src={`/img/house${index + 1}.jpg`}
                            alt={`House ${index + 1}`}
                        />
                        <div className="overlay">
                            <span>Get an estimate →</span>
                        </div>
                    </div>
                ))}
            </section>

            <div className="cta-container">
                <button className="cta">Get your home value</button>
            </div>
        </main>
    )
}