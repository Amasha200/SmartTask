import React, { forwardRef } from "react";

const VideoTile = forwardRef(({ label, camOn }, ref) => {
  return (
    <div className="video-tile">
      {camOn ? (
        <video ref={ref} autoPlay muted playsInline />
      ) : (
        <div className="video-placeholder">Camera Off</div>
      )}
      <span className="label">{label}</span>
    </div>
  );
});

export default VideoTile;
