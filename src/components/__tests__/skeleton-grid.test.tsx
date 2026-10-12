import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { SkeletonGrid } from "../skeleton-grid";

afterEach(cleanup);

describe("SkeletonGrid", () => {
  it("SHOULD render four cells in four columns WHEN given no props", () => {
    const { container } = render(<SkeletonGrid />);

    const grid = container.firstElementChild as HTMLElement;
    expect(grid.className).toContain("grid-cols-4");
    expect(grid.children).toHaveLength(4);
  });

  it("SHOULD render as many cells as asked WHEN count and columns are set", () => {
    const { container } = render(<SkeletonGrid count={6} columns={3} cellHeight="h-10" />);

    const grid = container.firstElementChild as HTMLElement;
    expect(grid.className).toContain("grid-cols-3");
    expect(grid.children).toHaveLength(6);
    expect(grid.firstElementChild?.className).toContain("h-10");
  });

  it("SHOULD render the custom placeholder of each index WHEN renderItem is given", () => {
    render(<SkeletonGrid count={2} renderItem={(index) => <p>cell {index}</p>} />);

    expect(screen.getByText("cell 0")).toBeTruthy();
    expect(screen.getByText("cell 1")).toBeTruthy();
  });

  it("SHOULD use the className INSTEAD OF the grid classes WHEN className is set", () => {
    const { container } = render(<SkeletonGrid className="flex gap-2" />);

    const grid = container.firstElementChild as HTMLElement;
    expect(grid.className).toBe("flex gap-2");
  });
});
