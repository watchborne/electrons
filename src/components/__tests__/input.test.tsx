import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Input } from "../input";

afterEach(cleanup);

describe("Input", () => {
  it("SHOULD render an input WHEN given a placeholder", () => {
    render(<Input placeholder="Station name" />);

    expect(screen.getByPlaceholderText("Station name")).not.toBeNull();
  });

  it("SHOULD apply the disabled attribute WHEN disabled is set", () => {
    render(<Input placeholder="Station name" disabled />);

    expect(screen.getByPlaceholderText("Station name").hasAttribute("disabled")).toBe(true);
  });
});
