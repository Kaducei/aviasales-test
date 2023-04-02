import React from "react";
import { Button } from "antd";
import TicketStore from "../../stores/TicketStore";
import { observer } from "mobx-react-lite";
import { Alert } from "antd";
export const Footer = observer(() => {
  return (
    <>
      {TicketStore._filters.length ? (
        <Button
          className="filter-button"
          onClick={() => {
            TicketStore.showMoreTickets();
          }}
          size="large"
          type="primary"
          block
        >
          Показать ещё 5 билетов
        </Button>
      ) : (
        <Alert message="You need to select filters" type="info" showIcon />
      )}
    </>
  );
});
