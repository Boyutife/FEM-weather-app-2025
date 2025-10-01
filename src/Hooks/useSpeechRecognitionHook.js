import { useEffect, useState, useRef } from "react";

export const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [hasRecognition, setHasRecognition] = useState(false);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasRecognition(false);
      return;
    }

    setHasRecognition(true);
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => setIsListening(true)
    recognitionRef.current.onresult = (event) => {
      setText(event.results[0][0].transcript)
      setIsListening(false);
    };

    recognitionRef.current.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setText("");
    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    setIsListening(false);
    recognitionRef.current.stop();
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognition,
  };
};
