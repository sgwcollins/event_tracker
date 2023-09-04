
import { useEffect, useState } from "react";

import Chart from 'chart.js/auto';
import { useEventNames } from "../../hooks/useEventNames";
import { useDeviceTypes } from "../../hooks/useDeviceTypes";

export const EventCharts = () => {


    const [eventNamesChartData, setEventNamesChartData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });
    const [deviceNamesChartData, setDeviceNamesChartData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });

    const eventNameData = useEventNames('')
    const deviceTypeData = useDeviceTypes()

    useEffect(() => {
        if (eventNameData?.data?.length && !eventNamesChartData?.data?.length) {
            const labels = eventNameData.data.map((item: any) => item.value);
            const counts = eventNameData.data.map((item: any) => item.count);
            setEventNamesChartData({ labels, data: counts });
        }
    }, [eventNamesChartData?.data?.length, eventNameData])

    useEffect(() => {
        if (deviceTypeData?.data?.length && !deviceNamesChartData?.data?.length) {
            const labels = deviceTypeData.data.map((item: any) => item.value);
            const counts = deviceTypeData.data.map((item: any) => item.count);
            setDeviceNamesChartData({ labels, data: counts });
        }
    }, [deviceNamesChartData?.data?.length, deviceTypeData])


    useEffect(() => {
        if (eventNamesChartData.labels.length && eventNamesChartData.data.length) {
            const ctx = (document.getElementById('eventPie') as HTMLCanvasElement)
            const colors = [
                '#a6cee3',
                '#1f78b4',
                '#b2df8a',
                '#33a02c',
                '#fb9a99',
                '#e31a1c',
                '#fdbf6f',
                '#ff7f00',
                '#cab2d6',
                '#6a3d9a'
            ];
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: eventNamesChartData.labels,
                    datasets: [{
                        data: eventNamesChartData.data,
                        backgroundColor: colors, // Add more colors if needed
                    }],
                },
            });
        }
    }, [eventNamesChartData]);


    useEffect(() => {
        if (deviceNamesChartData.labels.length && deviceNamesChartData.data.length) {
            const ctx = (document.getElementById('devicePie') as HTMLCanvasElement)
            const colors = [
                '#a6cee3',
                '#1f78b4',
                '#b2df8a',
                '#33a02c',
                '#fb9a99',
                '#e31a1c',
                '#fdbf6f',
                '#ff7f00',
                '#cab2d6',
                '#6a3d9a'
            ];
            new Chart(ctx, {
                type: 'pie',
                data: {

                    labels: deviceNamesChartData.labels,
                    datasets: [{
                        data: deviceNamesChartData.data,
                        backgroundColor: colors, // Add more colors if needed
                    }],
                }
            });
        }
    }, [deviceNamesChartData]);




    return (
        <div className="flex flex-col justify-start mt-6">

            <div className="flex justify-center">
                <div style={{ width: '500px' }} className="relative gap-12 py-2 w-50 w-50 h-50 flex flex-col">
                    <div>
                        <h2 className="text-xl mb-5 font-bold text-center text-gray-800">
                            Event Types
                        </h2>
                        {eventNameData?.data?.length === 0 ? <div className="empty-chart-container bg-white p-8 rounded-md shadow-md text-center">
                            <svg className="mx-auto mb-4 h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">No Data Available</h2>
                            <p className="text-gray-500">Once data becomes available, the chart will be displayed here.</p>
                        </div> : <canvas className="" id="eventPie" width="200px" height="200px"></canvas>}


                    </div>
                </div>
                <div style={{ width: '500px' }} className="relative gap-12 py-2 w-50 w-50 h-50 flex flex-col">
                    <div>
                        <h2 className="text-xl mb-5 font-bold text-center text-gray-800">
                            Device Types
                        </h2>
                        {deviceTypeData?.data?.length === 0 ? <div className="empty-chart-container bg-white p-8 rounded-md shadow-md text-center">
                            <svg className="mx-auto mb-4 h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">No Data Available</h2>
                            <p className="text-gray-500">Once data becomes available, the chart will be displayed here.</p>
                        </div> : <canvas className="" id="devicePie" width="200px" height="200px"></canvas>}


                    </div>
                </div>
            </div>
        </div>
    )
}