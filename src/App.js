import "./App.css";
import { useState, useEffect } from "react";
import { useRef } from "react";

export default function App() {
  const [currency, setCurrency] = useState([]);
  const refer = useRef(null);
  const detail = useRef(null); // zatim nevyuzita promenna

  const handleClick = (event) => {
    const index = event.currentTarget.id;
    console.log(index);
    const found = currency[index]; // nalezena korespondujici data k dane mene, ty chci pote zobrazit do druheho okna jako detail meny
    console.log(found);
  };

  const getApiData = () => {
    fetch(
      "https://webapi.developers.erstegroup.com/api/csas/public/sandbox/v2/rates/exchangerates?web-api-key=c52a0682-4806-4903-828f-6cc66508329e"
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
                    <tr
                      id={index}
                      ref={refer}
                      class="curr"
                      onClick={handleClick}
                    >
                      <td>{data.country}</td>
                      <td>{data.shortName}</td>
                      <td>{data.name}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <div id="window" class="col-md-5">
            {/* zde bude pote detail */}
          </div>
        </div>
      </div>
    </div>
  );
}
