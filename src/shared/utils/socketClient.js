import { io } from "socket.io-client";

import { BACKEND_API_URL } from "@/shared/constants/env";

const socket = io(BACKEND_API_URL);

export default socket;
