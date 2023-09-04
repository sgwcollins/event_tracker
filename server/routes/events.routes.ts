import * as express from "express";
import {
  createEvent,
  exportEvents,
  getAllEvents,
  getDeviceType,
  getEventNames,
} from "../controller/events.controller";
const router = express.Router();

router.post("/events", async (req: express.Request, res: express.Response) => {
  return await createEvent(req, res);
});

router.get("/events", async (req: express.Request, res: express.Response) => {
  try {
    return await getAllEvents(req, res);
  } catch (err) {
  
    return res.status(500).json({ message: `Internal Server Error`, error: err });
  }
});

router.get("/event-names", async (req: express.Request, res: express.Response) => {
  try {
    return await getEventNames(req, res);
  
  } catch (err) {
 
    return res.status(500).json({ message: `Internal Server Error`, error: err });
  }
});

router.get("/events/device-types", async (req: express.Request, res: express.Response) => {
  try {
   return await getDeviceType(req, res);

  } catch (err) {
 
    return res.status(500).json({ message: `Internal Server Error`, error: err });
  }
});

router.get("/events/export", async (req: express.Request, res: express.Response) => {
  try {
   return await exportEvents(req, res);

  } catch (err) {
 
    return res.status(500).json({ message: `Internal Server Error`, error: err });
  }
});


export default router;
