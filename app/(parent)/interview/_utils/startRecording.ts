export const startRecording = async (
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>,
  setAudioUrl: React.Dispatch<React.SetStateAction<string | null>>,
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>,
  audioChunksRef: React.MutableRefObject<Blob[]>,
  audioContextRef: React.MutableRefObject<AudioContext | null>,
  analyserRef: React.MutableRefObject<AnalyserNode | null>,
  playQuestion: (index: number) => void,
  userId: string | null,
  groupId: string | null
) => {
  setIsRecording(true);
  setAudioUrl(null);
  audioChunksRef.current = [];

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioContext = audioContextRef.current!;
  const source = audioContext.createMediaStreamSource(stream);
  const destination = audioContext.createMediaStreamDestination();

  source.connect(analyserRef.current!);
  analyserRef.current!.connect(destination);

  mediaRecorderRef.current = new MediaRecorder(destination.stream);

  mediaRecorderRef.current.ondataavailable = (event) => {
    audioChunksRef.current.push(event.data);
  };

  mediaRecorderRef.current.onstop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, {
      type: "audio/mpeg",
    });

    const audioUrl = URL.createObjectURL(audioBlob);
    console.log("Generated audio URL:", audioUrl);
    setAudioUrl(audioUrl);

    // Blob을 FormData에 추가하여 백엔드로 전송합니다.
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.mp3");

    if (groupId) formData.append("groupId", groupId);
    if (userId) formData.append("userId", userId);

    try {
      const response = await fetch("/api/uploadInterview", {
        method: "POST",
        body: formData,
        // 'Content-Type'은 명시하지 않습니다.
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      console.log("File successfully uploaded");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  mediaRecorderRef.current.start();

  playQuestion(0);
};
