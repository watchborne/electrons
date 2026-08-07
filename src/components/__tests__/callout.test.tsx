import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Callout } from "../callout";

afterEach(cleanup);

describe("Callout", () => {
  it("SHOULD render the title and description WHEN both are provided", () => {
    render(<Callout variant="error" title="Error" description="Something went wrong" />);

    expect(screen.getByText("Error")).not.toBeNull();
    expect(screen.getByText("Something went wrong")).not.toBeNull();
  });

  it("SHOULD render children instead of description WHEN children are provided", () => {
    render(
      <Callout description="ignored">
        <p>Custom content</p>
      </Callout>,
    );

    expect(screen.getByText("Custom content")).not.toBeNull();
    expect(screen.queryByText("ignored")).toBeNull();
  });
});
