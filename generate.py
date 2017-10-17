# -*- coding: utf-8 -*-

from __future__ import absolute_import, unicode_literals

import codecs
import json
import requests
from caniusepython3.pypi import supports_py3

IGNORE = None

PYPI_NAMES_OVERRIDES = {
    'wagtail-geo-widget': 'wagtailgeowidget',
    # Not available on pypi, last updated 2 years ago.
    'wagtail-markdown': IGNORE,
    'wagtailblocks': 'wagtailcommonblocks',
    'wagtail-svgmap': 'wagtail_svgmap',
    # Not available on pypi, last updated 2 years ago.
    'wagtail-yubikey': IGNORE,
    # Not available on pypi, last updated 4 years ago, only supports Wagtail 0.2.
    'wagtail-saleor': IGNORE,
    'wagtail-embedvideos': 'wagtail-embed-videos',
    'wagtail-alt-generator': 'wagtailaltgenerator',
    'wagtail-filepreviews': 'wagtaildocs_previews',
}


def parse_pypi_package_name(full_name, url):
    name = full_name

    if 'github.com' in url:
        name = url.split('github.com/')[1].split('/')[1]
    elif 'readthedocs.org' in url:
        name = url.split('.readthedocs.org')[0].replace('http://', '')

    if name in PYPI_NAMES_OVERRIDES:
        name = PYPI_NAMES_OVERRIDES[name]

    return name


def parse_app(line, category):
    name = line.split('](')[0][3:]
    description = line.split(') ')[1][2:]
    url = line.split('](')[1].split(') ')[0]

    return {
        'name': name,
        'pypi_package_name': parse_pypi_package_name(name, url),
        'description': description,
        'url': url,
        'category': category,
    }


def parse_awesome_wagtail_apps():
    r = requests.get('https://rawgit.com/springload/awesome-wagtail/master/README.md')
    app_section = r.text.split('## Apps')[1].split('## Tools')[0]
    app_sections = app_section.split('### ')[1:]

    apps = []

    for section in app_sections:
        split_section = section.split('\n\n')
        section_title = split_section[0]

        for line in split_section[1].split('\n'):
            app = parse_app(line, section_title)

            if app['pypi_package_name']:
                apps.append(app)

    return apps



if __name__ == '__main__':
    apps = parse_awesome_wagtail_apps()

    for app in apps:
        app['supports_py3'] = supports_py3(app['pypi_package_name'])

    with codecs.open('./public/data.json', 'w', 'utf-8') as file:
        file.write(json.dumps({
            'apps': apps,
        }, indent=True))


