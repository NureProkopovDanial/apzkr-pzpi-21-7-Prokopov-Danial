import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getAircrafts } from '../../../http/aircraftApi';
import { getAirports } from '../../../http/airportApi';
import { createFlight } from '../../../http/flightApi';
import { IAircraft } from '../../../interfaces/IAircraft';
import { IAirport } from '../../../interfaces/IAirport';
import { ISelect } from '../../../interfaces/ISelect';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
  }
  
  export interface IFlightCreateData {
    flightNumber: string,
    departureDateTime: string,
    arrivalDateTime: string,
    departureAirportId: number,
    arrivalAirportId: number,
    aircraftId: number,
    notes: string,
  }

export const FlightCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IFlightCreateData>();
      const [airports, setAirports] = useState<IAirport[]>([]);
      const [aircarfts, setAircarfts] = useState<IAircraft[]>([]);
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IFlightCreateData) => {
        await createFlight(data)
          .then(() => {
            handleClose();
            fetch();
          }).catch(() => alert("Error"));
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
        <Modal show={show} onHide={handleClose}>
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
                <Button variant="secondary" onClick={handleClose}>
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

