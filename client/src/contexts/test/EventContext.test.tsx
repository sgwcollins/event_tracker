import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { useEvents } from '../../hooks/useEvents';
import EventContextProvider, { EventContext, Filter } from '../EventsContext';
import { fetchEventNames } from '../../hooks/useEventNames';
import dayjs, { Dayjs } from 'dayjs';


jest.mock("../../hooks/useEvents", () => ({
  useEvents: jest.fn()
}));

jest.mock("../../hooks/useEventNames", () => ({
  useEventNames: jest.fn(),
  fetchEventNames: jest.fn()
}));

const mockSetState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react') as any,
  useState: jest.fn(init => [init, mockSetState]),
}));


describe("EventContextProvider", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });


  it("should provide initial state values", () => {
    let contextValue;
    render(
      <EventContextProvider>
        <EventContext.Consumer>
          {(context) => {
            contextValue = context;
            return null;
          }}
        </EventContext.Consumer>
      </EventContextProvider>
    );

    expect(contextValue).toHaveProperty("data");
    expect(contextValue).toHaveProperty("updateFilters");
    expect(contextValue).toHaveProperty("getEventNames");
    expect(contextValue).toHaveProperty("eventNames");
    // ... additional checks for initial state values ...
  });


  it('updates filters correctly', () => {

 
    
    let updateContextFilters: ((key: string, value: number | string | null | (Dayjs | null)[]) => void) | undefined;
    const Wrapper = () => {
      return (
        <EventContextProvider>
          <EventContext.Consumer>
            {(value) => {
              updateContextFilters = value?.updateFilters;
              return null;
            }}
          </EventContext.Consumer>
        </EventContextProvider>
      );
    };

    render(<Wrapper />);



    // Testing the date filter first
    act(() => {
      if (updateContextFilters) {
        updateContextFilters('date', [dayjs("2022-01-01"), dayjs("2022-01-31")]);
      }
    });
    // Testing other filters
    act(() => {
      if (updateContextFilters) {
        updateContextFilters('page', 5);
      }
    });

    expect(mockSetState).toHaveBeenCalledWith(expect.objectContaining({
      startDate: dayjs("2022-01-01"),
      endDate: dayjs("2022-01-31")
    } as Filter));

    expect(mockSetState).toHaveBeenCalledWith(expect.objectContaining({
      page: 5
    } as Filter));

  }


  )
});

