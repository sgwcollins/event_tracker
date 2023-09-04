import { Button, DatePicker, Table, TablePaginationConfig } from "antd";
import { SelectInput } from "../../components/select/Select";
import { useContext, useState } from "react";
import { EventContext, EventContextType } from "../../contexts/EventsContext";
import { flattenObj } from "../../utils/utils.helper";
import { columns } from "../../constants/columns";
import type { Dayjs } from 'dayjs';
import { fetchEventsExport } from "../../hooks/useEventExport";

export const EventsTable = () => {
  const { data, eventNames, updateFilters, getEventNames } = useContext(EventContext) as EventContextType;

  const [isLoading, setLoading] = useState(false);

  const { RangePicker } = DatePicker;

  function onChange(dates: null | (Dayjs | null)[]) {
    updateFilters('date', dates)
  }

  function handleChange(value: string) {
    updateFilters('eventName', value)
  }

  const handleTableChange = (pager: TablePaginationConfig) => {
    updateFilters('page', pager?.current || 1)
  };

  const download = async () => {
    setLoading(true)
    await fetchEventsExport()
    setLoading(false)
  }


  if (!data) return null;
  return (
    <>
      <div className="flex gap-12 py-6">
        <div>
          <RangePicker data-testid="date-picker" onChange={onChange} />

        </div>

        <div>
          <SelectInput handleSearch={getEventNames} data={eventNames} placeholder="Event Names" style={{ width: 180 }} onSelect={handleChange} />
        </div>
        <div>
          <Button loading={isLoading} type="link" onClick={download}>Export</Button>
        </div>


      </div>



      <Table
        rowKey={record => record._id}
        onRow={() => {
          return {
            className: 'hover:cursor-pointer', // apply Tailwind utility class for cursor
          };
        }}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: (record) => {

            return (
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(flattenObj(record)).map(([key, value]) => (
                  <div className="p-1 relative cursor-pointer group inline-flex" key={key}>
                    <strong>{key}:&nbsp;</strong>
                    <span className="truncate block" title="Your full text here for accessibility">
                      {value}

                    </span>
                    <div className="absolute left-0 mt-2 p-2 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {value}
                    </div>

                  </div>
                ))}
              </div>
            )
          },
        }}
        pagination={{
          current: data?.data?.currentPage,
          pageSize: 10,
          showSizeChanger: false,
          total: data?.data?.totalPages // Assuming there are 50 records in total for this example
        }}
        onChange={handleTableChange} dataSource={data?.data?.events || []} columns={columns} />

    </>
  )
}