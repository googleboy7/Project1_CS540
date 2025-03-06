export function sjf(processes){
    let time = 0;
    let schedule = [];
    let readyQueue = [];
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    while (processes.length > 0 || readyQueue.length > 0){
        while (processes.length > 0 && processes[0].arrivalTime <= time){
            readyQueue.push(processes.shift());
        }
        if (readyQueue.length > 0){
            readyQueue.sort((a, b) => a.burstTime - b.burstTime);
            let process = readyQueue.shift();
            schedule.push({ id: process.id, startTime: time, endTime: time + process.burstTime});
            time += process.burstTime;
        } else {
            time = processes[0].arrivalTime;
        }
    }
    return schedule;
}