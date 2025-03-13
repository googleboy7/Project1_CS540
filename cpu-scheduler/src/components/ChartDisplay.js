import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function ChartDisplay({ schedule }) {
    if (!schedule || schedule.length === 0) return <p>No data to display.</p>;

    const labels = schedule.map((s) => `P${s.id}`);
    const data = {
        labels,
        datasets: [
            {
                label: "Execution Time",
                data: schedule.map((s) => s.endTime - s.startTime),
                backgroundColor: "rgba(75,192,192,0.6)",
            },
        ],
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Scheduling Chart</h2>
            <Bar data={data} />
        </div>
    );
}
