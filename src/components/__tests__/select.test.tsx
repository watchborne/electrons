import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";

// Radix's Select relies on pointer capture, scrolling and measuring, none of
// which jsdom implements.
beforeAll(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  Element.prototype.hasPointerCapture = vi.fn(() => false);
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(cleanup);

const renderSelect = (props: { value?: string; onValueChange?: (value: string) => void } = {}) =>
  render(
    <Select {...props}>
      <SelectTrigger aria-label="Window">
        <SelectValue placeholder="Pick a window" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="3">3 days</SelectItem>
        <SelectItem value="7">7 days</SelectItem>
      </SelectContent>
    </Select>,
  );

const open = () =>
  fireEvent.pointerDown(screen.getByRole("combobox", { name: "Window" }), {
    button: 0,
    ctrlKey: false,
    pointerType: "mouse",
  });

describe("Select", () => {
  it("SHOULD show the placeholder WHEN nothing is selected", () => {
    renderSelect();

    expect(screen.getByText("Pick a window")).not.toBeNull();
  });

  it("SHOULD show the selected item's label WHEN a value is set", () => {
    renderSelect({ value: "7" });

    expect(screen.getByRole("combobox", { name: "Window" }).textContent).toContain("7 days");
  });

  it("SHOULD list its options WHEN the trigger is pressed", () => {
    renderSelect();

    open();

    expect(screen.getByRole("listbox")).not.toBeNull();
    expect(screen.getByRole("option", { name: "3 days" })).not.toBeNull();
    expect(screen.getByRole("option", { name: "7 days" })).not.toBeNull();
  });

  it("SHOULD report the chosen value WHEN an option is selected", () => {
    const onValueChange = vi.fn();
    renderSelect({ onValueChange });
    open();

    const option = screen.getByRole("option", { name: "7 days" });
    fireEvent.pointerUp(option, { pointerType: "mouse" });
    fireEvent.click(option);

    expect(onValueChange).toHaveBeenCalledWith("7");
  });

  it("SHOULD not open WHEN disabled", () => {
    render(
      <Select disabled>
        <SelectTrigger aria-label="Window">
          <SelectValue placeholder="Pick a window" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="3">3 days</SelectItem>
        </SelectContent>
      </Select>,
    );

    open();

    expect(screen.queryByRole("listbox")).toBeNull();
  });
});
