import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Loader } from "../loader";

afterEach(cleanup);

describe("Loader", () => {
  it("SHOULD render its label WHEN given one", () => {
    render(<Loader label="Loading charge points…" />);

    expect(screen.getByText("Loading charge points…")).not.toBeNull();
  });
});
