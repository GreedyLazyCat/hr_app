function hasError(obj: Record<string, string | null>) {
  return Object.keys(obj).some((key) => {
    return obj[key] === null;
  });
}
export default function (
  fields: Record<string, any>,
  submitter: (fields: Record<string, any>) => Promise<void>,
) {
  const fieldErrors: Record<string, string | null> = {};
  Object.keys(fields).forEach((key) => {
    fieldErrors[key] = null;
  });

  return reactive({
    fields,
    fieldErrors,
    processing: false,
    submitError: null as unknown | null,
    async submit() {
      if (this.processing) return;
      if (hasError(fieldErrors)) return;

      this.submitError = null;
      this.processing = true;

      try {
        await submitter(this.fields);
      } catch (error) {
        this.submitError = error;
      }
    },
  });
}
