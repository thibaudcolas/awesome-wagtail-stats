# -*- coding: utf-8 -*-

from __future__ import absolute_import, unicode_literals

import codecs
import json
import requests
import logging
from caniusepython3.pypi import supports_py3

logging.basicConfig()

PYPI_NAMES_OVERRIDES = {
    'wagtail-geo-widget': 'wagtailgeowidget',
    'wagtail-markdown': None,
    'wagtailblocks': 'wagtailcommonblocks',
    'wagtail-svgmap': None,
    'wagtail-yubikey': None,
    'wagtail-embedvideos': 'wagtail-embed-videos',
    'wagtail-alt-generator': 'wagtailaltgenerator',
    'wagtail-filepreviews': 'wagtaildocs_previews',
}


def parse_pypi_package_name(app):
    name = app['name']

    if 'github.com' in app['url']:
        name = app['url'].split('github.com/')[1].split('/')[1]
    elif 'readthedocs.org' in app['url']:
        name = app['url'].split('.readthedocs.org')[0].replace('http://', '')

    if name in PYPI_NAMES_OVERRIDES:
        name = PYPI_NAMES_OVERRIDES[name]

    return name


if __name__ == '__main__':
    r = requests.get(
        'https://springload.github.io/awesome-wagtail/api/v1/readme.json')
    payload = json.loads(r.text)
    apps = payload['apps']

    for app in apps:
        app['pypi_package_name'] = parse_pypi_package_name(app)

        if app['pypi_package_name']:
            app['supports_py3'] = supports_py3(app['pypi_package_name'])
        else:
            app['supports_py3'] = False

    with codecs.open('./src/data.js', 'w', 'utf-8') as file:
        file.write("export default %s;" % json.dumps({
            'apps': apps,
        }, indent=True))
