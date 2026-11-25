import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnquirySchema, type Enquiry, type Product } from "@catalogue/contracts";
import { api } from "../../api/client";

type EnquiryFormProps = {
  product: Product;
};

export default function EnquiryForm({ product }: EnquiryFormProps) {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Enquiry>({
    resolver: zodResolver(EnquirySchema),
    defaultValues: {
      productId: product.id,
      productTitle: product.title,
      name: "",
      email: "",
      phone: "",
      message: "",
      website: ""
    }
  });

  const submit = async (data: Enquiry) => {
    setSubmitError(null);
    try {
      await api.enquiry(data);
      setSent(true);
    } catch {
      setSubmitError("We could not send your enquiry. Please try again.");
    }
  };

  if (sent) {
    return (
      <div className="success">
        <h3>Thank you!</h3>
        <p>Your enquiry has been sent. Our team will be in touch.</p>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit(submit)}>
      <h2>Enquire about this product</h2>
      <input type="hidden" {...register("productId", { valueAsNumber: true })} />
      <input type="hidden" {...register("productTitle")} />

      <label>
        Your name
        <input {...register("name")} />
        {errors.name && <small>{errors.name.message}</small>}
      </label>

      <label>
        Email address
        <input type="email" {...register("email")} />
        {errors.email && <small>{errors.email.message}</small>}
      </label>

      <label>
        Phone (optional)
        <input {...register("phone")} />
      </label>

      <label>
        Message
        <textarea rows={4} {...register("message")} />
        {errors.message && <small>{errors.message.message}</small>}
      </label>

      <label className="honeypot" aria-hidden="true">
        Website
        <input tabIndex={-1} autoComplete="off" {...register("website")} />
      </label>

      {submitError && <p className="form-error" role="alert">{submitError}</p>}

      <button disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
