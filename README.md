# Globefetcher 🌍

<hr>

This repository contains code for a simple web application, Globe Fetcher, designed to fetch and display country data.  
The application is built using HTML, CSS, and vanilla JavaScript.

## Files Included:

- index.html: Defines the structure of the web page and includes necessary metadata.
- style.css: Contains the styles for the web page layout and elements.
- script.js: Implements the functionality of fetching and rendering country data.

## Features:

- Fetches country data using a custom API (https://countries-api-836d.onrender.com) based on the country name.
- Displays country details such as name, flag, region, population, official language, and currency.
- Fetches and displays data for a neighboring country of the selected country.

## Dependencies:

No external libraries are used. The application relies solely on native JavaScript and Fetch API for data retrieval.

## How to Use:

- Clone this repository to your local machine.
- Open index.html in a web browser.
- Click the "Where am I?" button to see country information, including a neighboring country if available.

## Fetching Neighboring Country:

When a country is selected by clicking the "Where am I?" button, the application fetches data for the chosen country.
If the selected country has neighboring countries, the application automatically retrieves data for the first neighboring country.
Neighboring country data is fetched asynchronously and displayed alongside the selected country's information.
