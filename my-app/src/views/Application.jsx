import React, { Component } from "react";
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'

export default class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://127.0.0.1:8080",
            appName: "",
            data: [],
            appId: "",
            name: "",
            type: "",
            subType: "",
            description: ""
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        let { endpoint } = this.state;
        endpoint += "/api/application/all";
        fetch(endpoint)
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event) {
        const { appId, name, type, subType, description } = this.state
        event.preventDefault()
        let { endpoint } = this.state;
        endpoint += "/api/service"
        fetch(endpoint, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "appId": appId,
                "name": name,
                "type": type,
                "subType": subType,
                "description": description,
            })
        }).then(response => console.log(response))
    }

    handleClick(id, name) {
        this.setState({
            appId: id,
            appName: name
        })
    }

    render() {
        const { data, appId, appName } = this.state;

        return (
            <div>
                <div>
                    <Link to="/Adding">
                        <Button>
                            Adding application
                        </Button>
                    </Link>
                    <Link to="/SearchApp">
                        <Button>
                            Search for application
                        </Button>
                    </Link>
                    <Link to="/SearchServ">
                        <Button>
                            Search for services
                        </Button>
                    </Link>
                </div>
                {data.map((item, index) =>
                    <div itemID>
                        <h1>{item.name}</h1>
                        <div>
                            <p>appGroup: {item.appGroup}</p>
                            <p>appType: {item.appType}</p>
                            <p>description: {item.description}</p>
                            <p>appCost: {item.appCost}</p>
                            <p>lastModified: {item.lastModified}</p>
                        </div>
                        <div>
                            <button onClick={() => this.handleClick(item.id, item.name)}>
                                Add service
                            </button>
                        </div>
                    </div>
                )}
                <div>
                    {appId
                        ?
                        <div>
                            <h3>Add a service to {appName}</h3>
                                <form onSubmit={this.handleSubmit}>
                                    <div>
                                        <input type="text" name="name" placeholder="name" onChange={this.handleChange} value = {this.state.name}/>
                                    </div>
                                    <div>
                                        <input type="text" name="type" placeholder="type" onChange={this.handleChange} value = {this.state.type}/>
                                    </div>
                                    <div>
                                        <input type="text" name="subType" placeholder="subType" onChange={this.handleChange} value = {this.state.subType}/>
                                    </div>
                                    <div>
                                        <input type="text" name="description" placeholder="description" onChange={this.handleChange} value = {this.state.description}/>
                                    </div>
                                    <div>
                                        <input type="submit" value="Submit"/>
                                    </div>
                                </form>
                        </div>
                        : <div/>
                    }
                </div>
            </div>
        );
    }

}
