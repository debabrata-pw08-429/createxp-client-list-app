export function formatDateUTC(input: string | Date, locale: string = "en-US"): string {
	let date: Date;
	if (typeof input === "string") {
		const match = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
		if (match) {
			const [, yearStr, monthStr, dayStr] = match;
			date = new Date(Date.UTC(Number(yearStr), Number(monthStr) - 1, Number(dayStr)));
		} else {
			const parsed = new Date(input);
			if (isNaN(parsed.getTime())) return input;
			date = new Date(Date.UTC(parsed.getUTCFullYear(), parsed.getUTCMonth(), parsed.getUTCDate()));
		}
	} else {
		date = new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));
	}

	try {
		const formatter = new Intl.DateTimeFormat(locale, {
			year: "numeric",
			month: "numeric",
			day: "numeric",
			timeZone: "UTC",
		});
		return formatter.format(date);
	} catch {
		const y = date.getUTCFullYear();
		const m = String(date.getUTCMonth() + 1).padStart(2, "0");
		const d = String(date.getUTCDate()).padStart(2, "0");
		return `${y}-${m}-${d}`;
	}
}


