import React from "react"
import { Link } from "react-router-dom"

export default function PageNotFound() {
    return (
        // <div>404-Page Not Found</div>

        <div className="notfound-container">
            <div className="notfound-card">
                <p className="notfound-code">404 Error</p>

                <h1 className="notfound-title">
                    This Property Is No Longer Available
                </h1>

                <p className="notfound-description">
                    The page you're looking for may have been moved, sold, or never
                    existed. Let's help you find your next home.
                </p>

                <div className="notfound-actions">
                    <Link to="/" className="btn-primary">
                        Back to Home
                    </Link>

                    <Link to="/buy" className="btn-secondary">
                        View Listings
                    </Link>
                </div>
            </div>
        </div>
    )


}