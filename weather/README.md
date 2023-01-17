# Weather app
+ Responsive app that uses [Open Weather API](https://openweathermap.org/api) to display current weather along with 7 day forecast.
+ The default location set to New York, NY (specifically 10036 zip code)but the user can change the location by US zip code
+ Upon loadingm the app:
+ Shows the "current" conditions for New York:
  + Location (ie. New York, US)
  + Current weather description (ie. sunny)
  + Current temperature
  + Today's high temperature
  + Today's low temperature
+ The user can also toggle the 'View More' accordion to view:
    + Wind Speed
    + Humidity
    + Pressure
    + Sunrise/Sunset Time
+ The app also shows the 7 Day forecast and if there are alerts for a specific location (tested with 92025 on Jan 16, 2023) the those will be displayed as well. If there are no alerts the accordion for them is hidden.

# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## App dependencies

This app uses axios to access the OpenWeatherMap API.
To install axios, in the project directory, type:

### `npm install axios`

## Running the app

To run, in the project directory, type:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.