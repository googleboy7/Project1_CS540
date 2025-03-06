export function generateProcesses(count){
    return Array.from({ length: count }, (_, i) => ({
        id: i +1,
        arrivalTime: Math.floor(Math.random() * 10),
        burstTime: Math.floor(Math.random() * 10) + 1,
    }));
}