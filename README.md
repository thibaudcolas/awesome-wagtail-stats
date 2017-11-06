## [Awesome Wagtail stats](https://thibaudcolas.github.io/awesome-wagtail-stats) [![Build Status](https://travis-ci.org/thibaudcolas/awesome-wagtail-stats.svg?branch=master)](https://travis-ci.org/thibaudcolas/awesome-wagtail-stats)

> [Awesome Wagtail](https://github.com/springload/awesome-wagtail) package statistics

See it live at **[https://thibaudcolas.github.io/awesome-wagtail-stats](https://thibaudcolas.github.io/awesome-wagtail-stats)**

## Why

This project is a compilation of information from [Awesome Wagtail](https://github.com/springload/awesome-wagtail), [Can I Use Python 3?](https://github.com/brettcannon/caniusepython3), and [pypinfo](https://github.com/ofek/pypinfo) to determine the state of Wagtail's third-party plugins ecosystem with respect to Python 3 support.

Under the hood, it relies on:

- The Awesome Wagtail API (https://springload.github.io/awesome-wagtail/api/v1/readme.json), to list packages to check.
- [Python 3 trove classifiers](https://github.com/brettcannon/caniusepython3#how-do-you-tell-if-a-project-has-been-ported-to-python-3) in packages and their dependencies, for _Can I Use Python 3?_ to assess compatibility.
- PyPI's [BigQuery dataset](https://bigquery.cloud.google.com/dataset/the-psf:pypi) to retrieve download statistics for packages.
- [Travis](https://travis-ci.org/) and [GitHub Pages](https://pages.github.com/), for automation and hosting.

## Inspired by

- http://py3readiness.org/
- https://github.com/chhantyal/py3readiness
