// fetchAgeAndRace.js
const fetchAgeAndRace = async (base64String) => {
  const TOTAL_TASKS = 14;

  return new Promise((resolve, reject) => {
    const socket = new WebSocket('ws://localhost:8765');
    const results = {};
    let tasksCompleted = 0;

    socket.onopen = () => {
      console.log('WebSocket opened, sending file...');
      socket.send(JSON.stringify({ file: base64String }));
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      reject(error);
    };

    socket.onmessage = (event) => {
      // ✅ Log raw message received
      console.log('Received from server:', event.data);

      try {
        const data = JSON.parse(event.data);

        // If there's an error, reject immediately
        if (data.error) {
          console.error('Server reported error:', data.error);
          return reject(data);
        }

        // If success message about file saved
        if (data.success) {
          results.filename = data.filename;
          return;
        }

        // Process pipeline result
        if (data.type) {
          results[data.type] = data.message;
          tasksCompleted++;

          // ✅ Log task completion as it happens
          console.log(`Task ${data.type} completed. Total completed: ${tasksCompleted}/${TOTAL_TASKS}`);

          if (tasksCompleted === TOTAL_TASKS) {
            console.log('All tasks completed, closing socket.');
            socket.close();
            resolve(results);
          }
        }
      } catch (err) {
        console.error('Failed to parse message:', err);
        reject(err);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };
  });
};

export default fetchAgeAndRace;
