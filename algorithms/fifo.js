export function fifo(processes){
    let time = 0;
    let schedule = [];
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    processes.forEach(process => {
        if (time < process.arrivalTime) time = process.arrivalTime;
        schedule.push({ id: process.id, startTime: time, endTime: time = process.burstTime});
        time += process.burstTime;
    });
    return schedule;
}