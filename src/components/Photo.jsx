import React, { useRef, useEffect, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { FaUserCheck, FaRegEye, FaLock } from "react-icons/fa";

function Photo({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);

  const eyesClosedRef = useRef(false);
  const readyRef = useRef(false);

  const [isBlinked, setIsBlinked] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);

  // ✅ Capture Photo + Close Camera
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    const img = canvas.toDataURL("image/jpeg");

    if (onCapture) onCapture(img);

    // 👉 Stop MediaPipe camera
    cameraRef.current?.stop();

    // 👉 Stop webcam completely
    if (video.srcObject) {
      video.srcObject.getTracks().forEach(track => track.stop());
    }

    setCameraActive(false);
  };

  useEffect(() => {
    if (!videoRef.current) return;

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
    });

    faceMesh.onResults((results) => {
      if (!results.multiFaceLandmarks || !cameraActive) return;

      const face = results.multiFaceLandmarks[0];
      if (!face[159] || !face[145]) return;

      const eye = Math.abs(face[159].y - face[145].y);

      // 👁 Eyes Closed
      if (eye < 0.01 && !eyesClosedRef.current) {
        eyesClosedRef.current = true;
        setIsBlinked(true);

        setTimeout(() => {
          readyRef.current = true;
        }, 1500);
      }

      // 👁 Eyes Open After Blink
      if (eye > 0.015 && eyesClosedRef.current && readyRef.current) {
        takePhoto();
        readyRef.current = false;
      }
    });

    cameraRef.current = new Camera(videoRef.current, {
      onFrame: async () => {
        if (cameraActive) {
          await faceMesh.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480,
    });

    cameraRef.current.start();

    // ✅ Cleanup when component unmount
    return () => {
      cameraRef.current?.stop();

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach(track => track.stop());
      }
    };
  }, [cameraActive]);

  return (
    <div className="relative w-full max-w-[500px] mx-auto overflow-hidden rounded-2xl bg-slate-900 shadow-2xl border-2 border-slate-200">
      
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`w-full h-auto object-cover transition-all duration-700 ${
          !cameraActive ? "grayscale opacity-40" : "opacity-100"
        }`}
      />

      <canvas ref={canvasRef} className="hidden" />

      {cameraActive && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%]">
          <div className={`flex items-center justify-center gap-3 p-3 rounded-xl border backdrop-blur-md transition-all duration-300 ${
            isBlinked 
            ? "bg-green-500/20 border-green-400/50 text-green-100" 
            : "bg-slate-900/60 border-white/20 text-white"
          }`}>
            {isBlinked ? (
              <>
                <FaUserCheck className="text-lg" />
                <span className="text-xs font-semibold uppercase">
                  Identity Confirmed
                </span>
              </>
            ) : (
              <>
                <FaRegEye className="text-lg" />
                <span className="text-xs font-semibold uppercase">
                  Blink to verify liveness
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {!cameraActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-slate-900/40 backdrop-blur-[2px]">
          <div className="bg-white text-slate-900 p-4 rounded-full shadow-2xl">
            <FaLock size={32} />
          </div>
          <p className="mt-4 font-black uppercase text-xs">
            Biometric Locked
          </p>
        </div>
      )}
    </div>
  );
}

export default Photo;
