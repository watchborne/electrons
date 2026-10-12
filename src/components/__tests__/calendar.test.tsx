import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Calendar } from "../calendar";

afterEach(cleanup);

// A fixed month keeps the grid (and the day numbers) stable.
const october = new Date(2026, 9, 1);

describe("Calendar", () => {
  it("SHOULD render the month and its days", () => {
    render(<Calendar mode="single" defaultMonth={october} />);

    expect(screen.getByRole("grid")).not.toBeNull();
    expect(screen.getByText(/October 2026/)).not.toBeNull();
    expect(screen.getByRole("button", { name: /October 8(th)?, 2026/ })).not.toBeNull();
  });

  it("SHOULD report the picked day WHEN one is clicked", () => {
    const onSelect = vi.fn();
    render(<Calendar mode="single" defaultMonth={october} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole("button", { name: /October 8(th)?, 2026/ }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    const picked = onSelect.mock.calls[0][0] as Date;
    expect([picked.getFullYear(), picked.getMonth(), picked.getDate()]).toEqual([2026, 9, 8]);
  });

  it("SHOULD flag the selected day", () => {
    render(<Calendar mode="single" defaultMonth={october} selected={new Date(2026, 9, 8)} />);

    const day = screen.getByRole("button", { name: /October 8(th)?, 2026/ });
    expect(day.getAttribute("data-selected-single")).toBe("true");
  });

  it("SHOULD not let a disabled day be picked", () => {
    const onSelect = vi.fn();
    render(
      <Calendar
        mode="single"
        defaultMonth={october}
        onSelect={onSelect}
        disabled={{ before: new Date(2026, 9, 10) }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /October 8(th)?, 2026/ }));

    expect(onSelect).not.toHaveBeenCalled();
  });

  it("SHOULD hide the days of the neighbouring months WHEN showOutsideDays is off", () => {
    render(<Calendar mode="single" defaultMonth={october} showOutsideDays={false} />);

    expect(screen.queryByRole("button", { name: /November 1(st)?, 2026/ })).toBeNull();
  });

  it("SHOULD merge a custom className", () => {
    const { container } = render(
      <Calendar mode="single" defaultMonth={october} className="shadow-lg" />,
    );

    expect(container.querySelector('[data-slot="calendar"]')?.className).toContain("shadow-lg");
  });
});
