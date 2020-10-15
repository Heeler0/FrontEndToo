import React, {Component} from "react";

export default class SearchForServicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://127.0.0.1:8080",
            name: "",
            data: []
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
        endpoint += "/api/application?name=" + name;
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
        const {data} = this.state;
        return (
            <div>
                <div>
                    <h1> Search for services by entering application name.</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input type="text" name="name" placeholder="Application name" onChange={this.handleChange}
                                   value={this.state.name}/>
                        </div>
                        <div>
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
                {data.map((item, index) =>
                    <div key={index}>
                        <h1>{item.name}</h1>
                        <div>
                            <p>type: {item.type}</p>
                            <p>subType: {item.subType}</p>
                            <p>description: {item.description}</p>
                            <p>lastModified: {item.lastModified}</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}