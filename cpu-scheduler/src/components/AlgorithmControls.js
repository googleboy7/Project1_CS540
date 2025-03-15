import { useState } from "react";
import PropTypes from "prop-types";

export default function AlgorithmControls({ onRun }) {
    const [algorithm, setAlgorithm] = useState("fifo");
    const [numProcesses, setNumProcesses] = useState(5);
    const [quantum, setQuantum] = useState(2);

    const handleRun = () => {
        if (numProcesses <= 0) {
            alert("Number of processes should be greater than 0");
            return;
        }
        if (algorithm === "rr" && quantum <= 0) {
            alert("Time quantum should be greater than 0");
            return;
        }
        onRun(algorithm, numProcesses, quantum);
    };

    return (
        <div className="scheduler-controls p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-bold">CPU Scheduler</h2>
            <label htmlFor="algorithm-select">Algorithm:</label>
            <select
                id="algorithm-select"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                aria-label="Select scheduling algorithm"
            >
                <option value="fifo">FIFO</option>
                <option value="sjf">SJF</option>
                <option value="stcf">STCF</option>
                <option value="rr">Round Robin</option>
                <option value="mlfq">MLFQ</option>
            </select>

            <label htmlFor="num-processes">Number of Processes:</label>
            <input
                id="num-processes"
                type="number"
                value={numProcesses}
                onChange={(e) => setNumProcesses(+e.target.value)}
                aria-label="Number of processes"
            />

            {algorithm === "rr" && (
                <>
                    <label htmlFor="time-quantum">Time Quantum:</label>
                    <input
                        id="time-quantum"
                        type="number"
                        value={quantum}
                        onChange={(e) => setQuantum(+e.target.value)}
                        aria-label="Time quantum for Round Robin"
                    />
                </>
            )}

            <button
                onClick={handleRun}
                className="run-button bg-blue-500 text-white px-4 py-2 mt-3 rounded"
            >
                Run
            </button>
        </div>
    );
}

AlgorithmControls.propTypes = {
    onRun: PropTypes.func.isRequired,
};