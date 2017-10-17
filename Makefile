.PHONY: clean-pyc init help test-ci
.DEFAULT_GOAL := help

help: ## See what commands are available.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36mmake %-15s\033[0m # %s\n", $$1, $$2}'

init: clean-pyc ## Install dependencies and initialise for development.
	pip install --upgrade pip
	pip install -r requirements.txt

generate: ## Generate the web page from the fetched data.
	python generate.py

update:
	/usr/local/bin/s3cmd put index.html s3://wheelpackages/index.html  --cf-invalidate \
	--add-header='Cache-Control: max-age=30' \
	--add-header='Date: `date -u +"%a, %d %b %Y %H:%M:%S GMT"`'
	/usr/local/bin/s3cmd put results.json s3://wheelpackages/results.json  --cf-invalidate \
	--add-header='Cache-Control: max-age=30' \
	--add-header='Date: `date -u +"%a, %d %b %Y %H:%M:%S GMT"`'
	/usr/local/bin/s3cmd put wheel.svg s3://wheelpackages/wheel.svg  --cf-invalidate \
	--add-header='Cache-Control: max-age=30' \
	--add-header='Date: `date -u +"%a, %d %b %Y %H:%M:%S GMT"`'
	/usr/local/bin/s3cmd put wheel.css s3://wheelpackages/wheel.css  --cf-invalidate \
	--add-header='Cache-Control: max-age=30' \
	--add-header='Date: `date -u +"%a, %d %b %Y %H:%M:%S GMT"`'
