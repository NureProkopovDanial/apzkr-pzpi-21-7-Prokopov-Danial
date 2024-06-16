import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import { createAircraft } from '../../../http/aircraftApi';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
  }
  
  export interface IAircraftCreateData {
    manufacturer: string,
    modelName: string,
    maxCapacity: number,
    maxCargoCapacity: number
  }

export const AircraftCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IAircraftCreateData>();
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IAircraftCreateData) => {
        await createAircraft(data)
          .then(() => {
            handleClose();
            fetch();
          }).catch(() => alert("Error"));
      };
          
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
                  <label className="control-label">Manufacturer</label>
                  <Controller
                    control={control}
                    name={"manufacturer"}
                    rules={{
                      required: "enter manufacturer",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.manufacturer?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Model name</label>
                  <Controller
                    control={control}
                    name={"modelName"}
                    rules={{
                      required: "enter model name",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.modelName?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Max capacity</label>
                  <Controller
                    control={control}
                    name={"maxCapacity"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      required: "enter max capacity",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.maxCapacity?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Max cargo capacity</label>
                  <Controller
                    control={control}
                    name={"maxCargoCapacity"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      required: "enter max cargo capacity",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.maxCargoCapacity?.message}</p>
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
