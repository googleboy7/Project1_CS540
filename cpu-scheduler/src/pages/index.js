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
    const [currentProcessIndex, setCurrentProcessIndex] = useState(0); // To track the current process being animated
    const [isAnimating, setIsAnimating] = useState(false); // To control the animation state

    const handleRunAlgorithm = (algorithm, numProcesses, quantum) => {
        const processes = generateProcesses(numProcesses);
        let result = [];

        switch (algorithm) {
            case "fifo":
                result = fifo(processes);
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

        setSchedule(result);
        setCurrentProcessIndex(0); // Reset process animation index when a new algorithm is run
        setIsAnimating(false); // Stop the previous animation
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
            }, 1000); // 1-second interval for animation step
            return () => clearInterval(interval); // Cleanup on component unmount
        }
    }, [isAnimating, schedule]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">CPU Scheduling Simulator</h1>
            <AlgorithmControls onRun={handleRunAlgorithm} />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => setIsAnimating(true)} // Start animation
                disabled={isAnimating || schedule.length === 0}
            >
                Start Animation
            </button>
            <ChartDisplay schedule={schedule} currentProcessIndex={currentProcessIndex} />
        </div>
    );
}
