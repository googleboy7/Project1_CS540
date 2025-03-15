export function sjf(processes) {
    let time = 0;
    let schedule = [];
    let readyQueue = [];

    let processInfo = processes.map(p => ({
        id: p.id,
        arrivalTime: p.arrivalTime,
        burstTime: p.burstTime,
        originalBurstTime: p.burstTime,
        startTime: null,
        finishTime: null,
    }));

    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    while (processes.length > 0 || readyQueue.length > 0) {
        while (processes.length > 0 && processes[0].arrivalTime <= time) {
            readyQueue.push(processes.shift());
        }

        if (readyQueue.length > 0) {
            readyQueue.sort((a, b) => a.burstTime - b.burstTime);
            let process = readyQueue.shift();

            if (process.startTime === null) {
                process.startTime = time;
            }

            schedule.push({ id: process.id, startTime: time, endTime: time + process.burstTime });
            time += process.burstTime;

            let processIndex = processInfo.findIndex(p => p.id === process.id);
            if (processIndex !== -1) {
                processInfo[processIndex].finishTime = time;
            }
        } else {
            time = processes[0].arrivalTime;
        }
    }

    const results = processInfo.map(process => ({
        id: process.id,
        arrivalTime: process.arrivalTime,
        burstTime: process.originalBurstTime,
        startTime: process.startTime,
        finishTime: process.finishTime,
        turnaroundTime: process.finishTime - process.arrivalTime,
        waitingTime: process.finishTime - process.arrivalTime - process.originalBurstTime,
    }));

    return results;
}
