import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import EnquiryForm from "../../src/components/enquiry/EnquiryForm";
import { api } from "../../src/api/client";
import { product, renderWithProviders } from "../test-utils";

vi.mock("../../src/api/client", () => ({ api: { enquiry: vi.fn() } }));
const submitEnquiry = vi.mocked(api.enquiry);

describe("EnquiryForm", () => {
  beforeEach(() => submitEnquiry.mockResolvedValue({ message: "Enquiry received" }));

  it("validates required fields and message length", async () => {
    renderWithProviders(<EnquiryForm product={product} />);
    fireEvent.click(screen.getByRole("button", { name: "Send enquiry" }));
    expect(await screen.findByText(/at least 1 character/i)).toBeInTheDocument();
    expect(submitEnquiry).not.toHaveBeenCalled();
  });

  it("submits valid enquiry data and shows confirmation", async () => {
    renderWithProviders(<EnquiryForm product={product} />);
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Alex Customer" } });
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "alex@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Please share availability and delivery details." } });
    fireEvent.click(screen.getByRole("button", { name: "Send enquiry" }));

    await waitFor(() => expect(submitEnquiry).toHaveBeenCalledWith(expect.objectContaining({
      productId: product.id,
      productTitle: product.title,
      name: "Alex Customer",
      email: "alex@example.com"
    })));
    expect(await screen.findByRole("heading", { name: "Thank you!" })).toBeInTheDocument();
  });

  it("does not show success when the API request fails", async () => {
    submitEnquiry.mockRejectedValueOnce(new Error("Server unavailable"));
    renderWithProviders(<EnquiryForm product={product} />);
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Alex Customer" } });
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "alex@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Please share availability and delivery details." } });
    fireEvent.click(screen.getByRole("button", { name: "Send enquiry" }));
    await waitFor(() => expect(submitEnquiry).toHaveBeenCalled());
    expect(await screen.findByRole("alert")).toHaveTextContent("We could not send your enquiry");
    expect(screen.queryByRole("heading", { name: "Thank you!" })).not.toBeInTheDocument();
  });
});
