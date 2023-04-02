import React from "react";
import { observer } from "mobx-react-lite";
import { ITicket } from "../../interfaces/ITicket";
import TicketStore from "../../stores/TicketStore";
import OneTicket from "../OneTicket/OneTicket";
import { Spin, Radio } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./TicketList.css";

const antIcon = (
  <LoadingOutlined
    className="imgSpin"
    style={{
      fontSize: 70,
    }}
    spin
  />
);

const TicketList = observer(() => {
  const handlerByPrice = () => {
    TicketStore.sortTicketsByPrice();
  };
  const handlerByDur = () => {
    TicketStore.sortByDuration();
  };

  return (
    <>
      <Radio.Group
        className="filter-group"
        defaultValue="a"
        buttonStyle="solid"
        size="large"
      >
        <Radio.Button
          onClick={handlerByPrice}
          className="filter-button"
          value="a"
        >
          Самый дешевый
        </Radio.Button>
        <Radio.Button
          onClick={handlerByDur}
          className="filter-button"
          value="b"
        >
          Самый быстрый
        </Radio.Button>
      </Radio.Group>

      {TicketStore._filters.length ? (
        <li className={"ticketList"}>
          {TicketStore._isLoading ? (
            <Spin indicator={antIcon} delay={0} />
          ) : (
            TicketStore._showedTickets.map((ticket: ITicket) => (
              <OneTicket
                price={ticket.price}
                carrier={ticket.carrier}
                segments={ticket.segments}
                key={crypto.randomUUID()}
              />
            ))
          )}
        </li>
      ) : null}
    </>
  );
});

export default TicketList;
