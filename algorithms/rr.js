export function rr(processes, quantum){
    let time = 0;
    let queue = [...processes];
    let schedule = [];

    while (queue.length > 0){
        let process = queue.shift();
        let execTime = Math.min(quantum, process.burstTime);
        schedule.push({ id: process.id, startTime: time, endTime: time + execTime});
        time += execTime;
        process.burstTime -= execTime;
        if (process.burstTime > 0) queue.push(process);
    }
    return schedule;
}