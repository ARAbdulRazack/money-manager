/**
 * Timezone utilities: API/backend use UTC only; frontend displays in user's local timezone.
 * - Never send local-only date strings to the backend.
 * - Backend sends ISO-8601 UTC strings (e.g. "2026-01-29T06:15:00Z").
 */

/**
 * Convert a local date string (YYYY-MM-DD from type="date") to UTC ISO string
 * for start of that day in the user's timezone.
 * Used when sending filter startDate to API.
 */
export function localDateToUTCStartISO(dateStr) {
    if (!dateStr) return undefined;
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d).toISOString();
}

/**
 * Convert a local date string (YYYY-MM-DD) to UTC ISO string for the first moment
 * of the *next* day in the user's timezone (exclusive end for API).
 * Used when sending filter endDate to API so backend can use transactionDate < end.
 */
export function localDateToUTCEndExclusiveISO(dateStr) {
    if (!dateStr) return undefined;
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d + 1).toISOString();
}

/**
 * Format a UTC ISO string for display in the user's local timezone.
 * Backend sends UTC; we display in local (e.g. Intl or toLocaleDateString).
 */
export function formatUTCDateTimeForDisplay(utcISOString) {
    if (!utcISOString) return '';
    const date = new Date(utcISOString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Convert UTC ISO string from API to "YYYY-MM-DDTHH:mm" for datetime-local input
 * in the user's local timezone (so the picker shows correct local time).
 */
export function utcISOToLocalDatetimeLocalString(utcISOString) {
    if (!utcISOString) return '';
    const d = new Date(utcISOString);
    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const h = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${y}-${mo}-${day}T${h}:${min}`;
}
