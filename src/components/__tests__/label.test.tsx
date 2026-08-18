import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Label } from "../label";

afterEach(cleanup);

describe("Label", () => {
  it("SHOULD render its children WHEN given text content", () => {
    render(<Label htmlFor="name">Station name</Label>);

    expect(screen.getByText("Station name")).not.toBeNull();
  });

  it("SHOULD associate itself with a form field via htmlFor", () => {
    render(<Label htmlFor="name">Station name</Label>);

    expect(screen.getByText("Station name").getAttribute("for")).toBe("name");
  });
});
