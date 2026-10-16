'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { ENQUIRY_FILE_TYPES, enquirySchema, fileCheck, projectTypeOptions, serviceOptions, timelineOptions, type EnquiryInput } from '@/lib/forms';
import { Consent, FileField, Honeypot, SelectField, TextArea, TextField } from './fields';
import { ErrorSummary, SuccessPanel } from './FormStatus';
import { useFormSubmit } from './useFormSubmit';

const labels: Partial<Record<keyof EnquiryInput | 'document', string>> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  projectLocation: 'Project location',
  service: 'Service required',
  projectType: 'Project type',
  timeline: 'Expected timeline',
  message: 'Project details',
  consent: 'Privacy consent',
};

export function EnquiryForm({ defaultService }: { defaultService?: (typeof serviceOptions)[number] }) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, submitCount },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    shouldFocusError: false, // the error summary takes focus and links to each field
    mode: 'onTouched',
    defaultValues: { service: defaultService },
  });
  const { state, submit, reset: resetState } = useFormSubmit<EnquiryInput>('/api/enquiry', setError);

  if (state.status === 'success') {
    return (
      <SuccessPanel
        title="Thank you — your enquiry has been received."
        reference={state.reference}
        resetLabel="Send another enquiry"
        onReset={() => {
          reset();
          setFile(null);
          resetState();
        }}
      >
        <p>An SACPL engineer will review your project details and reply to the email address you provided. Please quote the reference below if you contact us about this enquiry.</p>
      </SuccessPanel>
    );
  }

  const submitting = state.status === 'submitting';
  const summary = Object.entries(errors).map(([name, e]) => ({ name, label: labels[name as keyof typeof labels] ?? name, message: e?.message as string | undefined }));

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (values) => {
        const fe = fileCheck(file, ENQUIRY_FILE_TYPES);
        if (fe) return setFileError(fe);
        await submit(values, { document: file });
      })}
      className="relative space-y-8"
      aria-describedby="enquiry-required-note"
    >
      <p id="enquiry-required-note" className="text-sm text-steel">
        Fields marked <span className="text-accent">*</span> are required.
      </p>
      {(submitCount > 0 || state.status === 'error') && <ErrorSummary errors={summary} message={state.status === 'error' ? state.message : undefined} />}
      <Honeypot register={register('website')} />

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="eyebrow mb-6 text-steel">01 — About you</legend>
        <TextField label="Name" required autoComplete="name" error={errors.name?.message} {...register('name')} />
        <TextField label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register('email')} />
        <TextField label="Phone" type="tel" required autoComplete="tel" error={errors.phone?.message} {...register('phone')} />
        <TextField label="Company" autoComplete="organization" error={errors.company?.message} {...register('company')} />
      </fieldset>

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="eyebrow mb-6 text-steel">02 — Your project</legend>
        <TextField label="Project location" required placeholder="City, state / country" error={errors.projectLocation?.message} {...register('projectLocation')} />
        <SelectField label="Service required" required options={serviceOptions} error={errors.service?.message} {...register('service')} />
        <SelectField label="Project type" required options={projectTypeOptions} error={errors.projectType?.message} {...register('projectType')} />
        <TextField label="Approximate project area" placeholder="e.g. 4 lakh sq ft / 37,000 m²" error={errors.projectArea?.message} {...register('projectArea')} />
        <SelectField label="Expected timeline" required options={timelineOptions} error={errors.timeline?.message} {...register('timeline')} className="sm:col-span-2" />
        <TextArea
          label="Project details"
          required
          className="sm:col-span-2"
          hint="Scope, number of storeys, structural system if known, and the stage the design is at."
          error={errors.message?.message}
          {...register('message')}
        />
        <div className="sm:col-span-2">
          <FileField
            label="Supporting document"
            name="document"
            accept={ENQUIRY_FILE_TYPES.join(',')}
            fileName={file?.name}
            hint="PDF, DWG, DXF, ZIP, JPG or PNG — up to 4 MB."
            error={fileError}
            onFile={(f) => {
              setFile(f);
              setFileError(fileCheck(f, ENQUIRY_FILE_TYPES) ?? undefined);
            }}
          />
        </div>
      </fieldset>

      <Consent error={errors.consent?.message} {...register('consent')}>
        I agree that SACPL may use these details to respond to my enquiry, as described in the{' '}
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
            <Loader2 aria-hidden className="size-4 animate-spin" /> Sending enquiry…
          </>
        ) : (
          <>
            Submit project enquiry <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
      <p className="sr-only" aria-live="polite">
        {submitting ? 'Sending your enquiry' : ''}
      </p>
    </form>
  );
}
