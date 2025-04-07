function CameraWall() {
    return (
      <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        <iframe
          src="http://localhost:3001"
          title="Camera Wall"
          style={{
            border: 'none',
            width: '100%',
            height: '100%',
            pointerEvents: 'none' // ✅ if you want it fully background-only
          }}
          allow="autoplay; encrypted-media"
        />
      </div>
    );
  }
  
  export default CameraWall;
  