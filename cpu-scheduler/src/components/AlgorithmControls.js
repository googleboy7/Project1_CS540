import { useState } from "react";

export default function AlgorithmControls({ onRun }) {
    const [algorithm, setAlgorithm] = useState("fifo");
    const [numProcesses, setNumProcesses] = useState(5);
    const [quantum, setQuantum] = useState(2);

    const handleRun = () => {
        onRun(algorithm, numProcesses, quantum);
    };

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-bold">CPU Scheduler</h2>
            <label>Algorithm:</label>
            <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                <option value="fifo">FIFO</option>
                <option value="sjf">SJF</option>
                <option value="stcf">STCF</option>
                <option value="rr">Round Robin</option>
                <option value="mlfq">MLFQ</option>
            </select>

            <label>Number of Processes:</label>
            <input type="number" value={numProcesses} onChange={(e) => setNumProcesses(+e.target.value)} />

            {algorithm === "rr" && (
                <>
                    <label>Time Quantum:</label>
                    <input type="number" value={quantum} onChange={(e) => setQuantum(+e.target.value)} />
                </>
            )}

            <button onClick={handleRun} className="bg-blue-500 text-white px-4 py-2 mt-3 rounded">Run</button>
        </div>
    );
}

