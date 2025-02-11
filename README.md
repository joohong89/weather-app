# Weather Application
A simple weather application that retrieves and displays weather information based on user-provided city names.  This app features:

* **City Search:** Users can enter a city name to search for weather information.
* **Multiple Match Handling:** If multiple cities match the search query, the app presents a selection list, allowing the user to choose the desired location.
* **Detailed Weather Display:**  Once a city is selected, the app displays relevant weather information, such as temperature, conditions and humidity.
* **Search History:**  The app maintains a search history using local storage, allowing users to quickly access previously searched locations.

## Demo
https://weather-app-4q4.pages.dev

## Built Mainly With
* ReactJs
* React Router
* React Boostrap
* Axios
* Luxon

## Assumptions Made
* To use high-fidelity mockup as design
* Only English character can be searched
* Max content area to be 768px
* To use localstorage for API to store search history
* No need to minify and uglify
* No need to optimize image size
* Search History is allowed to go infinitely long
* Image to be changed to correspond with weather type


## For Future Development
* To use middleware for API call so API_KEY won't be exposed.
* To use typeahead instead of showing separate modal for country selection
* Fully customise bootstrap's theming
* Add visualisation for rainfall predictions for next few days
* Compare rainfall (or other parameters) of two locations
* Have separate `.env.prod` files
* Config file to store things like toast delay etc. 
* Localisation to prevent hardcoding words/sentences into page
* Update images (crop and resize with MS Paint ... )

# Development
`npm run dev`

# Build Dist
`npm run build`
