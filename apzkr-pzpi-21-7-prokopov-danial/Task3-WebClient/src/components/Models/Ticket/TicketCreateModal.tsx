import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getFlights } from '../../../http/flightApi';
import { getPassengers } from '../../../http/passengerApi';
import { createTicket } from '../../../http/ticketApi';
import { IFlight } from '../../../interfaces/IFlight';
import { IPassenger } from '../../../interfaces/IPassenger';
import { ISelect } from '../../../interfaces/ISelect';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
  }

  export interface ITicketCreateData {
    passengerId: number,
    flightId: number,
    price: number,
  }

export const TicketCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<ITicketCreateData>();
      const [passengers, setPassengers] = useState<IPassenger[]>([]);
      const [flights, setFlights] = useState<IFlight[]>([]);
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: ITicketCreateData) => {
        await createTicket(data)
          .then(() => {
            handleClose();
            fetch();
          }).catch(() => alert("Error"));
      };

      const fetchPassengers = async () => {
        await getPassengers().then((data) => setPassengers(data));
      };
      
      const fetchFlights = async () => {
        await getFlights().then((data) => setFlights(data));
      };
    
      useEffect(() => {
        fetchPassengers();
        fetchFlights();
      }, []);
    
      const selectPassengers = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...passengers.map((passenger) => {
            return {
              value: passenger.passengerId.toString(),
              label: `Id: ${passenger.passengerId}, First and last name: ${passenger.lastName} ${passenger.firstName}`,
            };
          }),
        ];
      }, [passengers]);

      const selectFlights = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...flights.map((flight) => {
            return {
              value: flight.flightId.toString(),
              label: `Id: ${flight.flightId}, Number: ${flight.flightNumber}`,
            };
          }),
        ];
      }, [flights]);

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
                  <label className="control-label">Price</label>
                  <Controller
                    control={control}
                    name={"price"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      required: "enter price",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.price?.message}</p>
                </div>
                <div className="form-group">
                <label className="control-label">Passenger</label>
                <Controller
                  control={control}
                  name={"passengerId"}
                  rules={{
                    required: "enter passenger",
                    validate: (data) => (data != 0 ? undefined : "Select passenger"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectPassengers.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.passengerId?.message}</p>
              </div>
                <div className="form-group">
                <label className="control-label">Flight</label>
                <Controller
                  control={control}
                  name={"flightId"}
                  rules={{
                    required: "enter flight",
                    validate: (data) => (data != 0 ? undefined : "Select flight"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectFlights.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.flightId?.message}</p>
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
