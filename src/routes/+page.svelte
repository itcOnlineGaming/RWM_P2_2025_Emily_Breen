<script lang="ts">
  import { SrlSidebar } from "$lib";

  type Item = {
    id: number;
    phase: string;
    status: string;
    title: string;
  };

  let items: Item[] = [
    { id: 1, phase: "plan",    status: "todo",         title: "Plan study" },
    { id: 2, phase: "monitor", status: "in-progress",  title: "Review notes" },
    { id: 3, phase: "reflect", status: "done",         title: "Reflect on goals" }
  ];

  /* ------------------------------------------------------------
     FILTER GROUPS WITH ICONS (VALID SYNTAX)
  ------------------------------------------------------------ */
  const filterGroups = [
    {
      id: "phase",
      label: "SRL Phase",
      icon: "🔮",
      type: "radio" as const,
      options: [
        { value: "plan", label: "Plan" },
        { value: "monitor", label: "Monitor" },
        { value: "reflect", label: "Reflect" }
      ]
    },
    {
      id: "status",
      label: "Status",
      icon: "✔️",
      options: [
        { value: "todo", label: "To Do" },
        { value: "in-progress", label: "In Progress" },
        { value: "done", label: "Done" }
      ]
    }
  ];

  /* ------------------------------------------------------------
     SORT OPTIONS (VALID SYNTAX)
  ------------------------------------------------------------ */
  const sortOptions = [
    { id: "title", label: "Alphabetical", icon: "↕️" }
  ];

  let filteredItems: Item[] = [];
</script>

<div style="display: flex; height: 100vh;">
  <SrlSidebar
    title="Filters"
    {items}
    {filterGroups}
    {sortOptions}
    bind:filteredItems
  />

  <main style="padding: 20px; flex: 1;">
    <h1>Sidebar Test</h1>

    {#each (filteredItems.length ? filteredItems : items) as item}
      <div style="padding: 6px; border-bottom: 1px solid #ccc;">
        <strong>{item.title}</strong> <br />
        Phase: {item.phase} — Status: {item.status}
      </div>
    {/each}
  </main>
</div>
