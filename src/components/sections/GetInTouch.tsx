"use client";

import { useState } from "react";

export default function GetInTouch({
  d,
  dealsHomepage,
}: {
  d: any;
  dealsHomepage: any;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/company-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          subject,
          message,
          receiverEmail: d?.contactEmail,
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
        setPhone("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      setStatusType("error");
      setStatus("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setStatus("");
        setStatusType("");
      }, 5000);
    }
  };

  const hasData =
    d?.contactMainDescription ||
    d?.contactStateName ||
    d?.contactAddress ||
    d?.contactPhone ||
    d?.contactEmail ||
    d?.contactLocation ||
    d?.contactTiming ||
    d?.contactLocationMap ||
    d?.facebook ||
    d?.twitter ||
    d?.instagram ||
    d?.linkedin ||
    d?.youtube ||
    d?.googlePlay ||
    d?.appStore;

  if (!hasData) return null;

  return (
    <section id="get-in-touch" className="mb-16 px-4 sm:px-1 md:px-2">
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-medium text-black font-lexend-deca uppercase section-heading-border">
          Get In Touch
        </h2>

        {d?.contactMainDescription && (
          <h3
            className="text-xl sm:text-2xl mx-auto px-4 sm:px-5 md:px-20 font-dmsans text-black mt-16"
            dangerouslySetInnerHTML={{ __html: d?.contactMainDescription }}
          ></h3>
        )}
      </div>

      <div className="container mx-auto px-2 sm:px-3 md:px-4 flex flex-col md:grid gap-2 md:gap-4 md:grid-cols-[25%_75%]">
        {/* Left Panel */}
        <div className="bg-[#4D3F17] text-white rounded-3xl p-6 space-y-8">
          <div>
            <h4 className="font-semibold text-md mb-2">
              {d?.contactStateName}
            </h4>
            <div className="font-poppins font-normal text-sm mb-5 space-y-2">
              <div className="mb-3 max-w-md">{d?.contactAddress}</div>

              <div className="space-y-1">
                {d?.contactPhone && (
                  <div className="flex items-center gap-4">
                    <img
                      src="/icons/contactusicons/phone-alt.svg"
                      alt="Phone"
                      className="w-4 h-4"
                    />
                    <span>{d?.contactPhone}</span>
                  </div>
                )}
                {d?.contactEmail && (
                  <div className="flex items-center gap-2">
                    <img
                      src="/icons/contactusicons/envelope.svg"
                      alt="Email"
                      className="w-6 h-6"
                    />
                    <span className="break-all">{d?.contactEmail}</span>
                  </div>
                )}
                {d?.contactLocation && (
                  <div className="flex items-center gap-4">
                    <img
                      src="/icons/contactusicons/map-marker-alt.svg"
                      alt="Location"
                      className="w-4 h-4"
                    />
                    <span>{d?.contactLocation}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {d?.contactTiming && (
            <div>
              <h4 className="font-semibold mt-4">Timing</h4>
              <p
                className="text-sm font-poppins"
                dangerouslySetInnerHTML={{ __html: d?.contactTiming }}
              ></p>
            </div>
          )}

          {d?.contactLocationMap && (
            <div>
              <h4 className="font-semibold mb-2">Find us</h4>
              <div
                className="w-full aspect-video overflow-hidden"
                dangerouslySetInnerHTML={{ __html: d.contactLocationMap }}
              />
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="bg-[#4D3F17] text-white rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
              Let us know how we can help
            </h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white"
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                placeholder="Name"
                className="w-full px-5 py-3 rounded-md bg-white text-black"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                type="tel"
                placeholder="Phone Number"
                className="w-full px-5 py-3 rounded-md bg-white text-black"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="Email"
                className="w-full px-5 py-3 rounded-md bg-white text-black"
              />
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                type="text"
                placeholder="Subject"
                className="w-full px-5 py-3 rounded-md bg-white text-black"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Message"
                className="w-full px-5 py-3 rounded-md bg-white text-black md:col-span-2"
              ></textarea>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-[#E3BB49] text-[#4D3F17] font-semibold px-6 py-3 cursor-pointer rounded-md hover:text-white hover:bg-yellow-800 transition uppercase"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>

              <div className="md:col-span-2 mt-2 text-left">
                {loading ? (
                  <div className="flex justify-start">
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
                        statusType === "error"
                          ? "text-red-300"
                          : "text-green-300"
                      }`}
                    >
                      {status}
                    </div>
                  )
                )}
              </div>
            </form>
          </div>

          {(d?.facebook ||
            d?.twitter ||
            d?.instagram ||
            d?.linkedin ||
            d?.youtube ||
            d?.googlePlay ||
            d?.appStore) && (
            <div className="mt-6 flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h4 className="font-semibold text-xl">Follow Us:</h4>
                {d?.facebook && (
                  <a
                    href={d.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/icons/contactusicons/facebook.svg"
                      alt="Facebook"
                      className="w-6 h-6"
                    />
                  </a>
                )}
                {d?.twitter && (
                  <a href={d.twitter} target="_blank" rel="noopener noreferrer">
                    <img
                      src="/icons/contactusicons/twitter.svg"
                      alt="Twitter"
                      className="w-6 h-6"
                    />
                  </a>
                )}
                {d?.instagram && (
                  <a
                    href={d.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/icons/contactusicons/instagram.svg"
                      alt="Instagram"
                      className="w-6 h-6"
                    />
                  </a>
                )}
                {d?.linkedin && (
                  <a
                    href={d.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/icons/contactusicons/linkedin.svg"
                      alt="LinkedIn"
                      className="w-6 h-6"
                    />
                  </a>
                )}
                {d?.youtube && (
                  <a href={d.youtube} target="_blank" rel="noopener noreferrer">
                    <img
                      src="/icons/contactusicons/youtube.svg"
                      alt="YouTube"
                      className="w-6 h-6"
                    />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {d?.googlePlay && (
                  <>
                    <h4 className="font-semibold text-md">Google Play</h4>
                    <a
                      href={d.googlePlay}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/icons/contactusicons/google-play.svg"
                        alt="Google Play"
                        className="w-6 h-6"
                      />
                    </a>
                  </>
                )}
                {d?.appStore && (
                  <>
                    <h4 className="font-semibold text-md">App Store</h4>
                    <a
                      href={d.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/icons/contactusicons/app-store-ios.svg"
                        alt="App Store"
                        className="w-6 h-6"
                      />
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
