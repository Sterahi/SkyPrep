import React from "react"
import "./App.scss"

export default class App extends React.Component {
    constructor() {
        super()
        this.state ={
            addons: [
                {
                    addon: "AWD Drivetrain",
                    price: 2500
                }, {
                    addon: "GPS Navigation",
                    price: 2000
                }, {
                    addon: "Winter tire package",
                    price: 2000
                }, {
                    addon: "sport package",
                    price: 3000
                }, {
                    addon: "Live traffic updates",
                    price: 1500
                }, {
                    addon: "Roadside Assistance",
                    price: 2500
                }
            ],
            basePrice: 24999,
            addonTotal: 0,
            cost: 24999.00
        }
    }

    addFeature(cost) {
        let { addonTotal } = this.state
        addonTotal += cost
        if(addonTotal >= 8000 || addonTotal === 8000) {
            this.setState({
                addonTotal: 8000
            }, () => {
                this.total()
            })
        } else {
            this.setState({
                addonTotal
            }, () => {
                this.total()
            })
        }
    }

    total() {
        this.setState({
            total: this.state.basePrice + this.state.addonTotal
        }, () => {
            // using callback to prevent async from goin wrong.
            this.addTax()
        })
    }

    addTax() {
        this.setState({
            total: this.state.total * 1.13
        })
    }

    componentDidMount() {
        this.total()
    }

    render() {
        const { total, basePrice, addons }  = this.state
        return (
            <div className="App">
                <div className = "hero">
                    <h1>Elizabeth&#39;s Dealership</h1>
                </div>
                <div className = "options">
                    <div className = "basePrice">
                        <span>
                            Base Price: { basePrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }
                        </span>
                    </div>
                    {this.state.addonTotal >=8000 &&
                        <div>Congratulations! You qualify for a special discount. We&#39;ve capped your addon cost to 8,000</div>
                    }
                    <div className = "addons">
                        <h3>Addons</h3>
                        {
                            (addons||[]).map((addon, id) => {
                                if(addon === undefined) {
                                    return ""
                                } else {
                                    return(
                                        <div className = "addonWrapper" key = { id }>
                                            <a className = "button" onClick={
                                                () => this.addFeature(addon.price)}
                                            >
                                                <span className = "name">{addon.addon}</span>
                                                <span className = "price">${addon.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>
                                            </a>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <div className = "total">
                    <span>
                        <strong>Total: </strong>${ (total||0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") || 0 }
                    </span>
                </div>
            </div>
        )
    }
}
