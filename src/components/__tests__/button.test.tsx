import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Button } from "../button";

afterEach(cleanup);

describe("Button", () => {
  it("SHOULD render its children WHEN given text content", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button", { name: "Click me" })).not.toBeNull();
  });

  it("SHOULD apply the disabled attribute WHEN disabled is set", () => {
    render(<Button disabled>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });
});
