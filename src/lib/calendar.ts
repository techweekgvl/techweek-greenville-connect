export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
}

const toUtcStamp = (iso: string): string => {
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
};

export const getGoogleCalendarUrl = (event: CalendarEvent): string => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toUtcStamp(event.start)}/${toUtcStamp(event.end)}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const getOutlookWebUrl = (event: CalendarEvent): string => {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    startdt: new Date(event.start).toISOString(),
    enddt: new Date(event.end).toISOString(),
    subject: event.title,
    body: event.description,
    location: event.location,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

const escapeIcs = (text: string): string =>
  text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

export const getIcsContent = (event: CalendarEvent): string => {
  const uid = `${toUtcStamp(event.start)}-${event.title.replace(/\s+/g, "-")}@techweekgreenville`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tech Week Greenville//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
    `DTSTART:${toUtcStamp(event.start)}`,
    `DTEND:${toUtcStamp(event.end)}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    `LOCATION:${escapeIcs(event.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
};

export const downloadIcs = (event: CalendarEvent): void => {
  const blob = new Blob([getIcsContent(event)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
