export function stcf(processes) {
    let time = 0;
    let schedule = [];
    let readyQueue = [];
    let currentProcess = null;
    let processInfo = processes.map(p => ({
        id: p.id,
        arrivalTime: p.arrivalTime,
        burstTime: p.burstTime,
        originalBurstTime: p.burstTime, // Store original burst time for later calculations
        startTime: null, // Initialize start time
        finishTime: null, // Initialize finish time
    }));

    // Sort processes by arrival time
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    while (processes.length > 0 || readyQueue.length > 0 || currentProcess) {
        // Add processes to the readyQueue when they arrive
        while (processes.length > 0 && processes[0].arrivalTime <= time) {
            readyQueue.push(processes.shift());
        }

        // If there's a process being executed, re-add it to the readyQueue
        if (currentProcess) readyQueue.push(currentProcess);

        if (readyQueue.length > 0) {
            // Sort the readyQueue to execute the process with the shortest remaining burst time
            readyQueue.sort((a, b) => a.burstTime - b.burstTime);
            currentProcess = readyQueue.shift();

            // If the process hasn't started yet, set its start time
            if (currentProcess.startTime === null) {
                currentProcess.startTime = time; // Set the start time for the first execution
            }

            // Record the current process execution time in the schedule
            schedule.push({ id: currentProcess.id, startTime: time });

            currentProcess.burstTime--;

            // If the process finishes, record its finish time
            if (currentProcess.burstTime === 0) {
                let processIndex = processInfo.findIndex(p => p.id === currentProcess.id);
                if (processIndex !== -1) {
                    processInfo[processIndex].finishTime = time + 1; // Add 1 to time as it's the end of the cycle
                }
                currentProcess = null; // Process finished, set currentProcess to null
            }
        }
        time++; // Increment time after each cycle
    }

    // Now, calculate turnaround time and waiting time for each process
    const results = processInfo.map(process => {
        const turnaroundTime = process.finishTime - process.arrivalTime;
        const waitingTime = turnaroundTime - process.originalBurstTime;

        return {
            id: process.id,
            arrivalTime: process.arrivalTime,
            burstTime: process.originalBurstTime,
            startTime: process.startTime, // Include start time
            finishTime: process.finishTime,
            turnaroundTime: turnaroundTime,
            waitingTime: waitingTime
        };
    });

    return results;
}
