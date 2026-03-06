import * as z from "zod";

function hasError(obj: Record<string, string | null>) {
  return Object.keys(obj).some((key) => {
    return obj[key] === null;
  });
}

function validateFields(
  fields: Record<string, any>,
  zodSchema: z.ZodObject,
  fieldErrors: Record<string, string | null>,
) {
  const validationResult = zodSchema.safeParse(fields);

  if (!validationResult.success) {
    validationResult.error.issues.forEach((error) => {
      if (error.path && error.path.length > 0) {
        const fieldName = error.path[0] as string;
        if (fieldName in fieldErrors) {
          fieldErrors[fieldName] = error.message;
        }
      }
    });
    return false;
  }

  Object.keys(fieldErrors).forEach((key) => {
    fieldErrors[key] = null;
  });

  return true;
}

export default function (
  fields: Record<string, any>,
  submitter: (fields: Record<string, any>) => Promise<void>,
  zodSchema: z.ZodObject,
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
      const isValid = validateFields(this.fields, zodSchema, this.fieldErrors);

      if (!isValid) {
        this.processing = false;
        return;
      }

      this.processing = true;
      this.submitError = null;

      try {
        await submitter(this.fields);
      } catch (error) {
        this.submitError = error;
      } finally {
        this.processing = false;
      }
    },
  });
}
