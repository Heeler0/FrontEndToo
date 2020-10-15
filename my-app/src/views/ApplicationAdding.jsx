import React, { Component } from "react";

export default class ApplicationAdding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://127.0.0.1:8080",
            name: "",
            appGroup: "",
            appType: "",
            appCost: 0,
            description: ""
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event) {
        const { appGroup, name, appType, appCost, description } = this.state
        event.preventDefault()
        let { endpoint } = this.state;
        endpoint += "/api/application"
        fetch(endpoint, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "name": name,
                "appGroup": appGroup,
                "appType": appType,
                "appCost": appCost,
                "description": description,
            })
        }).then(response => console.log(response))
    }

    render() {
        return(
            <div>
                <h1>Add application</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" name="name" placeholder="name" onChange={this.handleChange} value = {this.state.name}/>
                    </div>
                    <div>
                        <input type="text" name="appType" placeholder="appType" onChange={this.handleChange} value = {this.state.appType}/>
                    </div>
                    <div>
                        <input type="text" name="appGroup" placeholder="appGroup" onChange={this.handleChange} value = {this.state.appGroup}/>
                    </div>
                    <div>
                        <input type="text" name="description" placeholder="description" onChange={this.handleChange} value = {this.state.description}/>
                    </div>
                    <div>
                        <input type="number" name="appCost" placeholder="appCost" onChange={this.handleChange} />
                    </div>
                    <div>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        )
    }
}