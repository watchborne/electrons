import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { afterEach, describe, it, expect, vi } from "vitest";

import { ThemeSwitcher } from "../theme-switcher";

afterEach(cleanup);

describe("ThemeSwitcher", () => {
  it("SHOULD render three theme buttons WHEN mounted", () => {
    const onChange = vi.fn();
    render(<ThemeSwitcher currentTheme="light" onThemeChange={onChange} />);

    expect(screen.getByLabelText("Switch to Light theme")).not.toBeNull();
    expect(screen.getByLabelText("Switch to System theme")).not.toBeNull();
    expect(screen.getByLabelText("Switch to Dark theme")).not.toBeNull();
  });

  it("SHOULD highlight the current theme WHEN rendered", () => {
    const onChange = vi.fn();
    const { rerender } = render(<ThemeSwitcher currentTheme="light" onThemeChange={onChange} />);

    let currentButton = screen.getByLabelText("Switch to Light theme") as HTMLButtonElement;
    expect(currentButton.className).toContain("bg-background");

    rerender(<ThemeSwitcher currentTheme="dark" onThemeChange={onChange} />);
    currentButton = screen.getByLabelText("Switch to Dark theme") as HTMLButtonElement;
    expect(currentButton.className).toContain("bg-background");
  });

  it("SHOULD call onThemeChange with the selected theme WHEN a button is clicked", () => {
    const onChange = vi.fn();
    render(<ThemeSwitcher currentTheme="light" onThemeChange={onChange} />);

    const darkButton = screen.getByLabelText("Switch to Dark theme") as HTMLButtonElement;
    fireEvent.click(darkButton);
    expect(onChange).toHaveBeenCalledWith("dark");
  });
});
