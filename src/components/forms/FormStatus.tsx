export interface FormResponse { ok: boolean; message?: string; reference?: string; fieldErrors?: Record<string, string[]> }

export function FormStatus({ response, submitting }: { response: FormResponse | null; submitting: boolean }) {
  if (submitting) return <div className="form-status is-loading" role="status"><i className="far fa-spinner-third fa-spin" aria-hidden="true" /> Saving securely…</div>;
  if (!response) return null;
  return <div className={`form-status ${response.ok ? "is-success" : "is-error"}`} role={response.ok ? "status" : "alert"}><i className={response.ok ? "far fa-check-circle" : "far fa-exclamation-circle"} aria-hidden="true" /><div><strong>{response.ok ? "Submission received" : "Submission not saved"}</strong><p>{response.message ?? (response.ok ? "Keep this reference for follow-up." : "Review the form and try again.")}</p>{response.reference && <code>{response.reference}</code>}</div></div>;
}
