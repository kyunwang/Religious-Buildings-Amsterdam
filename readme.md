# Religious buildings in Amsterdam

A one week project using `SparQL` for OBA(Openbare Bibliotheek Amsterdam)

Prototyping and testing the new experimental API using RDF from OBA. As goal to show what is possible to do with their linked data.

*Developed using Chrome for ESNext features*

- *SparQL*: Read *Sparkle*
- RDF: Resource Description Framework
- Bibliotheek: Library

![preview image of the prototype](https://github.com/kyunwang/Religious-Buildings-Amsterdam/blob/master/readme-files/preview.png)

## Getting started
How to get started working with this repo.

1. First clone the repo
`https://github.com/kyunwang/Religious-Buildings-Amsterdam.git`

2. Navigate to the cloned repo and app directory

3. Run `npm i` to install the dependencies

4. Well let's get started shall we?

### Bundling
If you want to bundle/transpile the Javascript run `npm run bundle` and a `bundle.js` file will appear in `scripts/bundle.js`

## Schedule in short
Start Monday March 5th - End Friday March 9th

**Monday: Kick-off**
- Half day kick-off
- Brainstorming for ideas
- Testing API & SparQL
- Basic setup of this readme made

**Tuesday**
- Trying out SparQL and OBA API, but misses the information I need, so I went for WikiData.
- Cleaning coordinates
- Map using Google maps and adding markers
- Using Leaflet instead of Google maps now
- Markers on Leaflet map

**Wednesday**
- Generate filter checkboxes
- Added filter function based on the type of building
- Super simple custom markers added

**Thursday**
- Failed making a 3d map using wrld.js (no 3d map of Amsterdam available)
- Change from Leaflet to MapBox
- Some basic styling
- Fixing Data duplicates (images) and flattened them
- Generated random build and demolish years to iillustrate a feature

**Friday**: Three hours left to work
- Some fixes
- Quick basic styling
- Attempted CSS Grid but not suited for this case
- Basic detail info added for buildings
- Freeze for presentations

**Saturday**
- Quick responsiveness fixes
- Bundle script made for transpiling the JS
