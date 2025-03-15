import { Bar } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import "chart.js/auto";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ChartDisplay = ({ schedule = [], results = [], currentProcessIndex }) => {
    const chartRef = useRef(null);

    const data = {
        labels: schedule.map((p) => `P${p.id}`),
        datasets: [
            {
                label: "Start Time",
                data: schedule.map((p) => p.startTime),
                backgroundColor: schedule.map((_, index) => (index <= currentProcessIndex ? "green" : "gray")),
                barThickness: 30,
            },
            {
                label: "Finish Time",
                data: schedule.map((p) => p.endTime),
                backgroundColor: schedule.map((_, index) => (index <= currentProcessIndex ? "blue" : "gray")),
                barThickness: 30,
            },
        ],
    };

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.update();
        }
    }, [currentProcessIndex]);

    return (
        <div className="flex w-full gap-8">
            <div style={{ position: "relative", height: "200px", width: "50%" }}>
                {schedule.map((process, index) => (
                    <div
                        key={process.id}
                        style={{
                            position: "absolute",
                            left: `${(process.startTime / 10) * 100}%`,
                            width: `${((process.endTime - process.startTime) / 10) * 100}%`,
                            top: "50px",
                            height: "30px",
                            backgroundColor: index <= currentProcessIndex ? "green" : "gray",
                            transition: "all 0.5s ease",
                        }}
                    >
                        <span
                            style={{
                                color: "white",
                                paddingLeft: "5px",
                                fontSize: "12px",
                                position: "absolute",
                                top: "5px",
                            }}
                        >
                            {`P${process.id}`}
                        </span>
                    </div>
                ))}
            </div>
            <div style={{ width: "50%" }}>
                <Bar ref={chartRef} data={data} />
            </div>

            <div className="mt-4">
                <h2 className="text-xl font-bold">Scheduling Results</h2>
                <table className="table-auto w-full mt-2 border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Process</th>
                            <th className="border border-gray-300 px-4 py-2">Start Time</th>
                            <th className="border border-gray-300 px-4 py-2">Finish Time</th>
                            <th className="border border-gray-300 px-4 py-2">Turnaround Time</th>
                            <th className="border border-gray-300 px-4 py-2">Waiting Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((process) => {
                            const turnaroundTime = process.finishTime - process.arrivalTime;
                            const waitingTime = turnaroundTime - process.burstTime;
                            return (
                                <tr key={process.id}>
                                    <td className="border border-gray-300 px-4 py-2">{`P${process.id}`}</td>
                                    <td className="border border-gray-300 px-4 py-2">{process.startTime}</td>
                                    <td className="border border-gray-300 px-4 py-2">{process.finishTime}</td>
                                    <td className="border border-gray-300 px-4 py-2">{turnaroundTime}</td>
                                    <td className="border border-gray-300 px-4 py-2">{waitingTime}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChartDisplay;