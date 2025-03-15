import { useState, useEffect } from "react";
import AlgorithmControls from "../components/AlgorithmControls";
import ChartDisplay from "../components/ChartDisplay";
import { generateProcesses } from "../../utils/generateProcesses";
import { fifo } from "../algorithms/fifo";
import { sjf } from "../algorithms/sjf";
import { stcf } from "../algorithms/stcf";
import { rr } from "../algorithms/rr";
import { mlfq } from "../algorithms/mlfq";

export default function Home() {
    const [schedule, setSchedule] = useState([]);
    const [results, setResults] = useState([]);
    const [currentProcessIndex, setCurrentProcessIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleRunAlgorithm = (algorithm, numProcesses, quantum) => {
        const processes = generateProcesses(numProcesses);
        let result = { schedule: [], results: [] };

        switch (algorithm) {
            case "fifo":
                result.schedule = fifo(processes);
                result.results = result.schedule.map(p => ({
                    ...p,
                    turnaroundTime: p.finishTime - p.arrivalTime,
                    waitingTime: p.finishTime - p.arrivalTime - p.burstTime,
                }));
                break;
            case "sjf":
                result = sjf(processes);
                break;
            case "stcf":
                result = stcf(processes);
                break;
            case "rr":
                result = rr(processes, quantum);
                break;
            case "mlfq":
                result = mlfq(processes);
                break;
            default:
                break;
        }

        setSchedule(result.schedule || []);
        setResults(result.results || []);
        setCurrentProcessIndex(0);
        setIsAnimating(false);
    };

    useEffect(() => {
        if (isAnimating && schedule.length > 0) {
            const interval = setInterval(() => {
                setCurrentProcessIndex((prevIndex) => {
                    if (prevIndex < schedule.length - 1) {
                        return prevIndex + 1;
                    } else {
                        clearInterval(interval);
                        return prevIndex;
                    }
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isAnimating, schedule]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">CPU Scheduling Simulator</h1>
            <AlgorithmControls onRun={handleRunAlgorithm} />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => setIsAnimating(true)}
                disabled={isAnimating || schedule.length === 0}
            >
                Start Animation
            </button>
            <ChartDisplay schedule={schedule} results={results} currentProcessIndex={currentProcessIndex} />
        </div>
    );
}