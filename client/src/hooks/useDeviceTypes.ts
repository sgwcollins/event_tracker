import { useQuery } from "react-query";
import createRequest from "../constants/createRequest";
import { API_GET_deviceTypes } from "../constants/requestOptions";

const fetchDeviceTypes = async () => {
  try {
    const response = await createRequest(API_GET_deviceTypes());
    return response.data;
  } catch (error) {
    // throw new Error(error?.response?.data.message);
  }
};

const useDeviceTypes = () =>
  useQuery(["device-types"], () => fetchDeviceTypes(), {
    keepPreviousData: true,
  });

export { useDeviceTypes, fetchDeviceTypes };
