"use client";

import { useState, type FormEvent } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", "6ff1b060-8e0d-460a-940f-413489c82349");
    formData.append("from_name", "THE FISHERMEN Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#071827] text-[#eee8da]">
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="mb-6 text-xs tracking-[0.3em] text-[#bdb5a5]">
              CONTACT
            </p>

            <h1 className="font-serif text-5xl leading-tight md:text-7xl">
              Get in touch.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#aeb9bd]">
              Για ερωτήσεις, συνεργασίες ή συζητήσεις γύρω από το ποδόσφαιρο, 
              θα χαρούμε να επικοινωνήσεις μαζί μας.
            </p>
          </div>

          <div className="mb-12 border-y border-[#294052] py-7 text-center">
            <p className="mb-3 text-xs tracking-[0.2em] text-[#9daab0]">
              OUR EMAIL
            </p>

            <a
              href="mailto:thefishermen2026@gmail.com"
              className="break-all text-base text-[#eee8da] underline decoration-[#526675] underline-offset-8 transition-colors hover:text-[#bdb5a5] md:text-lg"
            >
              thefishermen2026@gmail.com
            </a>
          </div>

          <div>
            <h2 className="font-serif text-3xl md:text-4xl">
              Or send us a message.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#aeb9bd]">
              Συμπλήρωσε την παρακάτω φόρμα και θα επικοινωνήσουμε μαζί σου.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs tracking-[0.12em] text-[#bdb5a5]">
                  YOUR NAME
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Enter your name"
                  className="w-full border border-[#294052] bg-[#0c2234] px-4 py-4 text-sm text-[#eee8da] outline-none transition-colors placeholder:text-[#73838d] focus:border-[#9daab0]"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-xs tracking-[0.12em] text-[#bdb5a5]">
                  YOUR EMAIL
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="you@example.com"
                  className="w-full border border-[#294052] bg-[#0c2234] px-4 py-4 text-sm text-[#eee8da] outline-none transition-colors placeholder:text-[#73838d] focus:border-[#9daab0]"
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-xs tracking-[0.12em] text-[#bdb5a5]">
                  SUBJECT
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  defaultValue="General enquiry"
                  className="w-full border border-[#294052] bg-[#0c2234] px-4 py-4 text-sm text-[#eee8da] outline-none focus:border-[#9daab0]"
                >
                  <option>General enquiry</option>
                  <option>Scouting</option>
                  <option>Recruitment</option>
                  <option>Collaboration</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-xs tracking-[0.12em] text-[#bdb5a5]">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={6}
                  placeholder="Write your message here..."
                  className="w-full resize-y border border-[#294052] bg-[#0c2234] px-4 py-4 text-sm leading-6 text-[#eee8da] outline-none transition-colors placeholder:text-[#73838d] focus:border-[#9daab0]"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full border border-[#eee8da] px-6 py-4 text-xs tracking-[0.2em] text-[#eee8da] transition-colors hover:bg-[#eee8da] hover:text-[#071827] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "SENDING..." : "SEND MESSAGE →"}
              </button>

              {status === "success" && (
                <p role="status" className="border border-[#426b5a] p-4 text-sm leading-6 text-[#c1e2d0]">
                  Thank you. Your message has been sent successfully.
                </p>
              )}

              {status === "error" && (
                <p role="alert" className="border border-[#8b5555] p-4 text-sm leading-6 text-[#f0c3c3]">
                  Your message could not be sent. Please try again or email us directly at thefishermen2026@gmail.com.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}