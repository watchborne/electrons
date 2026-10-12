import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FormDialog, type FormDialogProps } from "../form-dialog";

afterEach(cleanup);

const renderDialog = (props: Partial<FormDialogProps> = {}) =>
  render(
    <FormDialog
      open
      onOpenChange={vi.fn()}
      title="Log a visit"
      description="When did you go on site?"
      form={<input aria-label="Note" />}
      submitLabel="Save"
      cancelLabel="Cancel"
      onSubmit={vi.fn()}
      {...props}
    />,
  );

describe("FormDialog", () => {
  it("SHOULD render the title, description and form WHEN open", () => {
    renderDialog();

    expect(screen.getByRole("dialog", { name: "Log a visit" })).toBeTruthy();
    expect(screen.getByText("When did you go on site?")).toBeTruthy();
    expect(screen.getByRole("textbox", { name: "Note" })).toBeTruthy();
  });

  it("SHOULD render nothing WHEN closed", () => {
    renderDialog({ open: false });

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("SHOULD call onSubmit WHEN the submit button is clicked", () => {
    const onSubmit = vi.fn();
    renderDialog({ onSubmit });

    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("SHOULD ask to close WHEN cancel is clicked", () => {
    const onOpenChange = vi.fn();
    renderDialog({ onOpenChange });

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("SHOULD disable the submit button WHEN isSubmitDisabled is set", () => {
    renderDialog({ isSubmitDisabled: true });

    expect((screen.getByRole("button", { name: "Save" }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("SHOULD disable and mark the submit button busy WHEN isLoading is set", () => {
    renderDialog({ isLoading: true });

    const submit = screen.getByRole("button", { name: "Save" }) as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
    expect(submit.getAttribute("aria-busy")).toBe("true");
  });

  it("SHOULD name the close button WHEN closeLabel is given", () => {
    renderDialog({ closeLabel: "Fermer" });

    expect(screen.getByRole("button", { name: "Fermer" })).toBeTruthy();
  });
});
