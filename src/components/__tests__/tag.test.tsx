import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Tag } from "../tag";

afterEach(cleanup);

describe("Tag", () => {
  it("SHOULD render its children WHEN given text content", () => {
    render(<Tag>OCPP 1.6</Tag>);

    expect(screen.getByText("OCPP 1.6")).not.toBeNull();
  });
});
