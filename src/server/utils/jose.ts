import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import { DateTime } from "luxon";

export type AppJWTPayload = JWTPayload & {
	userId: string;
};

const signJwtToken = async (
	payload: AppJWTPayload,
	options: { secret: string; expiresInMinutes?: number },
) => {
	const expirationDate = DateTime.now()
		.plus({ minutes: options.expiresInMinutes ?? 12 * 60 })
		.toJSDate();
	const accessToken = await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256", typ: "JWT" })
		.setIssuedAt(new Date())
		.setExpirationTime(expirationDate)
		.sign(new TextEncoder().encode(options.secret));

	return { accessToken, expirationDate };
};

const verifyJwtToken = async (token: string, options: { secret: string }) => {
	return (await jwtVerify(token, new TextEncoder().encode(options.secret)))
		.payload as AppJWTPayload;
};

export { signJwtToken, verifyJwtToken };
