import { $authhost } from ".";
import { IBaggageCreateData } from "../components/Models/Baggage/BaggageCreateModal";
import { IBaggageEditData } from "../components/Models/Baggage/BaggageEditModal";

export const getBaggages = async () => {
    const { data } = await $authhost.get('api/Baggages')
    return data;
}

export const createBaggage = async (formData: IBaggageCreateData) => {
    const { data } = await $authhost.post('api/Baggages', formData)
    return data;
}

export const editBaggage = async (id: number, formData: IBaggageEditData) => {
    const { data } = await $authhost.put(`api/Baggages/${id}`, formData)
    return data;
}

export const deleteBaggage = async (id: number) => {
    const { data } = await $authhost.delete(`api/Baggages/${id}`)
    return data;
}
