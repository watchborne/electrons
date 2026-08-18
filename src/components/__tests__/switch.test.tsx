import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Switch } from "../switch";

afterEach(cleanup);

describe("Switch", () => {
  it("SHOULD render unchecked by default", () => {
    render(<Switch aria-label="Real-time alerts" />);

    expect(screen.getByRole("switch").getAttribute("aria-checked")).toBe("false");
  });

  it("SHOULD render checked WHEN the checked prop is set", () => {
    render(<Switch aria-label="Real-time alerts" checked readOnly />);

    expect(screen.getByRole("switch").getAttribute("aria-checked")).toBe("true");
  });

  it("SHOULD call onCheckedChange WHEN clicked", () => {
    let checked: boolean | undefined;
    render(<Switch aria-label="Real-time alerts" onCheckedChange={(value) => (checked = value)} />);

    fireEvent.click(screen.getByRole("switch"));

    expect(checked).toBe(true);
  });
});
