import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { ActionsDropdown } from "../actions-dropdown";

// Radix measures its anchor; jsdom has no ResizeObserver.
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

const actions = [
  { id: "reset", label: "Reset" },
  { id: "unlock", label: "Unlock", disabled: true },
  { id: "delete", label: "Delete", destructive: true, divider: true },
];

const open = (name: string) =>
  fireEvent.pointerDown(screen.getByRole("button", { name }), { button: 0 });

describe("ActionsDropdown", () => {
  it("SHOULD name the default trigger WHEN triggerLabel is given", () => {
    render(<ActionsDropdown actions={actions} onAction={vi.fn()} triggerLabel="More actions" />);

    expect(screen.getByRole("button", { name: "More actions" })).toBeTruthy();
  });

  it("SHOULD list every action WHEN opened, with a separator before a divided one", () => {
    render(<ActionsDropdown actions={actions} onAction={vi.fn()} triggerLabel="More actions" />);

    open("More actions");

    expect(screen.getAllByRole("menuitem").map((item) => item.textContent)).toEqual([
      "Reset",
      "Unlock",
      "Delete",
    ]);
    expect(screen.getAllByRole("separator")).toHaveLength(1);
  });

  it("SHOULD call onAction with the action id WHEN an item is chosen", () => {
    const onAction = vi.fn();
    render(<ActionsDropdown actions={actions} onAction={onAction} triggerLabel="More actions" />);

    open("More actions");
    fireEvent.click(screen.getByRole("menuitem", { name: "Reset" }));

    expect(onAction).toHaveBeenCalledWith("reset");
  });

  it("SHOULD flag a disabled action WHEN it has disabled set", () => {
    render(<ActionsDropdown actions={actions} onAction={vi.fn()} triggerLabel="More actions" />);

    open("More actions");

    expect(
      screen.getByRole("menuitem", { name: "Unlock" }).getAttribute("data-disabled"),
    ).not.toBeNull();
  });

  it("SHOULD use the destructive tone WHEN an action is destructive", () => {
    render(<ActionsDropdown actions={actions} onAction={vi.fn()} triggerLabel="More actions" />);

    open("More actions");

    expect(screen.getByRole("menuitem", { name: "Delete" }).className).toContain(
      "text-red-foreground",
    );
  });

  it("SHOULD render the given trigger INSTEAD OF the default WHEN trigger is set", () => {
    render(
      <ActionsDropdown
        actions={actions}
        onAction={vi.fn()}
        trigger={<button type="button">Custom</button>}
        triggerLabel="More actions"
      />,
    );

    expect(screen.getByRole("button", { name: "Custom" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: "More actions" })).toBeNull();
  });

  it("SHOULD disable the default trigger WHEN disabled is set", () => {
    render(
      <ActionsDropdown actions={actions} onAction={vi.fn()} triggerLabel="More actions" disabled />,
    );

    expect(
      (screen.getByRole("button", { name: "More actions" }) as HTMLButtonElement).disabled,
    ).toBe(true);
  });
});
