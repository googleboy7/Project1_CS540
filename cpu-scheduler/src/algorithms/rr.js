export function rr(processes, quantum) {
    let time = 0;
    let queue = [...processes]; // Clone the processes array to preserve the original
    let schedule = [];

    // Keep track of the initial burst time to calculate waiting time later
    let processInfo = processes.map(p => ({
        id: p.id,
        arrivalTime: p.arrivalTime,
        burstTime: p.burstTime,
        originalBurstTime: p.burstTime, // Store the original burst time
        finishTime: null, // Initialize finishTime as null
    }));

    while (queue.length > 0) {
        let process = queue.shift();
        let execTime = Math.min(quantum, process.burstTime);
        
        // Record the process execution time in the schedule
        schedule.push({ id: process.id, startTime: time, endTime: time + execTime });
        time += execTime;
        process.burstTime -= execTime;

        // Update the finish time once the process is completed
        if (process.burstTime === 0) {
            let processIndex = processInfo.findIndex(p => p.id === process.id);
            if (processIndex !== -1) {
                processInfo[processIndex].finishTime = time;
            }
        }

        // If the process has remaining burst time, add it back to the queue
        if (process.burstTime > 0) {
            queue.push(process);
        }
    }

    // Now, calculate the turnaround time and waiting time for each process
    const results = processInfo.map(process => {
        const turnaroundTime = process.finishTime - process.arrivalTime;
        const waitingTime = turnaroundTime - process.originalBurstTime;

        return {
            id: process.id,
            arrivalTime: process.arrivalTime,
            burstTime: process.originalBurstTime,
            finishTime: process.finishTime,
            turnaroundTime: turnaroundTime,
            waitingTime: waitingTime
        };
    });

    return results;
}
