// app/api/timer/route.ts
import { NextResponse } from "next/server";
import { DateTime } from "luxon";

const INTERVAL_MAP: Record<string, number> = {
  "1_minute": 1,
  "5_minutes": 5,
  "1_hour": 60,
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  // default to 5_minutes if missing/invalid
  const interval = url.searchParams.get("interval") ?? "5_minutes";
  const spanMin = INTERVAL_MAP[interval] ?? 5;

  const now = DateTime.now().setZone("UTC-6");
  // floor to the nearest spanMin block
  const floored = now
    .set({ second: 0, millisecond: 0 })
    .set({ minute: Math.floor(now.minute / spanMin) * spanMin });

  // end of this block is floored + spanMin
  const blockEnd = floored.plus({ minutes: spanMin });
  const secsLeft = blockEnd.diff(now, "seconds").seconds || 0;
  const timeLeft = Math.max(Math.floor(secsLeft), 0);

  return NextResponse.json({
    roundStart: floored.toISO(),
    timeLeft,
  });
}
