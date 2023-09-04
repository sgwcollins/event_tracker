import mongoose, { Document, Schema } from "mongoose";

// Define interfaces for our Mongoose model and document
interface DeviceInfo {
  device_type: string;
  browser: string;
  version: string;
  ip: string;
  timezone: string;
  country: string;
  region: string;
  city: string;
  isp: string;
  screenResolution: string;
}

interface CustomEventProperties {
  [key: string]: any;
}

interface EventAttributes {
  type: "page_view" | "custom_event";
  eventName?: string;
  eventProperties?: CustomEventProperties;
  timestamp: Date;
  location: string;
  deviceInfo: DeviceInfo;
}

interface EventDocument extends Document {
  type: EventAttributes["type"];
  eventName: string;
  eventProperties: CustomEventProperties;
  timestamp: Date;
  location: string;
  deviceInfo: DeviceInfo;
}

const DeviceInfoSchema: Schema = new Schema({
  device_type: { type: String, required: true },
  browser: { type: String, required: true },
  version: { type: String, required: true },
  ip: { type: String, required: true },
  timezone: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  city: { type: String, required: true },
  isp: { type: String, required: true },
  screenResolution: { type: String, required: true },
});

const EventSchema: Schema = new Schema({
  type: { type: String, enum: ["page_view", "custom_event"], required: true },
  eventName: { type: String },
  eventProperties: { type: Schema.Types.Mixed },
  timestamp: { type: Date, required: true },
  location: { type: String, required: true },
  deviceInfo: { type: DeviceInfoSchema, required: true },
});

const Events = mongoose.model<EventDocument>("Event", EventSchema);

export { Events, EventAttributes, DeviceInfo, CustomEventProperties };
