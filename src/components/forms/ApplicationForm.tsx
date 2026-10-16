'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { applicationSchema, fileCheck, RESUME_FILE_TYPES, type ApplicationInput } from '@/lib/forms';
import { Consent, FileField, Honeypot, SelectField, TextArea, TextField } from './fields';
import { ErrorSummary, SuccessPanel } from './FormStatus';
import { useFormSubmit } from './useFormSubmit';

const labels: Record<string, string> = {
  name: 'Full name',
  email: 'Email',
  phone: 'Phone',
  location: 'Current location',
  position: 'Position',
  experience: 'Experience',
  portfolio: 'Portfolio or LinkedIn',
  resume: 'Résumé',
  consent: 'Privacy consent',
};

export function ApplicationForm({ positions, defaultPosition }: { positions: string[]; defaultPosition?: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, submitCount },
  } = useForm<ApplicationInput>({ resolver: zodResolver(applicationSchema), shouldFocusError: false, mode: 'onTouched', defaultValues: { position: defaultPosition } });
  const { state, submit, reset: resetState } = useFormSubmit<ApplicationInput>('/api/apply', setError);

  if (state.status === 'success') {
    return (
      <SuccessPanel
        title="Application received — thank you."
        reference={state.reference}
        resetLabel="Submit another application"
        onReset={() => {
          reset();
          setFile(null);
          resetState();
        }}
      >
        <p>Our team will review your application and contact you if your profile matches the role. Quote the reference below in any follow-up to careers@sacpl.co.</p>
      </SuccessPanel>
    );
  }

  const submitting = state.status === 'submitting';
  const summary = [...Object.entries(errors).map(([name, e]) => ({ name, label: labels[name] ?? name, message: e?.message as string | undefined })), ...(fileError ? [{ name: 'resume', label: labels.resume, message: fileError }] : [])];

  return (
    <form
      noValidate
      className="relative space-y-8"
      onSubmit={handleSubmit(async (values) => {
        const fe = file ? fileCheck(file, RESUME_FILE_TYPES) : 'Attach your résumé';
        if (fe) return setFileError(fe);
        await submit(values, { resume: file });
      })}
    >
      <p className="text-sm text-steel">
        Fields marked <span className="text-accent">*</span> are required.
      </p>
      {(submitCount > 0 || state.status === 'error') && <ErrorSummary errors={summary} message={state.status === 'error' ? state.message : undefined} />}
      <Honeypot register={register('website')} />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Full name" required autoComplete="name" error={errors.name?.message} {...register('name')} />
        <TextField label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register('email')} />
        <TextField label="Phone" type="tel" required autoComplete="tel" error={errors.phone?.message} {...register('phone')} />
        <TextField label="Current location" required autoComplete="address-level2" placeholder="City" error={errors.location?.message} {...register('location')} />
        <SelectField label="Position" required options={positions} error={errors.position?.message} {...register('position')} />
        <TextField label="Experience" required placeholder="e.g. 4 years" error={errors.experience?.message} {...register('experience')} />
        <TextField
          label="Portfolio or LinkedIn"
          type="url"
          placeholder="https://"
          className="sm:col-span-2"
          error={errors.portfolio?.message}
          {...register('portfolio')}
        />
        <div className="sm:col-span-2">
          <FileField
            label="Résumé"
            name="resume"
            required
            accept={RESUME_FILE_TYPES.join(',')}
            fileName={file?.name}
            hint="PDF, DOC or DOCX — up to 4 MB."
            error={fileError}
            onFile={(f) => {
              setFile(f);
              setFileError(f ? (fileCheck(f, RESUME_FILE_TYPES) ?? undefined) : undefined);
            }}
          />
        </div>
        <TextArea label="Cover message" className="sm:col-span-2" rows={5} error={errors.message?.message} {...register('message')} />
      </div>

      <Consent error={errors.consent?.message} {...register('consent')}>
        I agree that SACPL may store and use my details to assess this application, as described in the{' '}
        <Link href="/privacy" className="text-navy underline underline-offset-2">
          privacy notice
        </Link>
        .
      </Consent>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex min-h-13 items-center gap-3 bg-ink px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-navy disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" /> Submitting application…
          </>
        ) : (
          <>
            Submit application <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
