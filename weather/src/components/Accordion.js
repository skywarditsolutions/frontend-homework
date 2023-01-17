import React, { useState } from "react";
import "./Weather.css";
import { convertDateFromUTC, getDayOfWeek, getIcon } from "./helperFunctions";

const Accordion = ({ title, content, sender }) => {
  const [isActive, setIsActive] = useState(true);

  switch (sender) {
    case "more":
      return (
        <div className="accordion-item">
          <div
            className="accordion-title"
            onClick={() => setIsActive(!isActive)}
          >
            <div>
              {title}
              {"  "}
              {isActive ? "\u22C0" : "\u22C1"}
            </div>
          </div>
          {isActive && (
            <div className="accordion-content">
              {content.map((value, index) => {
                return (
                  <div className="row" key={index}>
                    <h5>Wind Speed: {value.windSpeed}</h5>
                    <h5>Humidity: {value.humidity}%</h5>
                    <h5>Pressure: {value.pressure}</h5>
                    <h5>Sunrise: {convertDateFromUTC(value.windSpeed)}</h5>
                    <h5>Sunset: {convertDateFromUTC(value.sunset)}</h5>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    case "alerts":
      return (
        <div className="accordion-item">
          <div
            className="accordion-title"
            onClick={() => setIsActive(!isActive)}
          >
            <div>
              {title}
              {"  "}
              {isActive ? "\u22C0" : "\u22C1"}
            </div>
          </div>
          {isActive && (
            <div className="accordion-content">
              {content.map((value, index) => {
                return (
                  <div className="row" key={index}>
                    <h4>{value.event}</h4>
                    <p>
                      From {convertDateFromUTC(value.start)} Until{" "}
                      {convertDateFromUTC(value.end)}
                    </p>
                    <h5>{value.sender_name}</h5>
                    <br />
                    <h5>{value.description}</h5>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    case "forecast":
      let newDate = new Date();
      let day = newDate.getDay() + 1;

      return (
        <div className="accordion-item">
          <div
            className="accordion-title"
            onClick={() => setIsActive(!isActive)}
          >
            <div>
              {title}
              {"  "}
              {isActive ? "\u22C0" : "\u22C1"}
            </div>
          </div>
          {isActive && (
            <div className="accordion-content">
              {content.map((value, index) => {
                return (
                  <div className="row" key={index}>
                    <ul>
                      <li>
                        <h5>{getDayOfWeek((day += 1))}</h5>
                        <p>
                          {value.icon}
                          {value.description}
                        </p>
                        <h5>
                          High {value.highTemp}
                          {"\u00B0"}
                          {"\u2004"}
                          Low {value.lowTemp}
                          {"\u00B0"}
                        </h5>
                        <br />
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    default:
      return (
        <div className="accordion-item" aria-expanded="true">
          <div
            className="accordion-title"
            onClick={() => setIsActive(!isActive)}
          >
            <div>
              {title}
              {"  "}
              {isActive ? "\u22C0" : "\u22C1"}
            </div>
          </div>
          {isActive && (
            <div className="accordion-content">
              {content.map((value, index) => {
                return (
                  <div className="row" key={index}>
                    <p>
                      {getIcon(value.iconUrl)}
                      {value.description}
                    </p>
                    <p>
                      Currently {value.currTemp}
                      {"\u00B0"}
                    </p>

                    <h5>
                      High {value.maxTemp}
                      {"\u00B0"}
                      {"\u2004"}
                      Low {value.minTemp}
                      {"\u00B0"}
                    </h5>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
  }
};

export default Accordion;

