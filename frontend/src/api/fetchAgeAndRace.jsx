const fetchAgeAndRace = async (base64String) => {
    try {
      const response = await fetch('/fetchageandrace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: base64String }),
      });
  
      if (!response.ok) throw new Error('Server error');
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Upload failed:', err);
      return null;
    }
  };

export default fetchAgeAndRace