export function fifo(processes) {
    let time = 0;
    let schedule = [];
    
    // Sort processes by arrival time
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    
    processes.forEach(process => {
        // If the current time is less than the process's arrival time, we update the time to the arrival time
        if (time < process.arrivalTime) time = process.arrivalTime;
        
        // Add the process to the schedule with correct start and end time
        let startTime = time;
        let endTime = time + process.burstTime;
        
        // Update the time for the next process
        time = endTime;

        schedule.push({
            id: process.id,
            arrivalTime: process.arrivalTime,
            burstTime: process.burstTime,
            startTime: startTime,
            finishTime: endTime,  // Fix to use the correct finish time
        });
    });

    return schedule;
}
