'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { sendInquiry } from '@/app/actions/sendEmail';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
type FieldErrors = Partial<Record<'name' | 'email' | 'company' | 'message', string>>;

function validateFields(data: {
  name: string;
  email: string;
  company: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name) errors.name = 'Required';
  if (!data.email) {
    errors.email = 'Required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!data.company) errors.company = 'Required';
  if (!data.message) errors.message = 'Required';
  return errors;
}

export function CTASection() {
  const [formOpen, setFormOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  function handleToggle() {
    if (formOpen) {
      setFormOpen(false);
    } else {
      setFormOpen(true);
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40 lg:py-48">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-backdrop opacity-30" />
      <div className="container-dn relative">

        {/* CTA */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="serif-display font-light text-[34px] leading-[1.12] tracking-tightserif text-ink md:text-[54px] lg:text-[64px]">
            Need sharper positioning,
            <br className="hidden sm:block" />{' '}
            stronger digital assets, or a{' '}
            <em className="italic">clearer path forward?</em>
          </h2>
          <div className="mt-10 flex flex-col items-center gap-x-6 gap-y-3 sm:flex-row sm:justify-center md:mt-14">
            <button type="button" onClick={handleToggle} className="btn-primary">
              Start the conversation
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                aria-hidden="true"
                style={{
                  transform: formOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>
            <Link href="#services" className="link-quiet opacity-75">
              Explore services
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Inquiry panel — grid-template-rows trick for smooth height reveal */}
        <div
          aria-hidden={!formOpen}
          style={{
            display: 'grid',
            gridTemplateRows: formOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div
              ref={panelRef}
              style={{
                opacity: formOpen ? 1 : 0,
                transform: formOpen ? 'translateY(0)' : 'translateY(10px)',
                transition:
                  'opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.1s',
              }}
              className="mx-auto mt-20 max-w-xl border-t border-paper-line pb-4 pt-14"
            >
              <InquiryPanel />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function InquiryPanel() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const values = {
      name: (formData.get('name') as string).trim(),
      email: (formData.get('email') as string).trim(),
      company: (formData.get('company') as string).trim(),
      message: (formData.get('message') as string).trim(),
    };

    const errors = validateFields(values);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setApiError('');
    setStatus('submitting');

    try {
      const result = await sendInquiry(formData);
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setApiError(result.error);
      }
    } catch {
      setStatus('error');
      setApiError('Something went wrong. Please try again or email us directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className="py-4">
        <p className="eyebrow mb-6">Sent</p>
        <p className="serif-display font-light text-[26px] leading-[1.15] tracking-tightserif text-ink">
          Thank you. We&apos;ll be in touch.
        </p>
        <p className="mt-4 text-[14px] leading-relaxed text-ink/50">
          We typically respond within one business day.
        </p>
      </div>
    );
  }

  const isSubmitting = status === 'submitting';

  return (
    <>
      <p className="eyebrow mb-5">Inquiry</p>
      <h3 className="serif-display font-light text-[26px] leading-[1.15] tracking-tightserif text-ink">
        Start the conversation
      </h3>
      <p className="mt-3 text-[14px] leading-relaxed text-ink/55">
        Share a few details and we&apos;ll see if there&apos;s a fit.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-10">
        <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
          <FormField
            label="Name"
            name="name"
            type="text"
            placeholder="Your name"
            error={fieldErrors.name}
            required
          />
          <FormField
            label="Work email"
            name="email"
            type="email"
            placeholder="you@company.com"
            error={fieldErrors.email}
            required
          />
          <FormField
            label="Company"
            name="company"
            type="text"
            placeholder="Company name"
            error={fieldErrors.company}
            required
          />
          <FormField
            label="Website or relevant link"
            name="website"
            type="url"
            placeholder="https://"
          />
        </div>

        <div className="mt-7">
          <FormTextarea
            label="What are you looking to improve?"
            name="message"
            placeholder="A short note about your business, goals, or where you need help"
            error={fieldErrors.message}
            required
          />
        </div>

        {apiError && (
          <p className="mt-5 text-[13px] text-red-500">{apiError}</p>
        )}

        <div className="mt-10 space-y-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? 'Sending…' : 'Send inquiry'}
            {!isSubmitting && (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            )}
          </button>
          <p className="text-[13px] text-ink/40">
            Prefer email?{' '}
            <Link
              href="mailto:hello@drapernorwood.com"
              className="text-ink/60 underline underline-offset-2 transition-colors duration-200 hover:text-ink"
            >
              hello@drapernorwood.com
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  error?: string;
  required?: boolean;
}

function FormField({ label, name, type, placeholder, error, required }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2.5 block text-[10px] font-medium uppercase text-ink/40"
        style={{ letterSpacing: '0.16em' }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-invalid={error ? true : undefined}
        className="w-full border-b border-paper-line bg-transparent py-3 text-[15px] text-ink placeholder:text-ink/25 transition-colors duration-200 ease-smooth focus:border-ink/40 focus:outline-none"
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-[12px] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

interface FormTextareaProps {
  label: string;
  name: string;
  placeholder: string;
  error?: string;
  required?: boolean;
}

function FormTextarea({ label, name, placeholder, error, required }: FormTextareaProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2.5 block text-[10px] font-medium uppercase text-ink/40"
        style={{ letterSpacing: '0.16em' }}
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        placeholder={placeholder}
        required={required}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-invalid={error ? true : undefined}
        className="w-full resize-none border-b border-paper-line bg-transparent py-3 text-[15px] text-ink placeholder:text-ink/25 transition-colors duration-200 ease-smooth focus:border-ink/40 focus:outline-none"
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-[12px] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
