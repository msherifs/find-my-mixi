// Simple in-memory rate limiter
// For production, consider using Redis

interface RateLimitEntry {
	timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function checkRateLimit(
	key: string,
	maxRequests: number,
	windowMs: number,
): boolean {
	const now = Date.now();
	const entry = rateLimitStore.get(key) || { timestamps: [] };

	// Remove timestamps outside the window
	entry.timestamps = entry.timestamps.filter((ts) => now - ts < windowMs);

	// Check if limit exceeded
	if (entry.timestamps.length >= maxRequests) {
		return false;
	}

	// Add current timestamp
	entry.timestamps.push(now);
	rateLimitStore.set(key, entry);

	return true;
}

// Cleanup old entries periodically
setInterval(
	() => {
		const now = Date.now();
		for (const [key, entry] of rateLimitStore.entries()) {
			entry.timestamps = entry.timestamps.filter(
				(ts) => now - ts < 15 * 60 * 1000,
			);
			if (entry.timestamps.length === 0) {
				rateLimitStore.delete(key);
			}
		}
	},
	5 * 60 * 1000,
); // Cleanup every 5 minutes
