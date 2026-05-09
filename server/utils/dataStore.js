let inMemoryLogs = [];

export const getLogs = (userId) => {
  return inMemoryLogs.filter(log => log.userId === userId);
};

export const clearLogs = (userId) => {
  inMemoryLogs = inMemoryLogs.filter(log => log.userId !== userId);
};

export const addLogs = (logs) => {
  inMemoryLogs = [...inMemoryLogs, ...logs];
};

export const aggregateLogs = (userId, field) => {
  const userLogs = getLogs(userId);
  const counts = {};
  userLogs.forEach(log => {
    const val = log[field];
    counts[val] = (counts[val] || 0) + 1;
  });
  return Object.entries(counts).map(([id, count]) => ({ _id: id, count }));
};
