<script lang="ts">
  import { SrlSidebar } from '@rwm/srl-sidebar';
  import '@rwm/srl-sidebar/style.css';

  type Item = {
    id: number;
    phase: string;
    status: string;
    title: string;
    tags?: string[];
    comments?: string[];
    scheduledDate?: string;
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

  /* ------------------------------------------------------------
     QUICK TOOLS - ALL OF THEM!
  ------------------------------------------------------------ */
  const quickTools = [
    // Status Changes
    { id: "mark-complete", label: "Mark Complete", icon: "✅", category: "status" as const },
    { id: "set-progress", label: "In Progress", icon: "⏳", category: "status" as const },
    { id: "pause", label: "Pause/Defer", icon: "⏸️", category: "status" as const },
    { id: "reset", label: "Reset to New", icon: "🔄", category: "status" as const },
    
    // Organization
    { id: "favorite", label: "Add to Favorites", icon: "⭐", category: "organization" as const },
    { id: "pin", label: "Pin to Top", icon: "📌", category: "organization" as const },
    { id: "tag", label: "Add Tag", icon: "🏷️", category: "organization" as const },
    { id: "move-project", label: "Move to Project", icon: "📁", category: "organization" as const },
    
    // Actions
    { id: "delete", label: "Delete", icon: "🗑️", category: "action" as const },
    { id: "duplicate", label: "Duplicate", icon: "📋", category: "action" as const },
    { id: "archive", label: "Archive", icon: "📎", category: "action" as const },
    { id: "export", label: "Export", icon: "📤", category: "action" as const },
    
    // Time-based
    { id: "today", label: "Schedule Today", icon: "📅", category: "time" as const },
    { id: "reminder", label: "Set Reminder", icon: "⏰", category: "time" as const },
    { id: "this-week", label: "Due This Week", icon: "📆", category: "time" as const },
    
    // Collaboration
    { id: "assign-me", label: "Assign to Me", icon: "👤", category: "collaboration" as const },
    { id: "comment", label: "Add Comment", icon: "💬", category: "collaboration" as const },
    { id: "share", label: "Share Link", icon: "🔗", category: "collaboration" as const }
  ];

  let filteredItems: Item[] = [];

  /* ------------------------------------------------------------
     HANDLE QUICK TOOL ACTIONS
  ------------------------------------------------------------ */
  function handleQuickToolAction(event: CustomEvent<{ toolId: string; item: Item }>) {
    const { toolId, item } = event.detail;
    
    console.log(`🎯 Quick Tool: ${toolId} on item:`, item);
    
    // Apply the action based on toolId
    switch (toolId) {
      case "mark-complete":
        updateItemStatus(item.id, "done");
        showToast(`✅ "${item.title}" marked complete!`);
        break;
      case "set-progress":
        updateItemStatus(item.id, "in-progress");
        showToast(`⏳ "${item.title}" set to in progress`);
        break;
      case "pause":
        updateItemStatus(item.id, "paused");
        showToast(`⏸️ "${item.title}" paused`);
        break;
      case "reset":
        updateItemStatus(item.id, "todo");
        showToast(`🔄 "${item.title}" reset to new`);
        break;
      case "delete":
        deleteItem(item.id);
        showToast(`🗑️ "${item.title}" deleted`);
        break;
      case "duplicate":
        duplicateItem(item);
        showToast(`📋 "${item.title}" duplicated`);
        break;
      case "archive":
        archiveItem(item.id);
        showToast(`📎 "${item.title}" archived`);
        break;
      case "favorite":
        showToast(`⭐ "${item.title}" added to favorites`);
        break;
      case "pin":
        showToast(`📌 "${item.title}" pinned to top`);
        break;
      case "tag":
        addTag(item.id);
        break;
      case "comment":
        addComment(item.id);
        break;
      case "export":
        exportItem(item);
        break;
      case "today":
        scheduleItem(item.id, "today");
        break;
      case "this-week":
        scheduleItem(item.id, "this-week");
        break;
      case "reminder":
        setReminder(item.id);
        break;
      default:
        showToast(`${toolId} applied to "${item.title}"`);
    }
  }

  function updateItemStatus(id: number, newStatus: string) {
    items = items.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    );
  }

  function deleteItem(id: number) {
    items = items.filter(item => item.id !== id);
  }

  function duplicateItem(item: Item) {
    const newItem = { ...item, id: Math.max(...items.map(i => i.id)) + 1, title: `${item.title} (copy)` };
    items = [...items, newItem];
  }

  function archiveItem(id: number) {
    items = items.filter(item => item.id !== id);
  }

  function addTag(id: number) {
    const tag = prompt("Enter tag name:");
    if (tag) {
      items = items.map(item => 
        item.id === id 
          ? { ...item, tags: [...(item.tags || []), tag] }
          : item
      );
      const item = items.find(i => i.id === id);
      showToast(`🏷️ Tag "${tag}" added to "${item?.title}"`);
    }
  }

  function addComment(id: number) {
    const comment = prompt("Enter your comment:");
    if (comment) {
      items = items.map(item => 
        item.id === id 
          ? { ...item, comments: [...(item.comments || []), comment] }
          : item
      );
      const item = items.find(i => i.id === id);
      showToast(`💬 Comment added to "${item?.title}"`);
    }
  }

  function exportItem(item: Item) {
    const dataStr = JSON.stringify(item, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.title.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`📤 "${item.title}" exported as JSON`);
  }

  function scheduleItem(id: number, when: string) {
    const today = new Date();
    let scheduledDate: string;
    
    if (when === "today") {
      scheduledDate = today.toISOString().split('T')[0];
    } else if (when === "this-week") {
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
      scheduledDate = endOfWeek.toISOString().split('T')[0];
    } else {
      scheduledDate = today.toISOString().split('T')[0];
    }

    items = items.map(item => 
      item.id === id ? { ...item, scheduledDate } : item
    );
    const item = items.find(i => i.id === id);
    const icon = when === "today" ? "📅" : "📆";
    showToast(`${icon} "${item?.title}" scheduled for ${scheduledDate}`);
  }

  function setReminder(id: number) {
    const time = prompt("Set reminder time (e.g., 14:00):");
    if (time) {
      const item = items.find(i => i.id === id);
      showToast(`⏰ Reminder set for "${item?.title}" at ${time}`);
      // In a real app, you'd integrate with a notification system
      console.log(`⏰ Reminder for "${item?.title}" at ${time}`);
    }
  }

  function showToast(message: string) {
    // Simple console toast for now - you could add a toast UI component
    console.log(`📢 ${message}`);
    alert(message); // Replace with proper toast notification
  }

