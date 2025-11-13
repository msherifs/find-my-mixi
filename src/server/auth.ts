import { useSession } from "@tanstack/react-start/server";
import type { UserRole } from "./db/enums";
import { Env } from "./utils/env";

type Session = {
	userId: string;
	role: UserRole;
};

export const useAppSession = () => {
	return useSession<Session>({
		name: "app-session",
		password: Env.JWT_SECRET,
		cookie: {
			httpOnly: true,
			sameSite: "lax",
			secure: true,
		},
	});
};
