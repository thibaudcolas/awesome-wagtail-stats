import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import App from './App';
import notes from './notes';
import pypinfo from './pypinfo';
import data from './data';

import './index.css';

const apps = data.apps.map(a => {
    const name = a.pypi_package_name;
    const downloads = pypinfo[name]
        ? pypinfo[name].reduce((sum, count) => sum + count.download_count, 0)
        : null;

    return Object.assign(
        a,
        {
            downloads: downloads,
            detailed_downloads: pypinfo[name],
        },
        notes[name],
    );
});

const mount = document.getElementById('root');

ReactDOM.render(<App apps={apps} />, mount);
registerServiceWorker();
