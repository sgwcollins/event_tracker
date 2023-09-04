import { Request, Response } from "express";
import { Events } from "../models/events.model";
import { write } from 'fast-csv';
import { flattenObj } from "../utils/utils.helper";

export const getAllEvents = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  const filters: any = {};

  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;
  const eventName = req.query.eventName as string;

  if (eventName) {
    filters["eventName"] = eventName;
  }

  if (startDate || endDate) {
    filters["timestamp"] = {};

    if (startDate) {
      filters["timestamp"]["$gte"] = new Date(startDate);
    }

    if (endDate) {
      filters["timestamp"]["$lte"] = new Date(endDate);
    }
  }

  try {
    const events = await Events.find(filters)
      .sort({ timestamp: -1 }) // Sort by timestamp in descending order
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await Events.countDocuments(filters);

    return res.status(200).json({
      events,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const events = req.body;
    if (!Array.isArray(events)) {
      return res.status(400).json({ message: "Event is not an array" });
    }
    await Events.insertMany(events); // req.body contains the event data from the client
    return res.status(200).json({ message: "Event is successfull updated" });
  } catch (error) {
    return res.status(500).json({ message: `Error creating events ${error}` });
  }
};

export const getEventNames = async (req: Request, res: Response) => {
  const { search } = req.query;

  let pipeline = [];

  if (search) {
    // If a search query is provided, add a $match stage to the pipeline
    pipeline.push({
      $match: {
        eventName: new RegExp(search as string, "i"), // Case-insensitive search
      },
    });
  }

  pipeline.push(
    {
      $group: {
        _id: "$eventName",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        value: "$_id",
        count: 1,
        _id: 0,
      },
    }
  );

  try {
    const eventNames = await Events.aggregate(pipeline);

    const totalEvents = await Events.countDocuments();

    const resultWithPercentages = eventNames.map((event) => ({
      ...event,
      percentage: ((event.count / totalEvents) * 100).toFixed(2) + "%",
    }));

    res.status(200).json(resultWithPercentages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. Failed to fetch event names" });
  }
};

export const getDeviceType = async (req: Request, res: Response) => {
  try {
    const aggregatedData = await Events.aggregate([
      {
        $group: {
          _id: "$deviceInfo.device_type",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          value: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    const totalDevices = await Events.countDocuments();

    const resultWithPercentages = aggregatedData.map((event) => ({
      ...event,
      percentage: ((event.count / totalDevices) * 100).toFixed(2) + "%",
    }));

    return res.status(200).json(resultWithPercentages);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Failed to aggregate data." });
  }
};

export const exportEvents = async (req: Request, res: Response) => {
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;

  let dateFilter: { $gte?: Date; $lte?: Date } = {};

  if (startDate) {
    dateFilter.$gte = new Date(startDate);
  }

  if (endDate) {
    dateFilter.$lte = new Date(endDate);
  }

  try {
    const eventsInRange = await Events.find(
      dateFilter.$gte || dateFilter.$lte ? { date: dateFilter } : {}
    )
      .lean()
      .exec();

    // Set headers to indicate this is a CSV response
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=events-${startDate}-to-${endDate}.csv`
    );
    const flattenedEvents = eventsInRange.map(event => flattenObj(event));
    // Stream the events as CSV
    write(flattenedEvents, { headers: true }).pipe(res);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error. Exporting Data." });
  }
};
