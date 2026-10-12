import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../command";

// cmdk scrolls the active item into view and watches its list's size.
beforeAll(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(cleanup);

const palette = (onSelect = vi.fn()) => (
  <>
    <CommandInput placeholder="Search a charge point" />
    <CommandList>
      <CommandEmpty>No charge point found.</CommandEmpty>
      <CommandGroup heading="Sites">
        <CommandItem onSelect={onSelect}>Paris Nord</CommandItem>
        <CommandItem>Lyon Part-Dieu</CommandItem>
      </CommandGroup>
      <CommandSeparator />
    </CommandList>
  </>
);

describe("Command", () => {
  it("SHOULD list every item and its group heading", () => {
    render(<Command>{palette()}</Command>);

    expect(screen.getByText("Sites")).not.toBeNull();
    expect(screen.getByText("Paris Nord")).not.toBeNull();
    expect(screen.getByText("Lyon Part-Dieu")).not.toBeNull();
  });

  it("SHOULD filter the items WHEN the user types", () => {
    render(<Command>{palette()}</Command>);

    fireEvent.change(screen.getByPlaceholderText("Search a charge point"), {
      target: { value: "lyon" },
    });

    expect(screen.queryByText("Paris Nord")).toBeNull();
    expect(screen.getByText("Lyon Part-Dieu")).not.toBeNull();
  });

  it("SHOULD show the empty state WHEN nothing matches", () => {
    render(<Command>{palette()}</Command>);

    fireEvent.change(screen.getByPlaceholderText("Search a charge point"), {
      target: { value: "zzz" },
    });

    expect(screen.getByText("No charge point found.")).not.toBeNull();
  });

  it("SHOULD call onSelect WHEN an item is chosen", () => {
    const onSelect = vi.fn();
    render(<Command>{palette(onSelect)}</Command>);

    fireEvent.click(screen.getByText("Paris Nord"));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

describe("CommandDialog", () => {
  it("SHOULD render the palette inside a dialog WHEN open", () => {
    render(<CommandDialog open>{palette()}</CommandDialog>);

    expect(screen.getByRole("dialog")).not.toBeNull();
    expect(screen.getByPlaceholderText("Search a charge point")).not.toBeNull();
  });

  it("SHOULD name its close button after closeLabel", () => {
    render(
      <CommandDialog open closeLabel="Fermer">
        {palette()}
      </CommandDialog>,
    );

    expect(screen.getByRole("button", { name: "Fermer" })).not.toBeNull();
  });
});
