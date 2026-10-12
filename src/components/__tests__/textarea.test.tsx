import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { Textarea } from "../textarea";

afterEach(cleanup);

describe("Textarea", () => {
  it("SHOULD render a textarea with its placeholder", () => {
    render(<Textarea placeholder="Notes" />);

    expect(screen.getByPlaceholderText("Notes").tagName).toBe("TEXTAREA");
  });

  it("SHOULD report what is typed WHEN the user edits it", () => {
    let value = "";
    render(<Textarea aria-label="Notes" onChange={(event) => (value = event.target.value)} />);

    fireEvent.change(screen.getByLabelText("Notes"), { target: { value: "replaced the reader" } });

    expect(value).toBe("replaced the reader");
  });

  it("SHOULD apply the disabled attribute WHEN disabled is set", () => {
    render(<Textarea aria-label="Notes" disabled />);

    expect((screen.getByLabelText("Notes") as HTMLTextAreaElement).disabled).toBe(true);
  });

  it("SHOULD merge a custom className with its own", () => {
    render(<Textarea aria-label="Notes" className="min-h-[200px]" />);

    expect(screen.getByLabelText("Notes").className).toContain("min-h-[200px]");
    expect(screen.getByLabelText("Notes").className).toContain("rounded-md");
  });

  it("SHOULD forward its ref to the underlying element", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea aria-label="Notes" ref={ref} />);

    expect(ref.current).toBe(screen.getByLabelText("Notes"));
  });
});
