export function mlfq(processes, quantumLevels = [2, 4, 8]) {
    // Initialize queues for each level using map (correct method)
    let queues = quantumLevels.map(() => []);
    let time = 0;
    let schedule = [];
    
    // Push all processes into the first queue (highest priority)
    processes.forEach(p => queues[0].push(p));

    while (queues.some(q => q.length > 0)) {
        for (let level = 0; level < queues.length; level++) {
            let queue = queues[level];
            
            // If the current queue is not empty
            if (queue.length > 0) {
                let process = queue.shift(); // Get the next process
                let execTime = Math.min(quantumLevels[level], process.burstTime); // Execute for the minimum of quantum or remaining burst time
                
                // Record the schedule
                schedule.push({
                    id: process.id,
                    startTime: time,
                    endTime: time + execTime,
                    arrivalTime: process.arrivalTime,
                    burstTime: process.burstTime
                });

                // Update the time and remaining burst time
                time += execTime;
                process.burstTime -= execTime;

                // If the process has remaining burst time and it is not the last queue, push it to the next queue
                if (process.burstTime > 0 && level < queues.length - 1) {
                    queues[level + 1].push(process); // Push to next lower priority queue
                }
                break; // Exit the for loop to simulate time slice processing
            }
        }
    }

    // Now, calculate turnaround time and waiting time for each process
    const results = processes.map(process => {
        const processSchedule = schedule.filter(entry => entry.id === process.id);
        const finishTime = processSchedule[processSchedule.length - 1].endTime;
        const turnaroundTime = finishTime - process.arrivalTime;
        const waitingTime = turnaroundTime - process.burstTime;

        return {
            id: process.id,
            arrivalTime: process.arrivalTime,
            burstTime: process.burstTime,
            finishTime: finishTime,
            turnaroundTime: turnaroundTime,
            waitingTime: waitingTime
        };
    });

    return results;
}
