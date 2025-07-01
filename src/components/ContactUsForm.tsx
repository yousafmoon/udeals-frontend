"use client";

import { useState } from "react";

export default function ContactUsForm({
  contactPageContent,
}: {
  contactPageContent: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [concern, setConcern] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !concern || !message) {
      setStatus("Please fill in all fields.");
      setStatusType("error");
      autoHideStatus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("Please enter a valid email address.");
      setStatusType("error");
      autoHideStatus();
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          concern,
          message,
          receiverEmail: "admin@yourdomain.com",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusType("error");
        setStatus(data.message || "Something went wrong.");
      } else {
        setStatusType("success");
        setStatus(data.message || "Message sent!");
        setName("");
        setEmail("");
        setConcern("");
        setMessage("");
      }
    } catch (err) {
      setStatusType("error");
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      autoHideStatus();
    }
  };

  const autoHideStatus = () => {
    setTimeout(() => {
      setStatus("");
      setStatusType("");
    }, 5000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-12 gap-6 font-questrial text-black"
    >
      {/* Name */}
      <div className="flex flex-col">
        <label className="mb-1.5 text-sm font-bold uppercase">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-md bg-black text-white placeholder:text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="mb-1.5 text-sm font-bold uppercase">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-md bg-black text-white placeholder:text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
        />
      </div>

      {/* Concern */}
      <div className="flex flex-col">
        <label className="mb-1.5 text-sm font-bold uppercase">Concern</label>
        <div className="relative">
          <select
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            required
            className="appearance-none w-full pr-10 pl-4 py-3 rounded-md bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          >
            <option value="" disabled>
              Select Concern
            </option>
            <option value="Feedback">Feedback</option>
            <option value="Complaint">Complaint</option>
            <option value="Advertising">Advertising</option>
            <option value="Other">Other</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.5 7l4.5 5 4.5-5h-9z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col sm:col-span-2 md:col-span-3">
        <label className="mb-1.5 text-sm font-bold uppercase">Talk to us</label>
        <textarea
          placeholder="Write your message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-md bg-black text-white placeholder:text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="sm:col-span-2 md:col-span-3 flex justify-center mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#E3BB49] text-[#4D3F17] cursor-pointer font-semibold px-12 sm:px-20 py-3 rounded-md hover:bg-black hover:text-white transition uppercase text-sm sm:text-md flex items-center gap-3"
        >
          {loading ? (
            <span
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin logo-color"
              title="Loading"
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>

      <div className="md:col-span-3 mt-2 text-center">
        {loading ? (
          <div className="flex justify-center">
            <svg
              className="w-6 h-6 animate-spin logo-color"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        ) : (
          status && (
            <div
              className={`font-semibold ${
                statusType === "error" ? "text-red-300" : "text-green-300"
              }`}
            >
              {status}
            </div>
          )
        )}
      </div>
    </form>
  );
}
