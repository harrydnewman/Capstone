const fetchData = async (base64String, onProgress) => {
  const TOTAL_TASKS = 14;
  const TIMEOUT_MS = 20000; // 20 seconds timeout

  return new Promise((resolve, reject) => {
    const socket = new WebSocket(import.meta.env.VITE_WS_URL);
    const results = {};
    let tasksCompleted = 0;
    let timeoutHandle;

    const maybeResolve = () => {
      if (tasksCompleted >= TOTAL_TASKS) {
        clearTimeout(timeoutHandle);
        console.log('All tasks completed, closing socket.');
        socket.close();
        
        resolve(results);
      }
    };

    socket.onopen = () => {
      console.log('WebSocket opened, sending file...');
      socket.send(JSON.stringify({ file: base64String }));

      // ✅ Start timeout when socket opens
      timeoutHandle = setTimeout(() => {
        console.warn(`Timeout reached after ${TIMEOUT_MS / 1000}s. Completed: ${tasksCompleted}/${TOTAL_TASKS}`);

        if (tasksCompleted === TOTAL_TASKS - 1 && !results.hair_type) {
          console.warn('hair_type missing, setting to null by timeout fallback.');
          results.hair_type = null;
          tasksCompleted++;
          if (onProgress) onProgress(tasksCompleted, TOTAL_TASKS)
        }

        maybeResolve(); // Resolve with partial data
        socket.close(); // Make sure to close socket
      }, TIMEOUT_MS);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      clearTimeout(timeoutHandle);
      reject(error);
    };

    socket.onmessage = (event) => {
      console.log('Received from server:', event.data);

      try {
        const data = JSON.parse(event.data);

        if (data.error) {
          console.error('Server reported error:', data.error);
          clearTimeout(timeoutHandle);
          return reject(data);
        }

        if (data.success) {
          results.filename = data.filename;
          return;
        }

        if (data.type) {
          results[data.type] = data.message;
          tasksCompleted++;
        
          console.log(`Task ${data.type} completed. Total completed: ${tasksCompleted}/${TOTAL_TASKS}`);
        
          if (onProgress) onProgress(tasksCompleted, TOTAL_TASKS); // 💡 External callback
        
          maybeResolve();
        }
      } catch (err) {
        console.error('Failed to parse message:', err);
        clearTimeout(timeoutHandle);
        reject(err);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
      clearTimeout(timeoutHandle);
    };
  });
};

export default fetchData;
