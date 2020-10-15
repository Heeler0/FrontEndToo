import React, {Component} from "react";


export default class SearchForAppPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://127.0.0.1:8080",
            name: "",
            data: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let { name, endpoint } = this.state
        endpoint += "/api/service?name=" + name;
        fetch(endpoint, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    render() {
        const { data } = this.state;
        return(
            <div>
                <div>
                    <h1> Search for application name by entering service name.</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input type="text" name="name" placeholder="Service name" onChange={this.handleChange} value = {this.state.name}/>
                        </div>
                        <div>
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
                {data
                    ?
                    <div>
                        <h1>{data.name}</h1>
                        <p>appGroup: {data.appGroup}</p>
                        <p>appType: {data.appType}</p>
                        <p>description: {data.description}</p>
                        <p>appCost: {data.appCost}</p>
                        <p>lastModified: {data.lastModified}</p>
                    </div>
                    :
                    <div/>
                }
            </div>
        )
    }
}