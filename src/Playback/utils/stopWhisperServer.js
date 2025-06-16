import axios from "axios";

import { WHISPER_API_URL } from "@/shared/constants/env";

export const stopWhisperServer = async (userId) => {
  try {
    await axios.post(`${WHISPER_API_URL}/stop`, { userId });
  } catch (error) {
    console.error("❌ Whisper 종료 실패", error);
  }
};
