export function dateFormatter(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 60);
  if (interval < 1) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;

  if (interval < 60) return `${interval} minute${interval > 1 ? "s" : ""} ago`;

  interval = Math.floor(interval / 60);
  if (interval < 24)
    return `${Math.floor(seconds / 3600)} hour${
      Math.floor(seconds / 3600) > 1 ? "s" : ""
    } ago`;

  interval = Math.floor(interval / 24);
  if (interval < 7) return `${interval} day${interval > 1 ? "s" : ""} ago`;

  interval = Math.floor(interval / 7);
  if (interval < 4) return `${interval} week${interval > 1 ? "s" : ""} ago`;

  interval = Math.floor(interval / 4.345); // Approximate number of weeks in a month
  if (interval < 12) return `${interval} month${interval > 1 ? "s" : ""} ago`;

  return `${Math.floor(interval / 12)} year${
    Math.floor(interval / 12) > 1 ? "s" : ""
  } ago`;
}
