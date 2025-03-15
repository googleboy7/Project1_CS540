export function stcf(processes) {
    let time = 0;
    let schedule = [];
    let readyQueue = [];
    let currentProcess = null;

    let processInfo = processes.map(p => ({
        id: p.id,
        arrivalTime: p.arrivalTime,
        burstTime: p.burstTime,
        originalBurstTime: p.burstTime,
        startTime: null,
        finishTime: null,
    }));

    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    while (processes.length > 0 || readyQueue.length > 0 || currentProcess) {
        while (processes.length > 0 && processes[0].arrivalTime <= time) {
            readyQueue.push(processes.shift());
        }

        if (currentProcess) readyQueue.push(currentProcess);

        if (readyQueue.length > 0) {
            readyQueue.sort((a, b) => a.burstTime - b.burstTime);
            currentProcess = readyQueue.shift();

            if (currentProcess.startTime === null) {
                currentProcess.startTime = time;
            }

            schedule.push({ id: currentProcess.id, startTime: time });

            currentProcess.burstTime--;

            if (currentProcess.burstTime === 0) {
                let processIndex = processInfo.findIndex(p => p.id === currentProcess.id);
                if (processIndex !== -1) {
                    processInfo[processIndex].finishTime = time + 1;
                }
                currentProcess = null;
            }
        }
        time++;
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
