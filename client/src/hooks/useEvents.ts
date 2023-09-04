import { useQuery } from "react-query";
import createRequest from "../constants/createRequest";
import { API_GET_events } from "../constants/requestOptions";


const fetchEvents = async (filters: {}) => {
  if (!filters) return null;

  try {
    const response = await createRequest(API_GET_events(filters));
    return response.data;
  } catch (error) {
    // throw new Error(error?.response?.data.message);
  }
};

const useEvents = (filters: {}) =>
  useQuery(["events", filters], () => fetchEvents(filters), {
    keepPreviousData: true,
  });

export { useEvents, fetchEvents };
