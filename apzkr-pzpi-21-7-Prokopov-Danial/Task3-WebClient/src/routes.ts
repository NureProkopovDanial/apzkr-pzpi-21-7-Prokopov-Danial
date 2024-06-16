import { ComponentType } from "react";
import { AIRCRAFTS_ROUTE, AIRPORTS_ROUTE, BAGGAGES_ROUTE, FLIGHTS_ROUTE, MAIN_ROUTE, PASSENGERS_ROUTE, TICKETS_ROUTE } from "./consts";
import { Aircrafts } from "./pages/Aircrafts";
import { Airports } from "./pages/Airports";
import { Baggages } from "./pages/Baggages";
import { Flights } from "./pages/Flights";
import { MainPage } from "./pages/MainPage";
import { Passengers } from "./pages/Passengers";
import { Tickets } from "./pages/Tickets";

interface RouteData {
    path: string,
    Component: ComponentType,
}

export const applicationRoutes: RouteData[] = [
    { path: MAIN_ROUTE, Component: MainPage },
    { path: AIRCRAFTS_ROUTE, Component: Aircrafts },
    { path: AIRPORTS_ROUTE, Component: Airports },
    { path: BAGGAGES_ROUTE, Component: Baggages },
    { path: FLIGHTS_ROUTE, Component: Flights },
    { path: PASSENGERS_ROUTE, Component: Passengers },
    { path: TICKETS_ROUTE, Component: Tickets },
    
]