import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "@/components/layout/logo";

describe("Logo", () => {
  it("renders logo component", () => {
    render(<Logo />);
    const logo = screen.getByRole("img", { name: /fix/i });
    expect(logo).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { container: sm } = render(<Logo size="sm" />);
    const { container: lg } = render(<Logo size="lg" />);
    expect(sm.querySelector('[style*="36"]')).toBeInTheDocument();
    expect(lg.querySelector('[style*="64"]')).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Logo className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});