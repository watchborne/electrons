import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

afterEach(cleanup);

const renderTabs = () =>
  render(
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content</TabsContent>
      <TabsContent value="history">History content</TabsContent>
    </Tabs>,
  );

describe("Tabs", () => {
  it("SHOULD show the default tab's content WHEN rendered", () => {
    renderTabs();

    expect(screen.getByText("Overview content")).not.toBeNull();
    expect(screen.queryByText("History content")).toBeNull();
  });

  it("SHOULD switch content WHEN a different trigger is clicked", () => {
    renderTabs();

    // Radix's TabsTrigger switches the active tab on mousedown, not on the
    // click event itself.
    fireEvent.mouseDown(screen.getByText("History"));

    expect(screen.getByText("History content")).not.toBeNull();
    expect(screen.queryByText("Overview content")).toBeNull();
  });
});
