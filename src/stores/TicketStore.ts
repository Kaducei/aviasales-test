/* eslint-disable import/no-anonymous-default-export */
import { makeAutoObservable } from "mobx";
import { ITicket } from "../interfaces/ITicket";
import { tickets } from "./MockTickets";

class TicketsStore {
  _tickets: ITicket[] = [];
  _currentTickets: ITicket[] = [];
  _showedTickets: ITicket[] = [];
  _isLoading: boolean = false;
  _isCheap: boolean = true;
  _ticketCount: number = 0;
  _filters: string[] = [
    "Без пересадок",
    "1 пересадка",
    "2 пересадки",
    "3 пересадки",
  ];

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  filterToggleAll() {
    this._filters =
      this._filters.length < 4
        ? ["Без пересадок", "1 пересадка", "2 пересадки", "3 пересадки"]
        : [];
    this._isCheap ? this.sortTicketsByPrice() : this.sortByDuration();
    this.transferFilter();
  }

  filterToggle(payload: string) {
    if (payload === null || payload === undefined) {
      return;
    }

    const index = this._filters.indexOf(payload);
    if (index === -1) {
      this._filters = [...this._filters, payload];
    } else {
      this._filters = [
        ...this._filters.slice(0, index),
        ...this._filters.slice(index + 1),
      ];
    }
    this._isCheap ? this.sortTicketsByPrice() : this.sortByDuration();
    this.transferFilter();
  }

  transferFilter() {
    if (this._filters.length) {
      this._currentTickets = this._currentTickets.filter(({ segments }) => {
        const [segment1, segment2] = segments;

        if (this._filters.includes("Без пересадок")) {
          if (segment1.stops.length === 0 || segment2.stops.length === 0) {
            return true;
          }
        }

        if (this._filters.includes("1 пересадка")) {
          if (segment1.stops.length === 1 || segment2.stops.length === 1) {
            return true;
          }
        }

        if (this._filters.includes("2 пересадки")) {
          if (segment1.stops.length === 2 || segment2.stops.length === 2) {
            return true;
          }
        }

        if (this._filters.includes("3 пересадки")) {
          if (segment1.stops.length === 3 || segment2.stops.length === 3) {
            return true;
          }
        }

        return false;
      });
    }
    this._showedTickets = this._currentTickets.slice(
      this._ticketCount,
      this._ticketCount + 5
    );
  }

  ticketsLoad() {
    this._isLoading = true;
    new Promise<ITicket[]>((resolve) => {
      setTimeout(() => {
        resolve(tickets);
        this._tickets = tickets;
        this._currentTickets = this._tickets;
        this.sortTicketsByPrice();
        this.transferFilter();
      }, 1500);
    }).then(() => {
      this._isLoading = false;
    });
  }

  showMoreTickets() {
    this._ticketCount += 5;
    this._showedTickets = [
      ...this._showedTickets,
      ...this._currentTickets.slice(this._ticketCount, this._ticketCount + 5),
    ];
  }

  sortTicketsByPrice() {
    this._ticketCount = 0;

    this._isCheap = true;
    this._currentTickets = this._tickets
      .slice()
      .sort((a, b) => a.price - b.price);

    this._showedTickets = this._currentTickets.slice(
      this._ticketCount,
      this._ticketCount + 5
    );
    this.transferFilter();
  }
  sortByDuration() {
    this._ticketCount = 0;

    this._isCheap = false;
    this._currentTickets = this._tickets.slice().sort((a, b) => {
      // Находим длительность полета для каждого билета
      const aDuration = a.segments.reduce(
        (acc, segment) => acc + segment.duration,
        0
      );
      const bDuration = b.segments.reduce(
        (acc, segment) => acc + segment.duration,
        0
      );

      // Сравниваем длительность полета для каждого билета
      if (aDuration < bDuration) {
        return -1;
      } else if (aDuration > bDuration) {
        return 1;
      } else {
        return 0;
      }
    });

    this._showedTickets = this._currentTickets.slice(
      this._ticketCount,
      this._ticketCount + 5
    );
    this.transferFilter();
  }
}

export default new TicketsStore();
