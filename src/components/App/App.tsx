import React, { useEffect } from "react";
import TicketList from "../TicketList";
import { aia } from "../../assets/aia";
import SiderFilter from "../SiderFilter/SiderFilter";
import TicketStore from "../../stores/TicketStore";
import { observer } from "mobx-react-lite";
import "./App.css";
import { Footer } from "../Footer/Footer";

const App = observer(() => {
  useEffect(() => {
    TicketStore.ticketsLoad();
  }, []);

  return (
    <section className={"section-wrapper"}>
      <header className={"header-main"}>
        <img
          src={`data:image/svg+xml,${encodeURIComponent(aia)}`}
          alt="logotip"
        />
      </header>
      <main className={"content-wrapper"}>
        <aside className="aside-wrapper">
          <SiderFilter />
        </aside>
        <div className={"main-wrapper"}>
          <TicketList />
          {!TicketStore._isLoading && <Footer />}
        </div>
      </main>
    </section>
  );
});

export default App;
