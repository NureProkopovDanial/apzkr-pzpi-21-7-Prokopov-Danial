import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { createPassenger } from '../../../http/passengerApi';


interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
  }
  
  export interface IPassengerCreateData {
    firstName: string,
    lastName: string,
    passportNumber: string,
    dateOfBirth: string,
    nationality: string,
    contactNumber: string,
    email: string,
  }

export const PassengerCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IPassengerCreateData>();
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IPassengerCreateData) => {
        await createPassenger(data)
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
