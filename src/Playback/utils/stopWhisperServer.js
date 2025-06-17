import axios from "axios";

import { WHISPER_API_URL } from "@/shared/constants/env";

export const stopWhisperServer = async (userId) => {
  try {
    await axios.delete(`${WHISPER_API_URL}/transcription`, { userId });
  } catch (error) {
    console.error("❌ Whisper 종료 실패", error);
  }
};
