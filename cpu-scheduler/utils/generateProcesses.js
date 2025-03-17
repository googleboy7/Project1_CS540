/**
 * Generates a list of processes for scheduling with ordered burst times.
 * 
 * @param {number} count - The number of processes to generate.
 * @returns {Object[]} - An array of ordered process objects.
 * @throws {Error} - If count is not a positive integer.
 */
export function generateProcesses(count) {
    if (!Number.isInteger(count) || count <= 0) {
        throw new Error("Count must be a positive integer");
    }

    let burstTimes = Array.from({ length: count }, () => Math.floor(Math.random() * 10) + 1);
    burstTimes.sort((a, b) => a - b); // Ensure burst times are in increasing order

    const processes = Array.from({ length: count }, ( _, i ) => ({
        id: i + 1, // Ensure process IDs are in order (P1, P2, P3, ...)
        arrivalTime: i, // Assign sequential arrival times (0, 1, 2, 3...)
        burstTime: burstTimes[i], // Assign ordered burst times
    }));

    return processes;
}
