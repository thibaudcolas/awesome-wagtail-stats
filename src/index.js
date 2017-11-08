import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import App from './App';
import notes from './notes';
import pypinfo from './pypinfo';

import './index.css';

const apps = window.data.apps.map(a => {
    const downloads = pypinfo[a.pypi_package_name]
        ? pypinfo[a.pypi_package_name].reduce(
              (sum, count) => sum + count.download_count,
              0,
          )
        : null;

    return Object.assign(
        a,
        {
            downloads: downloads,
            detailed_downloads: pypinfo[a.pypi_package_name],
        },
        notes[a.pypi_package_name],
    );
});

const mount = document.getElementById('root');

ReactDOM.render(<App apps={apps} />, mount);
registerServiceWorker();
