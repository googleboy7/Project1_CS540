export function stcf(processes){
    let time = 0;
    let schedule = [];
    let readyQueue = [];
    let currentProcess = null;
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    while (processes.length > 0 || readyQueue.length > 0 || currentProcess){
        while (processes.length > 0 && processes[0].arrivalTime === time){
            readyQueue.push(processes.shift());
        }
        if (currentProcess) readyQueue.push(currentProcess);
        if (readyQueue.length > 0){
            readyQueue.sort((a, b) => a.burstTime - b.burstTime);
            currentProcess = readyQueue.shift();
            schedule.push({ id: currentProcess.id, time: time});
            currentProcess.burstTime--;
            if (currentProcess.burstTime === 0) currentProcess = null;
        }
        time++;
    }
    return schedule;
}