import { serverConfig } from "./serverConfig";

const ENV_NAME = 'localhost'

export const BASE_URL = serverConfig[ENV_NAME].BASE_URL;

export const EVENTS_URL = `${BASE_URL}events`;
export const EVENT_NAMES_URL = `${BASE_URL}event-names`;
export const EVENT_DEVICES_URL = `${BASE_URL}events/device-types`;
export const EVENT_EXPORT_URL = `${BASE_URL}events/export`;