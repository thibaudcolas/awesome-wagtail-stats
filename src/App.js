import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apps: [],
            notes: {},
        };
    }
    componentDidMount() {
        window
            .fetch('data.json')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    apps: data.apps,
                });
            });

        window
            .fetch('notes.json')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    notes: data,
                });
            });
    }

    render() {
        const { apps, notes } = this.state;
        const hasNotes = Object.keys(notes).length !== 0;
        let rows;

        if (hasNotes) {
            rows = apps
                .map(a => {
                    return Object.assign({}, a, {
                        downloads: notes[a.pypi_package_name]
                            ? notes[a.pypi_package_name].download_count
                            : null,
                    });
                })
                .sort((app, other) => {
                    const categorySort = app.category.localeCompare(
                        other.category,
                    );

                    if (app.downloads !== null || other.downloads !== null) {
                        if (other.downloads !== null) {
                            return app.downloads > other.downloads ? -1 : 1;
                        } else {
                            return -1;
                        }
                    }

                    return categorySort;
                });
        } else {
            rows = apps;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Awesome Wagtail stats</h1>
                </header>
                {rows.length !== 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Package</th>
                                <th>Python 3</th>
                                <th>PyPI</th>
                                <th>Downloads</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((app, i) => (
                                <tr key={app.url}>
                                    <td>
                                        <a href={app.url}>{app.name}</a>
                                    </td>
                                    <td>
                                        {app.supports_py3 ? (
                                            'Yes!'
                                        ) : (
                                            <span aria-label="No :(" role="img">
                                                😡
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {app.pypi_package_name && (
                                            <a
                                                href={`https://pypi.python.org/pypi/${app.pypi_package_name}`}
                                            >
                                                <code>
                                                    {app.pypi_package_name}
                                                </code>
                                            </a>
                                        )}
                                    </td>
                                    <td>{app.downloads}</td>
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
