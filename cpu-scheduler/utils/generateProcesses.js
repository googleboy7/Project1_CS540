export function generateProcesses(count) {
    const processes = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        arrivalTime: Math.floor(Math.random() * 5), // Reduced range for better scheduling
        burstTime: Math.floor(Math.random() * 10) + 1, // Ensure burstTime is at least 1
    }));

    // Sort processes by arrival time to avoid randomness issues
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    return processes;
}
