import { IAircraft } from "./IAircraft";
import { IAirport } from "./IAirport";

export interface IFlight {
    flightId: number,
    flightNumber: string,
    departureDateTime: string,
    arrivalDateTime: string,
    departureAirportId: number,
    departureAirport: IAirport,
    arrivalAirportId: number,
    arrivalAirport: IAirport,
    aircraftId: number,
    aircraft: IAircraft,
    notes: string,
}