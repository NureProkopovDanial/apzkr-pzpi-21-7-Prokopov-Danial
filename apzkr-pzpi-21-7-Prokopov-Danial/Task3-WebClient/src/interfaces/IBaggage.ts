import { IFlight } from "./IFlight";
import { IPassenger } from "./IPassenger";

export interface IBaggage {
    baggageId: number,
    passengerId: number,
    passenger: IPassenger,
    flightId: number,
    flight: IFlight,
    weight: number,
    width: number,
    height: number,
    depth: number,
    description: string
}