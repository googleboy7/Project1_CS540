export function sjf(processes) {
    let time = 0;
    let schedule = [];
    let readyQueue = [];
    let processInfo = processes.map(p => ({
        id: p.id,
        arrivalTime: p.arrivalTime,
        burstTime: p.burstTime,
        originalBurstTime: p.burstTime, // Store the original burst time
        startTime: null, // Initialize startTime as null
        finishTime: null, // Initialize finish time as null
    }));

    // Sort processes by arrival time
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    while (processes.length > 0 || readyQueue.length > 0) {
        // Add processes to the readyQueue if their arrival time has been reached
        while (processes.length > 0 && processes[0].arrivalTime <= time) {
            readyQueue.push(processes.shift());
        }

        // If there are processes in the readyQueue, process the shortest job
        if (readyQueue.length > 0) {
            readyQueue.sort((a, b) => a.burstTime - b.burstTime); // Sort by burst time (shortest job first)
            let process = readyQueue.shift();
            
            // Record the process's start time and execution time in the schedule
            if (process.startTime === null) {
                process.startTime = time; // Set the start time for the first execution
            }
            schedule.push({ id: process.id, startTime: time, endTime: time + process.burstTime });
            time += process.burstTime;
            
            // Update the finish time once the process is completed
            let processIndex = processInfo.findIndex(p => p.id === process.id);
            if (processIndex !== -1) {
                processInfo[processIndex].finishTime = time;
            }
        } else {
            // If the readyQueue is empty, fast-forward time to the next process arrival
            time = processes[0].arrivalTime;
        }
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
