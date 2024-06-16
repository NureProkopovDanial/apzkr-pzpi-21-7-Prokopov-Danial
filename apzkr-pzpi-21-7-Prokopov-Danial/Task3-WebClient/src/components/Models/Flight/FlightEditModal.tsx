import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getAircrafts } from '../../../http/aircraftApi';
import { getAirports } from '../../../http/airportApi';
import { editFlight } from '../../../http/flightApi';
import { IAircraft } from '../../../interfaces/IAircraft';
import { IAirport } from '../../../interfaces/IAirport';
import { IFlight } from '../../../interfaces/IFlight';
import { ISelect } from '../../../interfaces/ISelect';
import { IFlightCreateData } from './FlightCreateModal';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IFlight,
}
  
  export interface IFlightEditData extends IFlightCreateData {
    flightId: number,
  }

export const FlightEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IFlightEditData>();
      const [airports, setAirports] = useState<IAirport[]>([]);
      const [aircarfts, setAircarfts] = useState<IAircraft[]>([]);
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IFlightEditData) => {
        await editFlight(data.flightId, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
      };
    
    const fetchAirports = async () => {
        await getAirports().then((data) => setAirports(data));
      };

      const fetchAircrafts = async () => {
        await getAircrafts().then((data) => setAircarfts(data));
      };
    
      useEffect(() => {
        fetchAirports();
        fetchAircrafts();
      }, []);
    
      const selectAirports = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...airports.map((airport) => {
            return {
              value: airport.airportId.toString(),
              label: `Id: ${airport.airportId}, Name: ${airport?.name}`,
            };
          }),
        ];
      }, [airports]);

      const selectAircrafts = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...aircarfts.map((aircarft) => {
            return {
              value: aircarft.aircraftId.toString(),
              label: `Id: ${aircarft.aircraftId}, Name: ${aircarft?.modelName}`,
            };
          }),
        ];
      }, [aircarfts]);

    return (
        <Modal show={show} onHide={onHide}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  asp-validation-summary="ModelOnly"
                  className="text-danger"
                ></div>
                 <div className="form-group">
                  <label className="control-label">Flight number</label>
                  <Controller
                    control={control}
                    name={"flightNumber"}
                    rules={{
                      required: "enter flight number",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.flightNumber?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Notes</label>
                  <Controller
                    control={control}
                    name={"notes"}
                    rules={{
                      required: "enter notes",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.notes?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Departure date time</label>
                  <Controller
                    control={control}
                    name={"departureDateTime"}
                    rules={{
                      required: "enter departure date time",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.departureDateTime?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Arrival date time</label>
                  <Controller
                    control={control}
                    name={"arrivalDateTime"}
                    rules={{
                      required: "enter arrival date time",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.arrivalDateTime?.message}</p>
                </div>
                <div className="form-group">
                <label className="control-label">Departure airport</label>
                <Controller
                  control={control}
                  name={"departureAirportId"}
                  rules={{
                    required: "enter airport",
                    validate: (data) => (data != 0 ? undefined : "Select airport"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectAirports.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.departureAirportId?.message}</p>
              </div>
                <div className="form-group">
                <label className="control-label">Arrival airport</label>
                <Controller
                  control={control}
                  name={"arrivalAirportId"}
                  rules={{
                    required: "enter airport",
                    validate: (data) => (data != 0 ? undefined : "Select airport"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectAirports.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.arrivalAirportId?.message}</p>
              </div>
                <div className="form-group">
                <label className="control-label">Aircraft</label>
                <Controller
                  control={control}
                  name={"aircraftId"}
                  rules={{
                    required: "enter aircraft",
                    validate: (data) => (data != 0 ? undefined : "Select aircraft"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectAircrafts.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.aircraftId?.message}</p>
              </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
      )
}
