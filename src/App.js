import React, { useState } from "react";
import axios from "axios";

const ClickCounter = () => {
  const [clickCount, setClickCount] = useState(0);
  const [countryClicks, setCountryClicks] = useState([]);

  const handleClick = async () => {
    setClickCount(clickCount + 1);

    try {
      const response = await axios.get(
        "https://ipapi.co/json/"
      );
      const country = response.data.country_name;
      const countryCode = response.data.country;
      const newCountryClicks = [...countryClicks];
      const existingCountry = newCountryClicks.find(
        (country) => country.countryCode === countryCode
      );
      if (existingCountry) {
        existingCountry.count += 1;
      } else {
        newCountryClicks.push({ countryCode, countryName: country, count: 1 });
      }
      setCountryClicks(newCountryClicks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Click Counter</h1>
      <button onClick={handleClick}>Click Me!</button>
      <p>Click Count: {clickCount}</p>
      <table>
        <thead>
          <tr>
            <th>Country Code</th>
            <th>Country Name</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {countryClicks.map((country) => (
            <tr key={country.countryCode}>
              <td>{country.countryCode}</td>
              <td>{country.countryName}</td>
              <td>{country.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClickCounter;
