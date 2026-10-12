import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

afterEach(cleanup);

const renderDialog = (props: { open?: boolean; onOpenChange?: (open: boolean) => void } = {}) =>
  render(
    <Dialog {...props}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log a visit</DialogTitle>
          <DialogDescription>When did you go on site?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button type="button">Save</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>,
  );

describe("Dialog", () => {
  it("SHOULD NOT render its content WHEN closed", () => {
    renderDialog();

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("SHOULD open WHEN the trigger is clicked, labelled by its title and description", () => {
    renderDialog();

    fireEvent.click(screen.getByText("Open"));

    const dialog = screen.getByRole("dialog", { name: "Log a visit" });
    expect(dialog.getAttribute("aria-describedby")).not.toBeNull();
    expect(screen.getByText("When did you go on site?")).not.toBeNull();
    expect(screen.getByRole("button", { name: "Save" })).not.toBeNull();
  });

  it("SHOULD close WHEN the built-in close button is clicked", () => {
    renderDialog();
    fireEvent.click(screen.getByText("Open"));

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("SHOULD report open changes WHEN controlled", () => {
    const changes: boolean[] = [];
    renderDialog({ open: true, onOpenChange: (open) => changes.push(open) });

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(changes).toEqual([false]);
    // Controlled: the parent decides, so it is still on screen.
    expect(screen.getByRole("dialog")).not.toBeNull();
  });

  it("SHOULD merge a custom className into the content", () => {
    render(
      <Dialog open>
        <DialogContent className="max-w-2xl">
          <DialogTitle>Wide</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByRole("dialog").className).toContain("max-w-2xl");
  });
});
