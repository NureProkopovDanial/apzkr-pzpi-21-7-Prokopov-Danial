import { IFlight } from "./IFlight";
import { IPassenger } from "./IPassenger";

export interface ITicket {
    ticketId: number,
    passengerId: number,
    passenger: IPassenger,
    flightId: number,
    flight: IFlight,
    price: number,
}