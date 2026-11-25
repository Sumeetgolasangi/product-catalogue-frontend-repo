import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "../../src/components/common/Loading";
import ErrorState from "../../src/components/common/ErrorState";

 describe("common components", () => {
  it("shows the loading state", () => {
    render(<Loading />);
    expect(screen.getByText("Loading products…")).toBeInTheDocument();
  });

  it("shows the supplied error message", () => {
    render(<ErrorState message="Unable to load catalogue" />);
    expect(screen.getByText("Unable to load catalogue")).toBeInTheDocument();
  });
});
