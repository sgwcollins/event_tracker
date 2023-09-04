import { createRequestOpts } from "./createRequest";
import { EVENTS_URL, EVENT_DEVICES_URL, EVENT_EXPORT_URL, EVENT_NAMES_URL } from "./endpoints";

const GET = "GET";

export const API_GET_events = (filters: {}): createRequestOpts => ({
  query: {
    ...filters,
  },
  method: GET,
  url: EVENTS_URL,
});

export const API_GET_eventNames = (query: string): createRequestOpts => ({
  query: {
    search: query,
  },
  method: GET,
  url: EVENT_NAMES_URL,
});

export const API_GET_eventExport = (
  startDate: string,
  endDate: string
): createRequestOpts => ({
  query: {
    startDate: startDate,
    endDate: endDate,
  },
  method: GET,
  url: EVENT_EXPORT_URL,
});

export const API_GET_deviceTypes = (): createRequestOpts => ({
  method: GET,
  url: EVENT_DEVICES_URL,
});
