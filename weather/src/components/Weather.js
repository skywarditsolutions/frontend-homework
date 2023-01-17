import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import axios from "axios";
import Accordion from "./Accordion";
import { getIcon } from "./helperFunctions";

export default function Weather() {
  const [lat, setLat] = useState(40.7597);
  const [lon, setLon] = useState(-73.9918);
  const [city, setCity] = useState("New York");
  const [country, setCountry] = useState("US");
  const [current, setCurrent] = useState({});
  const [zip, setZip] = useState(10036);
  let forecasts = [];
  const btnRef = useRef();
  const part = ["minutely"];
  const units = "imperial";
  const isMounted = useRef(false);
  const config = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    baseURL: "https://api.openweathermap.org",
    iconBaseURL: `http://openweathermap.org/img/wn`,
  };

  useEffect(() => {
    isMounted.current = true;
    getCoords(zip);
    getWeather(lat, lon);

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zip, lat, lon]);

  const handleSubmit = () => {
    const newZip = btnRef.current.value;
    setZip(newZip);
    getCoords(zip);
    getWeather(lat, lon);
  };

  const getCoords = (zip) => {
    axios
      .get("https://api.openweathermap.org/geo/1.0/zip", {
        params: {
          zip: zip,
          appid: config.apiKey,
        },
      })
      .then((coords) => {
        setLat(coords.data.lat);
        setLon(coords.data.lon);
        setCity(coords.data.name);
        setCountry(coords.data.country);
      })
      .catch((err) => {});
  };

  const getWeather = (lat, lon) => {
    axios
      .get("https://api.openweathermap.org/data/3.0/onecall", {
        params: {
          lat: lat,
          lon: lon,
          appid: config.apiKey,
          units: units,
          exclude: part,
        },
      })
      .then((wthr) => {
        let currWthr = {
          description: wthr.data.current.weather[0].description,
          currTemp: wthr.data.current.temp.toFixed(0),
          minTemp: wthr.data.daily[0].temp.min.toFixed(0),
          maxTemp: wthr.data.daily[0].temp.max.toFixed(0),
          iconUrl: `${config.iconBaseURL}/${wthr.data.current.weather[0].icon}@2x.png`,
          windSpeed: wthr.data.current.wind_speed,
          humidity: wthr.data.current.humidity,
          pressure: wthr.data.current.pressure,
          sunrise: wthr.data.current.sunrise,
          sunset: wthr.data.current.sunset,
          alerts: wthr.data.alerts ? wthr.data.alerts : "No alerts",
          dailies: wthr.data.daily,
        };

        setCurrent(currWthr);
      })
      .catch((err) => {});
  };

  const moreData = [
    {
      title: "View More",
      content: {
        windSpeed: current.windSpeed,
        humidity: current.humidity,
        pressure: current.pressure,
        sunrise: current.sunrise,
        sunset: current.sunset,
      },
    },
  ];

  const getForecasts = (dailies) => {
    forecasts = [];
    const days = { ...dailies };

    for (let i = 1; i <= 7; i++) {
      forecasts.push({
        description: days[i].weather[0].description,
        highTemp: days[i].temp.max.toFixed(0),
        lowTemp: days[i].temp.min.toFixed(0),
        icon: getIcon(
          `${config.iconBaseURL}/${days[i].weather[0].icon}@2x.png`
        ),
      });
    }

    return forecasts;
  };

  return (
    isMounted.current && (
      <>
        <div id="inputControls">
          <input
            className="input"
            type="text"
            placeholder="Zip code"
            ref={btnRef}
          />
          <button type="submit" onClick={handleSubmit}>
            Update Location
          </button>
        </div>

        <div className="accordion">
          <Accordion
            title={`Current weather for ${city}, ${country}`}
            content={[current]}
            sender="current"
          />
          <Accordion
            title={moreData[0].title}
            content={[moreData[0].content]}
            sender={"more"}
          />
          {current.alerts !== "No alerts" && (
            <>
              <Accordion
                title="Alerts"
                content={current.alerts}
                sender={"alerts"}
              />
            </>
          )}
          <Accordion
            title={"Forecast"}
            content={getForecasts(current.dailies)}
            sender={"forecast"}
          />
        </div>
      </>
    )
  );
}
