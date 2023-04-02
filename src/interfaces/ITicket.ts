import { Segment } from "./ISegment";

export interface ITicket {
  price: number;
  carrier: string;
  segments: Segment[];
}
