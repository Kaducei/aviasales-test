import React from "react";
import { observer } from "mobx-react-lite";
import { ITicket } from "../../interfaces/ITicket";
import "./OneTicket.css";
import { transfers, formatDate } from "../Functions/Functions";

const OneTicket: React.FC<ITicket> = observer(({ price, carrier, segments }) => {
  return (
    <ul key={crypto.randomUUID()} className={"ticket"}>
      <header>
        <h2>{price.toLocaleString("ru-RU")} ₽</h2>
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="#" />
      </header>
      {segments.map((segment) => {
        const { origin, destination, duration, stops, date } = segment;
        return (
          <div
            className={"infoFirstLine"}
            key={`${origin}${destination}${duration}${stops}${date}`}
          >
            <div>
              <div className={"ticketInfo"}>
                {origin} - {destination}
              </div>
              <div className={"ticketValue"}>{formatDate(date, duration)}</div>
            </div>
            <div>
              <div className={"ticketInfo"}>в пути</div>
              <div className={"ticketValue"}>{`${Math.floor(
                duration / 60
              )}h ${Math.floor(duration % 60)}m`}</div>
            </div>
            <div className={"lastInfo"}>
              <div className={"ticketInfo"}>{transfers(stops.length)}</div>
              <div className={"ticketValue"}>
                {stops.length ? stops.join(", ") : "-"}
              </div>
            </div>
          </div>
        );
      })}
    </ul>
  );
});
export default OneTicket;
