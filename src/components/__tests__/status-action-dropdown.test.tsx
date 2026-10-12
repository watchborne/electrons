import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { StatusActionDropdown } from "../status-action-dropdown";

beforeAll(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

afterEach(cleanup);

const options = [
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "archived", label: "Archived", disabled: true },
];

describe("StatusActionDropdown", () => {
  it("SHOULD show the label of the current status WHEN rendered", () => {
    render(
      <StatusActionDropdown currentStatus="paused" options={options} onStatusChange={vi.fn()} />,
    );

    expect(screen.getByRole("button", { name: "Paused" })).toBeTruthy();
  });

  it("SHOULD fall back to the raw status WHEN no option matches it", () => {
    render(
      <StatusActionDropdown currentStatus="unknown" options={options} onStatusChange={vi.fn()} />,
    );

    expect(screen.getByRole("button", { name: "unknown" })).toBeTruthy();
  });

  it("SHOULD call onStatusChange WHEN another status is chosen", () => {
    const onStatusChange = vi.fn();
    render(
      <StatusActionDropdown
        currentStatus="active"
        options={options}
        onStatusChange={onStatusChange}
      />,
    );

    fireEvent.pointerDown(screen.getByRole("button", { name: "Active" }), { button: 0 });
    fireEvent.click(screen.getByRole("menuitem", { name: "Paused" }));

    expect(onStatusChange).toHaveBeenCalledWith("paused");
  });

  it("SHOULD NOT let the current or a disabled status be chosen WHEN opened", () => {
    render(
      <StatusActionDropdown currentStatus="active" options={options} onStatusChange={vi.fn()} />,
    );

    fireEvent.pointerDown(screen.getByRole("button", { name: "Active" }), { button: 0 });

    expect(
      screen.getByRole("menuitem", { name: "Active" }).getAttribute("data-disabled"),
    ).not.toBeNull();
    expect(
      screen.getByRole("menuitem", { name: "Archived" }).getAttribute("data-disabled"),
    ).not.toBeNull();
    expect(
      screen.getByRole("menuitem", { name: "Paused" }).getAttribute("data-disabled"),
    ).toBeNull();
  });
});
