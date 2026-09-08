"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { sendInquiry } from "@/app/actions/sendEmail";
export function CTASection({
  initialMessage = "",
}: {
  initialMessage?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [openedAt, setOpenedAt] = useState(0);
  const confirmation = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage.slice(0, 5000));
      setStatus("idle");
    }
  }, [initialMessage]);
  useEffect(() => setOpenedAt(Date.now()), []);
  useEffect(() => {
    if (status === "sent") confirmation.current?.focus();
  }, [status]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const result = await sendInquiry(new FormData(event.currentTarget));
      if (result.success) setStatus("sent");
      else {
        setStatus("error");
        setError(result.error);
      }
    } catch {
      setStatus("error");
      setError(
        "Your inquiry could not be sent. Please try again or email hello@drapernorwood.com.",
      );
    }
  }
  return (
    <section id="contact" className="contact-section">
      <div className="shell contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">03 / Start a conversation</p>
          <h2>
            Let’s see what
            <br />
            <em>could be.</em>
          </h2>
          <p>
            Bring the business. The ambition.
            <br />
            The thing that isn’t quite working.
          </p>
          <p>
            You don’t need a perfect brief.
            <br />
            Start with what’s there.
          </p>
          <a className="contact-email" href="mailto:hello@drapernorwood.com">
            hello@drapernorwood.com <span aria-hidden="true">↗</span>
          </a>
        </div>
        {status === "sent" ? (
          <div
            className="form-success"
            role="status"
            tabIndex={-1}
            ref={confirmation}
          >
            <span className="eyebrow">Inquiry received</span>
            <h3>
              Something to
              <br />
              <em>build from.</em>
            </h3>
            <p>Thank you. We’ll be in touch.</p>
            <button
              className="text-link"
              onClick={() => {
                setStatus("idle");
                setOpenedAt(Date.now());
              }}
            >
              Send another inquiry <span aria-hidden="true">↗</span>
            </button>
          </div>
        ) : (
          <form
            className="inquiry-form"
            onSubmit={submit}
            aria-label="Project inquiry"
            aria-busy={status === "sending"}
          >
            <p className="form-intro">
              Tell us a little about the business.
              <br />
              <span>Fields marked * are required.</span>
            </p>
            <input type="hidden" name="_ft" value={openedAt} />
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="other">Leave this empty</label>
              <input id="other" name="_hp" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="form-grid">
              <label htmlFor="name">
                Your name *
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={120}
                  placeholder="First and last name"
                />
              </label>
              <label htmlFor="email">
                Work email *
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="you@company.com"
                />
              </label>
              <label htmlFor="company">
                Company *
                <input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  required
                  maxLength={160}
                  placeholder="Company or organization"
                />
              </label>
              <label htmlFor="website">
                Website / relevant link
                <input
                  id="website"
                  name="website"
                  type="url"
                  autoComplete="url"
                  maxLength={2048}
                  placeholder="https://"
                />
              </label>
            </div>
            <label htmlFor="message">
              What could be stronger? *
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                maxLength={5000}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="What you do. What’s getting in the way. What you have in mind."
              />
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="form-bottom">
              <span>
                A direct conversation.
                <br />
                No mailing list.
              </span>
              <button
                type="submit"
                className="submit-button"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send inquiry"}
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
