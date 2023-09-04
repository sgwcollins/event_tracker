import createRequest from "../constants/createRequest";
import {
  API_GET_eventExport,

} from "../constants/requestOptions";


const fetchEventsExport = async (startDate = "", endDate = "") => {
  try {
    const response = await createRequest({
      ...API_GET_eventExport(startDate, endDate),
      responseType: "blob",
    });

    const blob: Blob = new Blob([response.data], { type: "text/csv" });
    const downloadUrl: string = window.URL.createObjectURL(blob);
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = downloadUrl;
    link.download = `events-${startDate || "begin"}-to-${endDate || "end"}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove(); // clean up
  } catch (error) {
    // throw new Error(error?.response?.data.message);
  }
};

export { fetchEventsExport };
