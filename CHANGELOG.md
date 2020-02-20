# Release Notes

## 3.2.1 (2020-02-20)
### Fixed
- Fix an issue where sorting is not working when the closest match of the query is at the end of the search string.

## 3.2.0 (2020-02-18)
### Added
- `module` is now registered in the `package.json`. 

## 3.1.0 (2020-01-22)
### Added
- Support for numeric values.

## 3.0.2 (2019-10-27)
### Fixed
- Upgrade packages as some packages contained security issues.

## 3.0.1 (2018-01-09)
### Fixed
- Umd template for Node.

## 3.0.0 (2018-12-26)
### Changed
- Sorting now prefers keys close together rather than at the beginning of the string.

## 2.2.0 (2018-12-26)
### Added
- Keys parameter can now be omitted and configuration can be passed along in it's place.

## 2.1.0 (2018-06-07)
### Changed
- Allow empty haystacks

## 2.0.1 (2017-10-17)
### Changed
- Make it really zero dependencies again (https://github.com/wouter2203/fuzzy-search/pull/30)

### Fixed
- Travis CI (https://github.com/wouter2203/fuzzy-search/pull/29)

## 2.0.0 (2017-09-15)
### Changed
- The way it sorts
  - It now boosts scores of items that are exact matches
  - It now boosts scores of items that start with they query

## 1.5.0 (2017-09-15)
### Changed
- Update build tool
- Update eslinter

### Removed
- Uncompressed compiled JavaScript

## v1.4.0 (2016-11-20)

### Added
- ESLint to check code style.

### Fixed
- Errors reported by ESLint.

## v1.3.8 (2016-11-20)

### Fixed
- Hide my saucelabs api key.

## v1.3.7 (2016-11-20)

### Fixed
- Fix readme file.

## v1.3.6 (2016-11-20)

### Added
- A changelog.

### Changed
- Show the build status of the master branch.
- Improved README.
