export function mlfq(processes, quantumLevels = [2, 4, 8]) {
    let queues = quantumLevels.map(() => []);
    let time = 0;
    let schedule = [];

    // Store process metadata
    let processInfo = processes.map(p => ({
        ...p,
        originalBurstTime: p.burstTime,
        startTime: null,
        finishTime: null,
    }));

    // Push all processes into the first queue (highest priority)
    processes.forEach(p => queues[0].push(p));

    while (queues.some(q => q.length > 0)) {
        for (let level = 0; level < queues.length; level++) {
            let queue = queues[level];

            if (queue.length > 0) {
                let process = queue.shift(); // Get next process
                let execTime = Math.min(quantumLevels[level], process.burstTime);

                // Set start time only once
                if (process.startTime === null) {
                    process.startTime = time;
                }

                // Log execution in schedule
                schedule.push({
                    id: process.id,
                    startTime: time,
                    endTime: time + execTime,
                });

                time += execTime;
                process.burstTime -= execTime;

                // Move process to the next queue if it still has burst time
                if (process.burstTime > 0 && level < queues.length - 1) {
                    queues[level + 1].push(process);
                }

                // Set finish time if process finishes
                if (process.burstTime === 0 && process.finishTime === null) {
                    process.finishTime = time;
                }
                break;
            }
        }
    }

    // Calculate turnaround and waiting times
    const results = processInfo.map(process => {
        const turnaroundTime = process.finishTime - process.arrivalTime;
        const waitingTime = turnaroundTime - process.originalBurstTime;

        return {
            id: process.id,
            arrivalTime: process.arrivalTime,
            burstTime: process.originalBurstTime,
            startTime: process.startTime,
            finishTime: process.finishTime,
            turnaroundTime: turnaroundTime,
            waitingTime: waitingTime
        };
    });

    return results;
}
