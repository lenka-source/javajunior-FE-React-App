import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [currency, setCurrency] = useState([]);

  // const renderDetail = (foundData) => {
  //    return foundData.name
  // }

  const handleClick = (event) => {
    const index = event.currentTarget.id;
    const found = currency[index]; // nalezena korespondujici data k dane mene, ty chci pote zobrazit do druheho okna jako detail meny
    document.getElementById("detail").innerHTML = JSON.stringify(found);
  };

  const getApiData = () => {
    fetch(
      "http://localhost:8080/usedb?use=false"
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrency(data);
      });
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div>
      <div class="container">
        <div class="row d-flex justify-content-around">
          <div id="window" class="col-md-5">
            <table class="table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Currency</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currency.map((data, index) => (
                  <>
                    <tr id={index} class="curr" onClick={handleClick}>
                      <td>{data.country}</td>
                      <td>{data.shortName}</td>
                      <td>{data.name}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <div id="window" class="col-md-5 text-break">
            <p class="text-justify" id="detail">click for detail</p>
          </div>
        </div>
      </div>
    </div>
  );
}