</script>

<div style="display: flex; height: 100vh; font-family: Arial, Helvetica, sans-serif;">
  <SrlSidebar
    title="Filters"
    {items}
    {filterGroups}
    {sortOptions}
    {quickTools}
    bind:filteredItems
    on:quickToolAction={handleQuickToolAction}
  />

  <main style="padding: 20px; flex: 1; overflow-y: auto;">
    <h1>🎯 Quick Tools Drag & Drop Demo</h1>
    <p style="color: #666; margin-bottom: 2rem;">
      💡 <strong>Try it:</strong> Use filters in the sidebar or drag items from "Results" section and drop them onto Quick Tools!
    </p>

    <h2 style="margin-top: 2rem;">
      {filteredItems.length > 0 ? `Filtered Items (${filteredItems.length})` : `All Items (${items.length})`}
    </h2>
    {#each (filteredItems.length > 0 ? filteredItems : items) as item}
      <div style="padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 8px; background: white;">
        <div style="margin-bottom: 8px;">
          <strong>{item.title}</strong>
          <span style="margin-left: 1rem; padding: 4px 8px; background: #f0f0f0; border-radius: 4px; font-size: 0.85rem;">
            Phase: {item.phase}
          </span>
          <span style="margin-left: 0.5rem; padding: 4px 8px; background: #e8dff5; border-radius: 4px; font-size: 0.85rem;">
            Status: {item.status}
          </span>
        </div>
        
        {#if item.scheduledDate}
          <div style="margin-top: 6px; font-size: 0.85rem; color: #666;">
            📅 Scheduled: {item.scheduledDate}
          </div>
        {/if}
        
        {#if item.tags && item.tags.length > 0}
          <div style="margin-top: 6px; display: flex; gap: 4px; flex-wrap: wrap;">
            {#each item.tags as tag}
              <span style="padding: 2px 8px; background: #fff3cd; border-radius: 4px; font-size: 0.75rem; color: #856404;">
                🏷️ {tag}
              </span>
            {/each}
          </div>
        {/if}
        
        {#if item.comments && item.comments.length > 0}
          <div style="margin-top: 6px; padding-left: 8px; border-left: 3px solid #e8dff5;">
            {#each item.comments as comment}
              <div style="font-size: 0.8rem; color: #666; margin-top: 4px;">
                💬 {comment}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
    {#if filteredItems.length === 0 && items.length > 0}
      <p style="color: #999; text-align: center; margin-top: 2rem;">
        🔍 No items match the current filters. Try adjusting your filter selection.
      </p>
    {/if}
  </main>
</div>
