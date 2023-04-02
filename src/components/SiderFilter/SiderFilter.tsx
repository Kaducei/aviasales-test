import React from "react";
import TicketStore from "../../stores/TicketStore";
import { Checkbox } from "antd";
import { observer } from "mobx-react-lite";
import "./SiderFilter.css";

const plainOptions = [
  "Без пересадок",
  "1 пересадка",
  "2 пересадки",
  "3 пересадки",
];
const CheckboxGroup = Checkbox.Group;

const SiderFilter = observer(() => {
  return (
    <>
      <label className="checkBox-label">Количество пересадок</label>
      <Checkbox
        className="ant-checkbox-wrapper"
        onChange={() => TicketStore.filterToggleAll()}
        indeterminate={
          !!TicketStore._filters.length &&
          TicketStore._filters.length < plainOptions.length
        }
        checked={TicketStore._filters.length === plainOptions.length}
      >
        Все
      </Checkbox>

      <CheckboxGroup
        className="checkBoxGroup"
        //@ts-ignore
        onClick={(e) => {
          TicketStore.filterToggle(e.target.value);
        }}
        value={TicketStore._filters}
        options={plainOptions}
      />
    </>
  );
});
export default SiderFilter;
