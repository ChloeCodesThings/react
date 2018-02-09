/*global undefinedVariable:false Raven:false*/
/*eslint no-unused-vars:0 no-eval:0*/

import React, { Component } from 'react';
import logo from '../assets/sentry-glyph-black.png';

class Errors extends Component {
    constructor(props) {
        super(props);
        this.state = {color: 'black', email: '', submitted_email: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        Raven.setTagsContext({page: "CheckoutPage"});
    }

    handleChange(event) {
        this.setState({email: event.target.value});
    }

    handleSubmit(event) {
        var email = this.state.email;
        this.setState({submitted_email: email});
        Raven.setUserContext({email});
    }

    // ERRORS
    notAFunctionError() {
        var obj = {
            someFunc: function () {}
        };
        alert("thanks!");
        obj.attributeInvalid();
    }

    uriError() {

        alert("thanks!");
        decodeURIComponent('%');
    }

    typeError() {

        alert("thanks!");
        null.f();
    }

    syntaxError() {

        alert("thanks!");
        eval('foo bar');
    }

    referenceError() {

        alert("thanks!");
        var a = undefinedVariable;
    }

    rangeError() {

        alert("thanks!");
        throw new RangeError('Parameter must be between 1 and 100');
    }

    evalError() {

        alert("thanks!");
        throw new EvalError('Hello', 'someFile.js', 10);
    }
    // ERRORS (end)

    showError(color) {
        var that = this;
        that.setState({color: color});
        setTimeout(function () {
            that.setState({color: 'black'});
        }, 1500);
    }

    makeBreadcrumb() {
        Raven.captureBreadcrumb({
            message: 'Dropped a breadcrumb!',
            category: 'action',
            level: 'info',
            data: {
                version: '1.0',
                note: 'Clicked the fun (obvious breadcrumb) button'
            }
        });
        alert("That was fun! 🎉");
    }

    // RAVEN CONFIGURATIONS:
    // setSampleTag() {
    //     Raven.setTagsContext({sampleTag: "sampleValue"});
    // }

    // setExtraContext() {
    //     Raven.setExtraContext({ foo: "bar" });
    // }
    // RAVEN CONFIGURATIONS (end)

    render() {

        return (
            <div style={{
                color: this.state.color
            }}>
            <div className="center">
            <form onSubmit={(e) => { e.preventDefault();}}>
                <div className="form-group">
                    <input type="email" className="form-control" onChange={this.handleChange} placeholder="Enter email"/>
                </div>
                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>                
            </form>
            </div>

                <h2>Hi, {this.state.submitted_email
                        ? this.state.submitted_email
                        : "Guest"} please vote for your favorite!</h2>
                <div>
                    <ul className="center list-group " onClick={this.showError.bind(this, 'red')}>
                        <li className="list-group-item list-group-item-danger">
                            <h3>Totally Normal Working App...</h3>
                        </li>
                        <li className="list-group-item" onClick={this.notAFunctionError.makeBreadcrumb}>
                            <h3>Cats 😸</h3>
                            <p>(definitely not a TypeError)</p>
                        </li>
                        <li className="list-group-item" onClick={this.uriError}>
                            <h3>Pugs 🐶</h3>
                            <p>(defintely not a URIError)</p>
                        </li>
                        <li className="list-group-item" onClick={this.typeError}>
                            <h3>Birds 🐦</h3>
                            <p>(definitely not an Uncaught TypeError)</p>
                        </li>
                        <li className="list-group-item" onClick={this.syntaxError}>
                            <h3>Snakes 🐍</h3>
                            <p>(definitely not a SyntaxError)</p>
                        </li>
                        <li className="list-group-item" onClick={this.referenceError}>
                            <h3>Ducks 🦆</h3>
                            <p>(definitely not a ReferenceError)</p>
                        </li>
                        <li className="list-group-item" onClick={this.rangeError}>
                            <h3>Fish 🐠</h3>
                            <p>(definitely not a RangeError)</p>
                        </li>
                        <li className="list-group-item" onClick={this.evalError}>
                            <h3>Whales 🐳</h3>
                            <p>(definitely not an EvalError)</p>
                        </li>

                        <li className="list-group-item" onClick={this.makeBreadcrumb}>
                            <h3>Click here for fun! 🎉</h3>
                            <p>Let's drop a breadcrumb</p>
                        </li>



                    </ul>

                    <ul className="left list-group hidden" onClick={this.showError.bind(this, 'green')}>
                        <li className="list-group-item list-group-item-success">
                            <h3>FEATURES</h3>
                        </li>
                        <li className="list-group-item" onClick={this.setSampleTag}>
                            <h3>Set Sample Tag</h3>
                            <p>{'Raven.setTagsContext({sampleTag: "sampleValue"});'}</p>
                        </li>
                        <li className="list-group-item" onClick={this.setExtraContext}>
                            <h3>Set Extra Context</h3>
                            <p>{'Raven.setExtraContext({foo: "bar"});'}</p>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}

export default Errors;
