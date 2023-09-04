import mongoose from "mongoose";
import faker from "faker";
import { EventAttributes, Events } from "../models/events.model"; // Adjust the path to your model

const DB_URI =
  process.env.DATABASE_URL || "mongodb://localhost:27017/trackingDB"; // Update with your connection string

async function seedData(): Promise<void> {
  try {
    await mongoose.connect(DB_URI);
    const db = mongoose.connection;

    // Clean up previous data
    await db.collections["events"].drop();
    console.log("Dropped the events collection");

    const events: Array<object> = [];

    for (let i = 0; i < 10000; i++) {
      const eventName = faker.random.arrayElement([
        "Page Viewed",
        "Product Added To Cart",
        "Search Performed",
        "Post Liked",
        "Button Click"
      ]);

      let eventProperties:object = {}

      if(eventName === 'page_view'){
        eventProperties = {
          pageUrl: faker.internet.url(),
        }
      }

      const event: EventAttributes = {
        type: i % 2 === 0 ? "page_view" : "custom_event",
        eventName,
        eventProperties,
        timestamp: faker.date.recent(),
        location: faker.internet.url(),
        deviceInfo: {
          device_type: faker.random.arrayElement([
            "Desktop",
            "Mobile",
            "Tablet",
          ]),
          browser: faker.internet.userAgent(),
          version: faker.system.semver(),
          ip: faker.internet.ip(),
          timezone: faker.address.timeZone(),
          country: faker.address.country(),
          region: faker.address.state(),
          city: faker.address.city(),
          isp: faker.company.companyName(),
          screenResolution: `${faker.datatype.number({
            min: 1000,
            max: 4000,
          })}x${faker.datatype.number({ min: 600, max: 2000 })}`,
        },
      };
      if (event.type === "page_view") delete event?.eventProperties;

      events.push(event);
    }

    const data = await Events.insertMany(events);

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedData();
