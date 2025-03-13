import { useState } from "react";
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
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">CPU Scheduling Simulator</h1>
            <AlgorithmControls onRun={handleRunAlgorithm} />
            <ChartDisplay schedule={schedule} />
        </div>
    );
}
