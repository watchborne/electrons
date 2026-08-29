import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ColorPill, COLOR_NAMES, StatusPill, STATUS_TONES } from "../status-pill";

afterEach(cleanup);

describe("ColorPill", () => {
  it("SHOULD render its children WHEN given text content", () => {
    render(<ColorPill color="green">Green</ColorPill>);

    expect(screen.getByText("Green")).not.toBeNull();
  });

  it.each(COLOR_NAMES)("SHOULD render WHEN color is %s", (color) => {
    render(<ColorPill color={color}>{color}</ColorPill>);

    expect(screen.getByText(color)).not.toBeNull();
  });
});

describe("StatusPill (backward compatibility)", () => {
  it("SHOULD render its children WHEN given text content", () => {
    render(<StatusPill tone="green">Green</StatusPill>);

    expect(screen.getByText("Green")).not.toBeNull();
  });

  it.each(STATUS_TONES)("SHOULD render WHEN tone is %s", (tone) => {
    render(<StatusPill tone={tone}>{tone}</StatusPill>);

    expect(screen.getByText(tone)).not.toBeNull();
  });
});
