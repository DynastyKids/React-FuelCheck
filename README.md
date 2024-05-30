# React FuelCheck

* Deprecated: This project is nolonger maintained, site will only operated with CakePHP4 framework, available on [GitHub](https://github.com/DynastyKids/CakePHP4-fuelcheck)
* Replacement Notice: The GitHub page is nolonger maintained, use [PHP site](https://fuel.0xjoy.com/) to check latest fuel price

This is an react build application for checking fuel prices for Australia.

[![pages-build-deployment](https://github.com/DynastyKids/React-FuelCheck/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/DynastyKids/React-FuelCheck/actions/workflows/pages/pages-build-deployment)[![Node.js CI](https://github.com/DynastyKids/React-FuelCheck/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/DynastyKids/React-FuelCheck/actions/workflows/node.js.yml)[![Dependency Review](https://github.com/DynastyKids/React-FuelCheck/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/DynastyKids/React-FuelCheck/actions/workflows/dependency-review.yml)

## About
This is an unofficial web app, and is in no way connected with the any state Government. Data are corrected when pulled and synchorized at certain interval.

It's currently hosted on [GitHub Pages](https://dynastykids.github.io/React-FuelCheck/) with Beta version.

# Updates

## Dec 2022 Update
 - Adding partial datasource for VIC and ACT (It's now having most stations covered)
 - Adding E85 datasource for NSW only

## May 2022 Updates
 - Adding Brand selections on navigation bar
 - Brand selection will affect user's view and current cheapest station text in view
 - Merging Opal 91 (Low Aromatic Fuel) with showing together with standard unleaded 91
 - Fixing some icons showing issues
 
## April 2022 Updates
 - Adding fuel type filter on navigation bar
 - Adding some stations for State Gov API unavailable area (VIC, QLD and ACT) through 3rd sources.
 - Adding 91 Opal (Low Aromatic Fuel) display support [#3](https://github.com/DynastyKids/React-FuelCheck/pull/3)
 - Adding navigate with Google Map option in popup window
 - Showing current mapview's cheapest station (Require user to select fuel type) [#4](https://github.com/DynastyKids/React-FuelCheck/pull/4)
 - SA and QLD Data is now available for evaluation testing as data sources are unstable.
 - Changing pins icon to each brand icons

## Future developments & Notices
1. ~~Adding fuel type filter for selection~~ [#2](https://github.com/DynastyKids/React-FuelCheck/pull/2)
2. ~~Adding each brands icon on pins~~
3. ~~Looking possibilities for accessing API and display infos for NT, SA, QLD, VIC, ACT~~
4. Adding AdBlue available locations
5. Adding Terminal Gate Price for reference (Pump price are different by store and supplier)

Any suggestions / stars / pull requests are welcome.
