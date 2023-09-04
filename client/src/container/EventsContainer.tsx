import React, { FC, useState, } from "react";
import EventContextProvider from "../contexts/EventsContext";
import { EventsTable } from "../page/Table/table";
import { EventCharts } from "../page/Charts/charts";



type PageStateType = 'Events' | 'Charts';

const EventsContainer: FC = () => {

  const [pageState, setPageState] = useState<PageStateType>('Events');
  const onChangePageState = (state: PageStateType) => {
    setPageState(state)
  }

  return (
    <EventContextProvider>
      <div className="container mx-auto">
        <div className="flex gap-12 py-6 border-b border-gray-300">
          <h1 className={`text-4xl font-bold text-center text-gray-800 p-3 ${pageState === 'Events'  ? 'bg-blue-500 p-3 text-white underline rounded-[8px]' : ''}`}>
            <button onClick={() => onChangePageState('Events')}>
              Events
            </button>

          </h1>
          <h1 className={`text-4xl font-bold text-center text-gray-800 p-3 ${pageState === 'Charts'  ? 'bg-blue-500  text-white underline rounded-[8px]' : ''}`}>
            <button onClick={() => onChangePageState('Charts')}>
              Charts
            </button>
          </h1>
        </div>
        {pageState === 'Events' ? <EventsTable /> : <EventCharts />}


      </div>
    </EventContextProvider>
  );
}

export default EventsContainer;
