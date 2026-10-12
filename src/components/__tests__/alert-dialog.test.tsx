import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog";

afterEach(cleanup);

const renderAlert = (onConfirm = vi.fn()) => {
  render(
    <AlertDialog>
      <AlertDialogTrigger>Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this site?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>,
  );
  return onConfirm;
};

describe("AlertDialog", () => {
  it("SHOULD NOT render WHEN closed", () => {
    renderAlert();

    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("SHOULD open as an alertdialog named by its title WHEN the trigger is clicked", () => {
    renderAlert();

    fireEvent.click(screen.getByText("Delete"));

    expect(screen.getByRole("alertdialog", { name: "Delete this site?" })).not.toBeNull();
    expect(screen.getByText("This cannot be undone.")).not.toBeNull();
  });

  it("SHOULD run the confirm handler and close WHEN the action is clicked", () => {
    const onConfirm = renderAlert();
    fireEvent.click(screen.getByText("Delete"));

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("SHOULD close without confirming WHEN cancelled", () => {
    const onConfirm = renderAlert();
    fireEvent.click(screen.getByText("Delete"));

    fireEvent.click(screen.getByRole("button", { name: "Keep" }));

    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("SHOULD style the action as a primary button and the cancel as an outline one", () => {
    renderAlert();
    fireEvent.click(screen.getByText("Delete"));

    expect(screen.getByRole("button", { name: "Delete" }).className).toContain("bg-primary");
    expect(screen.getByRole("button", { name: "Keep" }).className).toContain("border-input");
  });
});
