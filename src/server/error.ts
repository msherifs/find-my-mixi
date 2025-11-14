export const ErrorLiteral = {
	MALFORMED_REQUEST: "req.001",
	INVALID_PASSWORD: "ath.001",
	INVALID_EMAIL: "ath.002",
	INVALID_CREDENTIALS: "ath.003",
	EMAIL_ALREADY_USED: "ath.004",
	USER_NOT_FOUND: "usr.001",
} as const;

export class LiteralError extends Error {
	constructor(key: keyof typeof ErrorLiteral) {
		super(ErrorLiteral[key]);
		this.name = "LiteralError";
	}
}
