import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { StatCard } from "../stat-card";

afterEach(cleanup);

describe("StatCard", () => {
  it("SHOULD render the title, value and subtitle WHEN all are provided", () => {
    render(<StatCard title="Charge points" value={42} subtitle="+3 this week" icon={<span />} />);

    expect(screen.getByText("Charge points")).not.toBeNull();
    expect(screen.getByText("42")).not.toBeNull();
    expect(screen.getByText("+3 this week")).not.toBeNull();
  });
});
