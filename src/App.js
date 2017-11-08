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
                <a
                    href="https://thibaudcolas.github.io/awesome-wagtail-stats"
                    className="u-block"
                >
                    <h1 className="App-title">Awesome Wagtail Stats</h1>
                </a>
            </header>
            <div className="container">
                <h2>What is this about?</h2>
                <p>
                    This is a compilation of information from {' '}
                    <a href="https://github.com/springload/awesome-wagtail">
                        Awesome Wagtail
                    </a>,{' '}
                    <a href="https://github.com/brettcannon/caniusepython3">
                        Can I Use Python 3?
                    </a>, and{' '}
                    <a href="https://github.com/ofek/pypinfo">pypinfo</a> to
                    determine the state of Wagtail's third-party plugins
                    ecosystem with respect to Python 3 support.
                </p>
                {rows.length !== 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Package</th>
                                <th>Py3</th>
                                <th>Downloads</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((app, i) => (
                                <tr key={app.url}>
                                    <td>
                                        <a href={app.url}>{app.name}</a>
                                        {app.pypi_package_name && (
                                            <a
                                                href={`https://pypi.python.org/pypi/${app.pypi_package_name}`}
                                            >
                                                <code>
                                                    {' '}
                                                    ({app.pypi_package_name})
                                                </code>
                                            </a>
                                        )}
                                    </td>
                                    <td>
                                        {app.supports_py3 ? (
                                            <span aria-label="Yes!" role="img">
                                                ✓
                                            </span>
                                        ) : (
                                            <span aria-label="No :(" role="img">
                                                🙁
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {app.downloads && (
                                            <details>
                                                <summary>
                                                    {app.downloads}
                                                    <span className="summary-caret">
                                                        ▼
                                                    </span>
                                                </summary>
                                                <ul class="list-downloads">
                                                    {app.detailed_downloads.map(
                                                        count => (
                                                            <li
                                                                key={
                                                                    count.python_version
                                                                }
                                                            >
                                                                {`${count.python_version}: ${count.download_count}`}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </details>
                                        )}
                                    </td>
                                    <td>
                                        {app.notes_link && (
                                            <a href={app.notes_link}>
                                                {app.notes}
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default App;
