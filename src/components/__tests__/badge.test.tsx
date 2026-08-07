import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Badge } from "../badge";

afterEach(cleanup);

describe("Badge", () => {
  it("SHOULD render its children WHEN given text content", () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText("New")).not.toBeNull();
  });
});
