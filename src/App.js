import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apps: [],
            pypinfo: {},
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
            .fetch('pypinfo.json')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    pypinfo: data,
                });
            });
    }

    render() {
        const { apps, pypinfo } = this.state;
        const hasPypinfo = Object.keys(pypinfo).length !== 0;
        let rows;

        if (hasPypinfo) {
            rows = apps
                .map(a => {
                    return Object.assign({}, a, {
                        downloads: pypinfo[a.pypi_package_name]
                            ? pypinfo[a.pypi_package_name].download_count
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
                {apps.length !== 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Package</th>
                                <th>Python 3</th>
                                <th>Pypi</th>
                                <th>Downloads</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((app, i) => (
                                <tr key={app.url}>
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
                                    <td>
                                        {pypinfo[app.pypi_package_name]
                                            ? pypinfo[app.pypi_package_name]
                                                  .download_count
                                            : null}
                                    </td>
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
