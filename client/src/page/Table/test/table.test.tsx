import { render, screen } from '@testing-library/react';
import { EventContext, EventContextType, EventData } from '../../../contexts/EventsContext';
import { EventsTable } from '../table';
import { UseQueryResult } from 'react-query';
import userEvent from '@testing-library/user-event';


window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  };
};


jest.mock("antd", () => ({
  ...jest.requireActual("antd"), // Import all actual antd exports
}));

describe('EventsTable component', () => {
  const mockContext: EventContextType = {
    data: null,
    eventNames: [],
    updateFilters: jest.fn(),
    getEventNames: jest.fn(),
  };

  it('renders without crashing', () => {
    render(
      <EventContext.Provider value={mockContext}>
        <EventsTable />
      </EventContext.Provider>
    );
  });

  it('updates filters when date is changed', () => {
    const mockContext: EventContextType = {
      data: {
        data: {
          events: [
            {
              key: "1",
              _id: "abc123",
              eventName: "Event A",
              type: "Type1",
              location: "Location A",
              timestamp: "2023-09-10T10:20:30Z",
            },
            {
              key: "2",
              _id: "def456",
              eventName: "Event B",
              type: "Type2",
              location: "Location B",
              timestamp: "2023-09-11T11:25:35Z",
            },
          ],
          currentPage: 1,
          totalPages: 2,

        },
        status: "success",
        error: null,
        isFetching: false,
      } as UseQueryResult<EventData>,
      eventNames: [
        { count: 5, name: "Event A" },
        { count: 3, name: "Event B" },
      ],
      updateFilters: jest.fn(),
      getEventNames: jest.fn(),
    };


    render(
      <EventContext.Provider value={mockContext}>
        <EventsTable />
      </EventContext.Provider>
    );

    const startDateInput = screen.getByPlaceholderText('Start date');
    userEvent.click(startDateInput) // select the datepicker
    userEvent.type(startDateInput, '2023-06-08')
    userEvent.type(startDateInput, '{enter}');
    const endDateInput = screen.getByPlaceholderText('End date');
    userEvent.type(endDateInput, '2023-06-08')
    userEvent.type(endDateInput, '{enter}');

    expect(mockContext.updateFilters).toHaveBeenCalled();
  });

});
