"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Memories Calendar</h1>
      <Calendar onChange={setDate} value={date} />
      <div className="mt-6">
        <h2 className="text-xl">Memory Details</h2>
        {/* Replace with actual fetched data */}
        <p>No memory found for this date.</p>
      </div>
    </div>
  );
}
