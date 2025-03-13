import { Bar } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import "chart.js/auto"; // Import Chart.js

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ChartDisplay = ({ schedule, currentProcessIndex }) => {
    const chartRef = useRef(null); // Reference to the chart for possible future customization or actions

    // Data for the bar chart
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
                data: schedule.map((p) => p.finishTime),
                backgroundColor: schedule.map((_, index) => (index <= currentProcessIndex ? "blue" : "gray")),
                barThickness: 30,
            },
        ],
    };

    useEffect(() => {
        if (chartRef.current) {
            // Optional: If you want to animate the chart itself, you can trigger the chart update
            chartRef.current.update();
        }
    }, [currentProcessIndex]);

    return (
        <div>
            <div style={{ position: "relative", height: "200px", width: "100%" }}>
                {schedule.map((process, index) => (
                    <div
                        key={process.id}
                        style={{
                            position: "absolute",
                            left: `${(process.startTime / 10) * 100}%`, // Scale for animation
                            width: `${(process.burstTime / 10) * 100}%`,
                            top: "50px",
                            height: "30px",
                            backgroundColor: index <= currentProcessIndex ? "green" : "gray",
                            transition: "all 0.5s ease", // Smooth transition
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
            {/* Resize chart */}
            <Bar ref={chartRef} data={data} options={{ responsive: true, maintainAspectRatio: false }} height={300} width={400} />
            
            {/* Displaying the results in a table */}
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
                        {schedule.map((process) => {
                            // Fix NaN by checking undefined values and calculating properly
                            const turnaroundTime = process.finishTime && process.arrivalTime ? process.finishTime - process.arrivalTime : 0;
                            const waitingTime = turnaroundTime && process.burstTime ? turnaroundTime - process.burstTime : 0;
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
