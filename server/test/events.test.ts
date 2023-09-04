import faker from "faker";
import chai from "chai";
import request from "supertest";
import app from "../app";
import sinon from "sinon";
import { Events } from "../models/events.model";
import mongoose from "mongoose";

const { expect } = chai;

describe("GET events", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should return all events", async () => {
    // Mock event data

    const mockEvents = [
      { eventName: "event1", timestamp: "2023-09-04T15:35:14.083Z" },
    ];
    const mockQuery = {
      sort: sinon.stub().returnsThis(),
      skip: sinon.stub().returnsThis(),
      limit: sinon.stub().returns(mockEvents),
    } as unknown as mongoose.Query<any, any>;

    // Stub the find and countDocuments methods of Events model
    sinon.stub(Events, "find").callsFake(() => mockQuery);
    sinon.stub(Events, "countDocuments").resolves(1);

    // Use supertest to make a request to the endpoint
    const res = await request(app).get("/events");

    // Assertions
    expect(res.status).to.equal(200);
    expect(res.body.events).to.deep.equal([
      { eventName: "event1", timestamp: "2023-09-04T15:35:14.083Z" },
    ]);
    expect(res.body.totalPages).to.equal(1);
    expect(res.body.currentPage).to.equal(1);
  });

  it("should return events filtered by eventName", (done) => {
    const mockEvents = [
      {
        eventName: "event1",
        timestamp: new Date("2023-01-01T12:00:00.000Z"),
      },
      {
        eventName: "event2",
        timestamp: new Date("2023-01-02T12:00:00.000Z"),
      },
    ];

    const findStub = sinon.stub(Events, "find");

    findStub.withArgs().returns({
      sort: sinon.stub().returnsThis(), // Chainable
      skip: sinon.stub().returnsThis(), // Chainable
      limit: sinon.stub().returns([mockEvents[0]]),
    } as unknown as mongoose.Query<any, any>);

    request(app)
      .get("/events?eventName=event1")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.events[0].eventName).to.equal("event1");
        done();
      });
  });

  it("should return events filtered by timestamp", (done) => {
    const mockEvents = [
      {
        eventName: "event1",
        timestamp: new Date("2023-01-01T12:00:00.000Z"),
      },
      {
        eventName: "event2",
        timestamp: new Date("2023-01-02T12:00:00.000Z"),
      },
    ];

    const findStub = sinon.stub(Events, "find");
    findStub.returns({
      sort: sinon.stub().returnsThis(), // Chainable
      skip: sinon.stub().returnsThis(), // Chainable
      limit: sinon.stub().returns([mockEvents[0]]),
    } as unknown as mongoose.Query<any, any>);

    request(app)
      .get(
        "/events?startDate=2023-01-01T00:00:00.000Z&endDate=2023-01-01T23:59:59.999Z"
      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.events[0].timestamp).to.deep.equal(
          "2023-01-01T12:00:00.000Z"
        );
        done();
      });
  });
});

describe("GET eventNames", () => {
  afterEach(() => {
    sinon.restore(); // Restore all Sinon stubs after each test
  });

  it("should return aggregated events", async () => {
    const mockEvents = [
      { value: "EventA", count: 10, percentage: "50.00%" },
      { value: "EventB", count: 10, percentage: "50.00%" },
    ];

    sinon.stub(Events, "aggregate").resolves(mockEvents);
    sinon.stub(Events, "countDocuments").resolves(20);

    const res = await request(app).get("/event-names").send(mockEvents);

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(mockEvents);
  });

  it("should filter events based on search query", async () => {
    const mockEvents = [{ value: "EventA", count: 10, percentage: "50.00%" }];

    sinon.stub(Events, "aggregate").resolves(mockEvents);
    sinon.stub(Events, "countDocuments").resolves(20);

    const res = await request(app)
      .get("/event-names?search=EventA")
      .send(mockEvents);

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal([mockEvents[0]]);
    // Implementation similar to above but with a search query in `req.query`.
  });
  it("should handle errors during event creation", async () => {
    const mockEvents = [{ value: "EventA", count: 10, percentage: "50.00%" }];

    sinon
      .stub(Events, "aggregate")
      .rejects(new Error("Server error. Failed to fetch event names"));

    const res = await request(app)
      .get("/event-names") // Adjust the path
      .send(mockEvents);

    expect(res.status).to.equal(500);
    expect(res.body.message).to.equal(
      `Server error. Failed to fetch event names`
    );
  });
});

describe("GET deviceTypes", () => {
  afterEach(() => {
    sinon.restore(); // Restore all Sinon stubs after each test
  });

  it("should return aggregated deviceType", async () => {
    const mockData = [
      { value: "Desktop", count: 50, percentage: "50.00%" },
      { value: "Mobile", count: 50, percentage: "50.00%" },
    ];

    sinon.stub(Events, "aggregate").resolves([
      { value: "Desktop", count: 50 },
      { value: "Mobile", count: 50 },
    ]);
    sinon.stub(Events, "countDocuments").resolves(100);

    const res = await request(app).get("/events/device-types")

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(mockData);
  });


  it("should handle errors during event creation", async () => {
    const mockData = [
        { value: "Desktop", count: 50, percentage: "50%" },
        { value: "Mobile", count: 50, percentage: "50%" },
      ];

    sinon
      .stub(Events, "aggregate")
      .rejects(new Error("Server error. Failed to fetch event names"));

    const res = await request(app)
      .get("/event-names") // Adjust the path


    expect(res.status).to.equal(500);
    expect(res.body.message).to.equal(
      `Server error. Failed to fetch event names`
    );
  });
});

describe("POST events", () => {
  afterEach(() => {
    sinon.restore(); // Restore all Sinon stubs after each test
  });

  it("should successfully create events", async () => {
    const mockEvents = [{ name: "event1" }, { name: "event2" }];

    sinon.stub(Events, "insertMany").resolves();

    const res = await request(app)
      .post("/events") // Adjust the path
      .send(mockEvents);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Event is successfull updated");
  });

  it("should return 400 if events is not an array", async () => {
    const mockEvent = { name: "event1" };

    const res = await request(app)
      .post("/events") // Adjust the path
      .send(mockEvent);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Event is not an array");
  });

  it("should handle errors during event creation", async () => {
    const mockEvents = [{ name: "event1" }, { name: "event2" }];
    const errorMessage = "Some database error";

    sinon.stub(Events, "insertMany").rejects(new Error(errorMessage));

    const res = await request(app)
      .post("/events") // Adjust the path
      .send(mockEvents);

    expect(res.status).to.equal(500);
    expect(res.body.message).to.equal(
      `Error creating events Error: ${errorMessage}`
    );
  });
});
