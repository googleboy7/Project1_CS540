export function mlfq(processes, quantumLevels = [2, 4, 8]){
    let queues = quantumLevels.maps(() => []);
    let time = 0;
    let schedule = [];
    processes.forEach(p => queues[0].push(p));

    while (queues.some(q => q.length > 0)){
        for (let level = 0; level < queues.length; level++){
            let queue = queues[level];
            if (queue.length > 0){
                let process = queue.shift();
                let execTime = Math.min(quantumLevels[level], process.burstTime);
                schedule.push({ id: process.id, startTime: time, endTime: time + execTime});
                time += execTime;
                process.burstTime -= execTime;
                if (process.burstTime > 0 && level < queues.length -1){
                    queues[levels + 1].push(process);
                }
                break;
            }
        }
    }
    return schedule;
}