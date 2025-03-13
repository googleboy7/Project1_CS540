import { Bar } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import "chart.js/auto"; // Import Chart.js
// Register necessary chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ChartDisplay = ({ schedule, currentProcessIndex }) => {
    const chartRef = useRef(null); // Reference to the chart for possible future customization or actions

    // Use chart.js to create the bar chart for the process visualization
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
        <div className="flex w-full gap-8">
            <div style={{ position: "relative", height: "200px", width: "50%" }}>
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
            <div style={{ width: "50%" }}>
                <Bar ref={chartRef} data={data} />
            </div>

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
