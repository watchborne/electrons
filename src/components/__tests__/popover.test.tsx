import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { Popover, PopoverContent, PopoverTrigger } from "../popover";

// Radix's popper measures its anchor; jsdom has no ResizeObserver.
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

const renderPopover = (contentClassName?: string) =>
  render(
    <Popover>
      <PopoverTrigger>Filters</PopoverTrigger>
      <PopoverContent className={contentClassName}>Only online stations</PopoverContent>
    </Popover>,
  );

describe("Popover", () => {
  it("SHOULD NOT render its content WHEN closed", () => {
    renderPopover();

    expect(screen.queryByText("Only online stations")).toBeNull();
  });

  it("SHOULD show its content WHEN the trigger is clicked", () => {
    renderPopover();

    fireEvent.click(screen.getByText("Filters"));

    expect(screen.getByText("Only online stations")).not.toBeNull();
    expect(screen.getByText("Filters").getAttribute("aria-expanded")).toBe("true");
  });

  it("SHOULD hide its content WHEN the trigger is clicked again", () => {
    renderPopover();
    fireEvent.click(screen.getByText("Filters"));

    fireEvent.click(screen.getByText("Filters"));

    expect(screen.queryByText("Only online stations")).toBeNull();
  });

  it("SHOULD merge a custom className into the content", () => {
    renderPopover("w-96");
    fireEvent.click(screen.getByText("Filters"));

    expect(screen.getByText("Only online stations").className).toContain("w-96");
  });
});
