import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";

// Radix measures its anchor and tracks pointers; jsdom has neither.
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

const open = () =>
  fireEvent.pointerDown(screen.getByRole("button", { name: "Actions" }), {
    button: 0,
    ctrlKey: false,
  });

describe("DropdownMenu", () => {
  it("SHOULD NOT render its items WHEN closed", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Reset</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.queryByRole("menuitem", { name: "Reset" })).toBeNull();
  });

  it("SHOULD list its items WHEN the trigger is pressed", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Charge point</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Reset</DropdownMenuItem>
          <DropdownMenuItem disabled>Unlock</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    open();

    expect(screen.getByRole("menu")).not.toBeNull();
    expect(screen.getByText("Charge point")).not.toBeNull();
    expect(screen.getByRole("menuitem", { name: "Reset" })).not.toBeNull();
    expect(screen.getByRole("menuitem", { name: "Unlock" }).getAttribute("aria-disabled")).toBe(
      "true",
    );
  });

  it("SHOULD call onSelect and close WHEN an item is chosen", () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Reset</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    open();

    fireEvent.click(screen.getByRole("menuitem", { name: "Reset" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("SHOULD reflect and toggle a checkbox item", () => {
    const onCheckedChange = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked onCheckedChange={onCheckedChange}>
            Alerts
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    open();

    const item = screen.getByRole("menuitemcheckbox", { name: "Alerts" });
    expect(item.getAttribute("aria-checked")).toBe("true");
    fireEvent.click(item);

    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it("SHOULD mark only the chosen radio item as checked", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="soft">
            <DropdownMenuRadioItem value="hard">Hard</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="soft">Soft</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    open();

    expect(screen.getByRole("menuitemradio", { name: "Soft" }).getAttribute("aria-checked")).toBe(
      "true",
    );
    expect(screen.getByRole("menuitemradio", { name: "Hard" }).getAttribute("aria-checked")).toBe(
      "false",
    );
  });

  it("SHOULD merge a custom className into the content", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem>Reset</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    open();

    expect(screen.getByRole("menu").className).toContain("w-64");
  });
});
