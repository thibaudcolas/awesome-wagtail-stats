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
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
                {apps.length !== 0 && (
                    <table>
                        <tbody>
                            {apps.map((app, i) => (
                                <tr key={i}>
                                    <td>{app.name}</td>
                                    <td>{app.supports_py3 ? 'Py3' : ':('}</td>
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
