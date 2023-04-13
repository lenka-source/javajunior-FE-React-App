import "./App.css";
import { useState, useEffect } from "react";

function RenderDetail(found) {
  return (
    <>
      {/* <p>{JSON.stringify(found)}</p> */}

      <h5>{found.found.country} - {found.found.shortName} - {found.found.name}</h5>
      <table class="table ">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">amount</th>
            <th scope="col">valBuy</th>
            <th scope="col">valSell</th>
            <th scope="col">valMid</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{found.found.name}</td>
            <td>{found.found.amount}</td>
            <td>{found.found.valBuy}</td>
            <td>{found.found.valSell}</td>
            <td>{found.found.valMid}</td>
          </tr>
        </tbody>
      </table>
      <table class="table ">
        <thead>
          <tr>
            <th scope="col">currBuy</th>
            <th scope="col">currSell</th>
            <th scope="col">currMid</th>
            <th scope="col">cnbMid</th>
            <th scope="col">ecbMid</th>
            <th scope="col">move</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{found.found.currBuy}</td>
            <td>{found.found.currSell}</td>
            <td>{found.found.currMid}</td>
            <td>{found.found.cnbMid}</td>
            <td>{found.found.ecbMid}</td>
            <td>{found.found.move}</td>
          </tr>
        </tbody>
      </table>
      <h6>version: {found.found.version}</h6>
    </>
  );
}

export default function App() {
  const [currency, setCurrency] = useState([]);
  const [detail, setDetail] = useState(null);
  console.log(typeof currency);

  const handleClick = (event) => {
    const index = event.currentTarget.id;
    const found = currency[index]; // nalezena korespondujici data k dane mene, ty chci pote zobrazit do druheho okna jako detail meny
    setDetail(found);
  };

  const getApiData = () => {
    fetch("http://localhost:8080/usedb?use=true")
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

          <div id="window" class="col-md-6 text-break">
            <p class="text-justify" id="detail">
              {detail !== null ? (
                <RenderDetail found={detail} />
              ) : (
                "Click for detail"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
