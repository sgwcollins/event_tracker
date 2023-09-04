import { useQuery } from "react-query";
import createRequest from "../constants/createRequest";
import { API_GET_eventNames } from "../constants/requestOptions";

const fetchEventNames = async (query:string) => {
  try {
    const response = await createRequest(API_GET_eventNames(query));
    return response.data;
  } catch (error) {
    // throw new Error(error?.response?.data.message);
  }
};

const useEventNames = (query:string) =>
  useQuery(["event-names", query], () => fetchEventNames(query), {
    keepPreviousData: true,
  });

export { useEventNames, fetchEventNames };
