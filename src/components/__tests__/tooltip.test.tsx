import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";

// Radix's popper measures its anchor; jsdom has neither of these.
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

const renderTooltip = (open?: boolean) =>
  render(
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <button type="button">Anchor</button>
        </TooltipTrigger>
        <TooltipContent>Charging since 14:05</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );

describe("Tooltip", () => {
  it("SHOULD NOT show its content WHEN it has not been triggered", () => {
    renderTooltip();

    expect(screen.queryByText("Charging since 14:05")).toBeNull();
  });

  it("SHOULD show its content WHEN the anchor receives focus", async () => {
    renderTooltip();

    await act(async () => {
      fireEvent.focus(screen.getByRole("button", { name: "Anchor" }));
    });

    expect((await screen.findAllByText("Charging since 14:05")).length).toBeGreaterThan(0);
  });

  it("SHOULD show its content WHEN controlled open", async () => {
    renderTooltip(true);

    expect((await screen.findAllByText("Charging since 14:05")).length).toBeGreaterThan(0);
  });

  it("SHOULD merge a custom className into the content", async () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger asChild>
            <button type="button">Anchor</button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs" data-testid="bubble">
            Hello
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect((await screen.findByTestId("bubble")).className).toContain("max-w-xs");
  });
});
