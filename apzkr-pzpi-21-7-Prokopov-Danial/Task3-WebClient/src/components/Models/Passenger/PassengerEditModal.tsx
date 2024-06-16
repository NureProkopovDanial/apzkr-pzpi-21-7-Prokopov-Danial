import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { editPassenger } from '../../../http/passengerApi';
import { IPassenger } from '../../../interfaces/IPassenger';
import { IPassengerCreateData } from './PassengerCreateModal';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IPassenger,
}
  
  export interface IPassengerEditData extends IPassengerCreateData {
    passengerId: number,
  }

export const PassengerEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IPassengerEditData>();
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IPassengerEditData) => {
        await editPassenger(data.passengerId, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
      };

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
                  <label className="control-label">First name</label>
                  <Controller
                    control={control}
                    name={"firstName"}
                    rules={{
                      required: "enter first name",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.firstName?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Last name</label>
                  <Controller
                    control={control}
                    name={"lastName"}
                    rules={{
                      required: "enter last name",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.lastName?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Passport number</label>
                  <Controller
                    control={control}
                    name={"passportNumber"}
                    rules={{
                      required: "enter passport number",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.passportNumber?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Nationality</label>
                  <Controller
                    control={control}
                    name={"nationality"}
                    rules={{
                      required: "enter nationality",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.nationality?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Contact number</label>
                  <Controller
                    control={control}
                    name={"contactNumber"}
                    rules={{
                      required: "enter contact number",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.contactNumber?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Email</label>
                  <Controller
                    control={control}
                    name={"email"}
                    rules={{
                      required: "enter email",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.email?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Date of birth</label>
                  <Controller
                    control={control}
                    name={"dateOfBirth"}
                    rules={{
                      required: "enter date",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="date" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.dateOfBirth?.message}</p>
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
