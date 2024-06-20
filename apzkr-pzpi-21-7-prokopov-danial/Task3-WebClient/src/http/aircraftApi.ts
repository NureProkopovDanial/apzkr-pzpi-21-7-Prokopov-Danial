import { $authhost } from ".";
import { IAircraftCreateData } from "../components/Models/Aircraft/AircraftCreateModal";
import { IAircraftEditData } from "../components/Models/Aircraft/AircraftEditModal";

export const getAircrafts = async () => {
    const { data } = await $authhost.get('api/Aircraft')
    return data;
}

export const createAircraft = async (formData: IAircraftCreateData) => {
    const { data } = await $authhost.post('api/Aircraft', formData)
    return data;
}

export const editAircraft = async (id: number, formData: IAircraftEditData) => {
    const { data } = await $authhost.put(`api/Aircraft/${id}`, formData)
    return data;
}

export const deleteAircraft = async (id: number) => {
    const { data } = await $authhost.delete(`api/Aircraft/${id}`)
    return data;
}
