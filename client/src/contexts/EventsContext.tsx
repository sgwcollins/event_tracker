import { FC, useState, createContext, PropsWithChildren, useMemo, useCallback, useEffect } from "react";
import { useEvents } from "../hooks/useEvents";
import { UseQueryResult } from "react-query";
import { fetchEventNames } from "../hooks/useEventNames";
import type { Dayjs } from 'dayjs';

export interface Item {
  key: React.Key;
  _id: string;
  eventName: string;
  type: string
  location: string;
  timestamp: string;
};


export interface AggregateItems {
  count: number;
  [key: string]: string | number;
};



export interface EventData {
  events: Item[],
  currentPage: number,
  totalPages: number,
}

export interface Filter {
  page: number,
  limit: number,
  startDate: string | Dayjs | null,
  endDate:  string | Dayjs | null,
  eventName: string,
}

export interface EventContextType {
  data: UseQueryResult<EventData> | null;
  eventNames: AggregateItems[]
  updateFilters: (key: string, value: number | string | null | (Dayjs | null)[]) => void;
  getEventNames: (q: string) => void;
}

export const EventContext = createContext<EventContextType | null>(null);

const EventContextProvider: FC<PropsWithChildren> = ({ children }) => {

  const [filters, setFilters] = useState<Filter>({
    page: 1,
    limit: 10,
    startDate: "",
    endDate: "",
    eventName: "",
  });

  const [eventNames, setEventNames] = useState<AggregateItems[]>([]);

  const data = useEvents(filters);
  const getEventNames = useCallback(async (q: string) => {
    const items = await fetchEventNames(q)
    setEventNames(items)
  }, [])


  const updateFilters = useCallback((key: string, value: number | string | null | (Dayjs | null)[]) => {

    if (key === 'date') {
      if (value && typeof value !== 'number') {
        const [startDate, endDate] = value;
    
        setFilters({
          ...filters,
          startDate: startDate ,
          endDate: endDate ,
        })
      } else {
        setFilters({
          ...filters,
          startDate: "",
          endDate: "",
        })
      }
      return;
    } else {

      setFilters({
        ...filters,
        [key]: value
      })

      return;
    }

  }, [filters])



  const value = useMemo(() => ({
    data,
    updateFilters,
    getEventNames,
    eventNames,
  }), [data, updateFilters, getEventNames, eventNames])





  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  )
};

export default EventContextProvider;