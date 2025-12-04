import { Component } from "react";

export default function Address() {
    const street = "123 Main St";
    const city = "Lakewood";
    const state = "NJ";
    const zip = "08701";

    return (
        <div>
            <h2>Address(1):</h2>
            <div>{street}</div>
            <div>{city} {state}, {zip}</div>
            <div></div>
        </div>
    )
}

export class AddressC extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { street, state, city, zip } = this.props;
        return (
            <>
                <h1>Address(2):</h1>
                <h2>{street}</h2>
                <h2> {city} {state}, {zip}</h2>
            </>
        );
    }
}