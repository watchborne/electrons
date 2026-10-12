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

  it("SHOULD show a spinner, disable the button and mark it busy WHEN loading is set", () => {
    const { container } = render(<Button loading>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(container.querySelector("svg.animate-spin")).not.toBeNull();
  });

  it("SHOULD NOT show a spinner or mark the button busy WHEN loading is not set", () => {
    const { container } = render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" }) as HTMLButtonElement;
    expect(button.disabled).toBe(false);
    expect(button.getAttribute("aria-busy")).toBeNull();
    expect(container.querySelector("svg")).toBeNull();
  });

  it("SHOULD stay disabled WHEN loading ends but disabled is still set", () => {
    const { rerender } = render(
      <Button loading disabled>
        Save
      </Button>,
    );
    rerender(<Button disabled>Save</Button>);

    expect((screen.getByRole("button", { name: "Save" }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("SHOULD keep the slotted child intact and only set aria-busy WHEN loading with asChild", () => {
    const { container } = render(
      <Button asChild loading>
        <a href="/go">Go</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Go" });
    expect(link.getAttribute("aria-busy")).toBe("true");
    expect(link.getAttribute("disabled")).toBeNull();
    expect(container.querySelector("svg")).toBeNull();
  });
});
