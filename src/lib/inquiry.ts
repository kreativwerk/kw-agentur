export type InquiryDraft = {
  project_type?: string;
  description?: string;
  budget?: string;
  timeline?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
};

export const inquiryFieldOrder: (keyof InquiryDraft)[] = [
  "project_type",
  "description",
  "budget",
  "timeline",
  "name",
  "company",
  "email",
  "phone",
];

export function isSubmittable(draft: InquiryDraft): boolean {
  return Boolean(draft.project_type && draft.description && draft.name && draft.email);
}
