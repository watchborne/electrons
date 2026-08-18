import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible";

afterEach(cleanup);

describe("Collapsible", () => {
  it("SHOULD hide its content WHEN closed by default", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.queryByText("Hidden details")).toBeNull();
  });

  it("SHOULD reveal its content WHEN the trigger is clicked", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>,
    );

    fireEvent.click(screen.getByText("Toggle"));

    expect(screen.getByText("Hidden details")).not.toBeNull();
  });

  it("SHOULD render its content open WHEN defaultOpen is set", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.getByText("Hidden details")).not.toBeNull();
  });
});
