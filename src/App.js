import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apps: [],
        };
    }
    componentDidMount() {
        window
            .fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    apps: data.apps,
                });
            });
    }

    render() {
        const { apps } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Awesome Wagtail stats</h1>
                </header>
                {apps.length !== 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Package</th>
                                <th>Python 3</th>
                                <th>Pypi</th>
                                <th>Description</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apps.map((app, i) => (
                                <tr key={i}>
                                    <td>
                                        <a href={app.url}>{app.name}</a>
                                    </td>
                                    <td>{app.supports_py3 ? 'Yes!' : ':('}</td>
                                    <td>
                                        <a
                                            href={`https://pypi.python.org/pypi/${app.pypi_package_name}`}
                                        >
                                            <code>{app.pypi_package_name}</code>
                                        </a>
                                    </td>
                                    <td>{app.description}</td>
                                    <td>{app.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default App;