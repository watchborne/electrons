import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Skeleton } from "../skeleton";

afterEach(cleanup);

describe("Skeleton", () => {
  it("SHOULD render a pulsing placeholder element", () => {
    const { container } = render(<Skeleton />);

    const skeleton = container.firstElementChild;
    expect(skeleton).not.toBeNull();
    expect(skeleton?.className).toContain("animate-pulse");
  });

  it("SHOULD merge a custom className WHEN one is given", () => {
    const { container } = render(<Skeleton className="h-4 w-full" />);

    expect(container.firstElementChild?.className).toContain("h-4 w-full");
  });
});
