import React from "react";



export default function BuyHome() {
    return (
        // <div>
        //     Buy Home

        // </div>


        <main className="buy">
            <h2>Homes for sale</h2>

            <section className="grid">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                    <div className="home-card" key={index}>
                        <img
                            src={`/img/house${index + 1}.jpg`}
                            alt={`House ${index + 1}`}
                        />
                        <div className="overlay">
                            <span>$420,000 · 3 bd · 2 ba</span>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    )
}