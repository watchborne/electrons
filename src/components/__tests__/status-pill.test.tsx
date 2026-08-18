import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { StatusPill, STATUS_TONES } from "../status-pill";

afterEach(cleanup);

describe("StatusPill", () => {
  it("SHOULD render its children WHEN given text content", () => {
    render(<StatusPill tone="available">Available</StatusPill>);

    expect(screen.getByText("Available")).not.toBeNull();
  });

  it.each(STATUS_TONES)("SHOULD render WHEN tone is %s", (tone) => {
    render(<StatusPill tone={tone}>{tone}</StatusPill>);

    expect(screen.getByText(tone)).not.toBeNull();
  });
});
