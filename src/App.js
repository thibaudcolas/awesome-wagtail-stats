import React from 'react';
import './App.css';

const App = ({ apps }) => {
    const rows = apps.sort((app, other) => {
        const categorySort = app.category.localeCompare(other.category);

        if (app.downloads && other.downloads !== null) {
            return other.downloads > app.downloads ? 1 : -1;
        } else if (app.downloads !== null) {
            return 1;
        } else if (other.downloads !== null) {
            return 1;
        }

        return categorySort;
    });

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
                            <th>
                                <abbr title="installs over the last 30 days, as reported by https://github.com/ofek/pypinfo">
                                    Downloads
                                </abbr>
                            </th>
                            <th>Notes</th>
                            <th>Link</th>
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
                                            <code>{app.pypi_package_name}</code>
                                        </a>
                                    )}
                                </td>
                                <td>{app.downloads}</td>
                                <td>{app.notes}</td>
                                <td>
                                    {app.notes_link && (
                                        <a href={app.notes_link}>
                                            {app.notes_link.replace(
                                                'https://github.com/',
                                                '',
                                            )}
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default App;
