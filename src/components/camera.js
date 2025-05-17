import React, { useEffect, useRef, useState } from "react";

const Camera = () => {
  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const [selectedEmotion, setSelectedEmotion] = useState("Очікування...");
  const [answer, setAnswer] = useState(null); // "correct", "incorrect" або null

  const correctEmotion = "happy"; // Очікувана правильна емоція

  // 🔌 WebSocket підключення
  useEffect(() => {
    socketRef.current = new WebSocket("https://romaniabackws-production.up.railway.app/ws");

    socketRef.current.onopen = () => {
      console.log("✅ WebSocket підключено");
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 Отримано:", data);

        if (Array.isArray(data.emotions)) {
          const top = data.emotions.reduce((prev, current) =>
            prev.confidence > current.confidence ? prev : current
          );

          setSelectedEmotion(`${top.emotion} (${(top.confidence * 100).toFixed(1)}%)`);

          if (top.emotion === correctEmotion && top.confidence >= 0.6) {
            setAnswer("correct");
          } else {
            setAnswer("incorrect");
          }
        }
      } catch (error) {
        console.error("❌ Помилка при обробці відповіді:", error);
      }
    };

    socketRef.current.onclose = () => {
      console.log("🔌 WebSocket закрито");
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  // 📷 Отримання відео з камери (з виправленням AbortError)
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play(); // Виправлення: явний await
        }
      } catch (err) {
        console.error("❌ Не вдалося отримати відео з камери:", err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 📤 Відправка кадру кожну секунду
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && socketRef.current?.readyState === WebSocket.OPEN) {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        const context = canvas.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            socketRef.current.send(blob);
          }
        }, "image/jpeg");
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Розпізнавання емоцій через камеру</h2>

      <video
        ref={videoRef}
        style={{ width: "480px", height: "360px", borderRadius: "12px", border: "2px solid #ccc" }}
        autoPlay
        muted
      />

      <div style={{ marginTop: "20px" }}>
        <p><strong>Найімовірніша емоція:</strong> {selectedEmotion}</p>

        {answer === "correct" && (
          <p style={{ color: "green", fontWeight: "bold" }}>✅ Правильна емоція!</p>
        )}
        {answer === "incorrect" && (
          <p style={{ color: "red", fontWeight: "bold" }}>❌ Спробуй іншу емоцію</p>
        )}
      </div>
    </div>
  );
};

export default Camera;
