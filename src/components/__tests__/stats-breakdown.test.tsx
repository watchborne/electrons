import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { StatsBreakdown } from "../stats-breakdown";

afterEach(cleanup);

const buckets = [
  { label: "Online", value: 12, subtitle: "of 15" },
  { label: "Offline", value: 3 },
];

describe("StatsBreakdown", () => {
  it("SHOULD render the title and subtitle WHEN given", () => {
    render(<StatsBreakdown title="Fleet" subtitle="Last 7 days" buckets={buckets} />);

    expect(screen.getByRole("heading", { name: "Fleet" })).toBeTruthy();
    expect(screen.getByText("Last 7 days")).toBeTruthy();
  });

  it("SHOULD render one card per bucket WHEN buckets are given", () => {
    render(<StatsBreakdown title="Fleet" buckets={buckets} />);

    expect(screen.getByText("Online")).toBeTruthy();
    expect(screen.getByText("12")).toBeTruthy();
    expect(screen.getByText("of 15")).toBeTruthy();
    expect(screen.getByText("Offline")).toBeTruthy();
    expect(screen.getByText("3")).toBeTruthy();
  });

  it("SHOULD lay the cards out in the requested number of columns WHEN columns is set", () => {
    const { container } = render(<StatsBreakdown title="Fleet" buckets={buckets} columns={2} />);

    expect(container.querySelector(".grid-cols-2")).not.toBeNull();
  });

  it("SHOULD use the className INSTEAD OF the column classes WHEN className is set", () => {
    const { container } = render(
      <StatsBreakdown title="Fleet" buckets={buckets} className="flex gap-2" />,
    );

    expect(container.querySelector(".flex.gap-2")).not.toBeNull();
    expect(container.querySelector(".grid-cols-4")).toBeNull();
  });
});
