import { ColumnsType } from "antd/es/table";
import { Item } from "../contexts/EventsContext";
import { timeAgo } from "../utils/utils.helper";

export const columns: ColumnsType<Item> = [
  {
    title: "Event Name",
    dataIndex: "eventName",
    key: "eventName",
  },
  {
    title: "Event Type",
    dataIndex: "type",
    key: "type",
  },

  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
    render: (text: string) => {
      // Convert the ISO timestamp string to a Date object
      const date = new Date(text);
      // Format time ago 
      return timeAgo(date)
    }
  },
];
