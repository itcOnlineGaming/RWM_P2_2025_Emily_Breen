<script lang="ts">
  import "./style.css";
  import type { FilterGroup, SortOption, QuickTool } from "./types";

  /* Props ------------------------------ */
  let { 
    title = "Filters",
    items = [],
    filterGroups = [],
    sortOptions = [],
    quickTools = [],
    initialSortId = null,
    selectedFilters = $bindable({}),
    selectedSortId = $bindable(initialSortId),
    filteredItems = $bindable([]),
    showAuthSection = false,
    isAuthenticated = false,
    filterFn = (item: any, active: Record<string, string[]>) => {
      for (const [groupId, values] of Object.entries(active)) {
        if (!values.length) continue;
        const v = (item[groupId] ?? "").toString();
        if (!values.includes(v)) return false;
      }
      return true;
    },
    sortFn = (a: any, b: any, sortId: string | null) => {
      if (!sortId) return 0;
      const av = a[sortId];
      const bv = b[sortId];
      if (av == null || bv == null) return 0;
      return av < bv ? -1 : av > bv ? 1 : 0;
    },
    children,
    ontoggle = undefined,
    onchange = undefined,
    onlogin = undefined,
    onlogout = undefined,
    onquickToolAction = undefined
  }: {
    title?: string;
    items?: any[];
    filterGroups?: FilterGroup[];
    sortOptions?: SortOption[];
    quickTools?: QuickTool[];
    initialSortId?: string | null;
    selectedFilters?: Record<string, string[]>;
    selectedSortId?: string | null;
    filteredItems?: any[];
    showAuthSection?: boolean;
    isAuthenticated?: boolean;
    filterFn?: (item: any, active: Record<string, string[]>) => boolean;
    sortFn?: (a: any, b: any, sortId: string | null) => number;
    children?: import('svelte').Snippet;
    ontoggle?: (detail: { collapsed: boolean }) => void;
    onchange?: (detail: { filteredItems: any[], selectedFilters: Record<string, string[]>, selectedSortId: string | null }) => void;
    onlogin?: () => void;
    onlogout?: () => void;
    onquickToolAction?: (detail: { toolId: string, item: any }) => void;
  } = $props();

  /* Sidebar collapse -------------------- */
  let collapsed = $state(false);
  let quickToolsExpanded = $state(false);

  function toggleCollapse() {
    collapsed = !collapsed;
    ontoggle?.({ collapsed });
  }

  function toggleQuickTools() {
    quickToolsExpanded = !quickToolsExpanded;
  }

  function toggleFilter(groupId: string, value: string, type: "checkbox" | "radio" = "checkbox") {
    const current = selectedFilters[groupId] || [];
    let next: string[];

    if (type === "radio") {
      next = value === current[0] ? [] : [value];
    } else {
      next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    }

    selectedFilters = { ...selectedFilters, [groupId]: next };
  }

  function clearAll() {
    const cleared: Record<string, string[]> = {};
    for (const group of filterGroups) cleared[group.id] = [];
    selectedFilters = cleared;
    selectedSortId = initialSortId;
  }

  function handleSortChange(id: string) {
    selectedSortId = id;
  }

  function login() {
    onlogin?.();
  }

  function logout() {
    onlogout?.();
  }

  /* Quick Tools drag & drop ------------ */
  let draggedItem: any = $state(null);
  let dragOverToolId: string | null = $state(null);

  function handleToolDrop(toolId: string) {
    if (draggedItem) {
      onquickToolAction?.({ toolId, item: draggedItem });
      draggedItem = null;
      dragOverToolId = null;
    }
  }

  function handleDragOver(event: DragEvent, toolId: string) {
    event.preventDefault();
    dragOverToolId = toolId;
  }

  function handleDragLeave() {
    dragOverToolId = null;
  }

  /* Keyboard accessibility for drag & drop */
  function handleItemKeydown(event: KeyboardEvent, item: any) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      draggedItem = item;
      // Visual feedback that item is selected
      (event.target as HTMLElement)?.classList.add('selected');
    }
  }

  function handleToolKeydown(event: KeyboardEvent, toolId: string) {
    if ((event.key === 'Enter' || event.key === ' ') && draggedItem) {
      event.preventDefault();
      handleToolDrop(toolId);
      // Clear visual feedback
      document.querySelectorAll('.draggable-item.selected').forEach(el => {
        el.classList.remove('selected');
      });
    }
  }

  /* Sync filters ------------------------- */
  $effect(() => {
    for (const group of filterGroups) {
      if (!selectedFilters[group.id]) {
        selectedFilters = { ...selectedFilters, [group.id]: [] };
      }
    }
  });

  $effect(() => {
    const base = items.filter(item => filterFn(item, selectedFilters));
    const sorted = [...base].sort((a, b) => sortFn(a, b, selectedSortId));
    filteredItems = sorted;
    onchange?.({ filteredItems, selectedFilters, selectedSortId });
  });
</script>

<!-- =======================================================================
     SIDEBAR MARKUP
     ======================================================================= -->

<aside
  class={collapsed ? "month-sidebar collapsed" : "month-sidebar"}
  aria-label="SRL filter sidebar"
>

  <!-- HEADER -------------------------------------------------------------- -->
  <div class="sidebar-header">
    <button 
      class="collapse-button" 
      onclick={toggleCollapse}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {#if collapsed} ☰ {:else} « {/if}
    </button>

    {#if !collapsed}
      <h2>{title}</h2>
      <button class="clear-button" onclick={clearAll} aria-label="Clear all filters">
        Clear
      </button>
    {/if}
  </div>


  <!-- AUTH SECTION -------------------------------------------------------- -->
  {#if showAuthSection}
    <div class="auth-section">
      {#if collapsed}
        <button 
          class="auth-icon-button" 
          onclick={isAuthenticated ? logout : login}
          aria-label={isAuthenticated ? "Log out" : "Log in"}
        >
          {isAuthenticated ? "🔒" : "🔓"}
        </button>
      {:else}
        <p class="auth-status">
          {isAuthenticated ? "✓ Signed in" : "👤 Guest session"}
        </p>
        <button class="auth-button" onclick={isAuthenticated ? logout : login}>
          {isAuthenticated ? "Log out" : "Log in to save filters"}
        </button>
      {/if}
    </div>
  {/if}


  <!-- FILTER GROUPS ------------------------------------------------------- -->
  <div class="sidebar-section filters">

    {#each filterGroups as group}
      <section class="filter-group">

        <!-- Collapsed icon -->
        {#if collapsed}
          <div class="collapsed-icon" title={group.label}>
            {group.icon || "📋"}
          </div>
        {/if}

        <!-- Expanded label -->
        {#if !collapsed}
          <h3>
            {#if group.icon}<span>{group.icon}</span>{/if}
            {group.label}
          </h3>
        {/if}

        <!-- Options -->
        {#if !collapsed}
          <div class="filter-options">
            {#each group.options as option}
              <label class="filter-chip">
                <input
                  type={group.type ?? "checkbox"}
                  checked={selectedFilters[group.id]?.includes(option.value)}
                  onchange={() => toggleFilter(group.id, option.value, group.type ?? "checkbox")}
                  aria-label="{group.label}: {option.label}"
                />
                <span>{option.label}</span>
              </label>
            {/each}
          </div>
        {/if}

      </section>
    {/each}

  </div>


  <!-- SORT SECTION -------------------------------------------------------- -->
  <div class="sidebar-section sort">

    <!-- Collapsed -->
    {#if collapsed}
      <div class="collapsed-icon" title="Sort By">
        {sortOptions.find(o => o.id === selectedSortId)?.icon ?? sortOptions[0]?.icon ?? "↕️"}
      </div>
    {/if}

    <!-- Expanded -->
    {#if !collapsed}
      <h3>
        {#if sortOptions[0]?.icon}<span>↕️</span>{/if}
        Sort by
      </h3>
    {/if}

    <!-- Sort Options -->
    {#if !collapsed}
      <div class="sort-options">
        {#each sortOptions as option}
          <label class="sort-item">
            <input
              type="radio"
              name="sort"
              checked={selectedSortId === option.id}
              onchange={() => handleSortChange(option.id)}
              aria-label="Sort by {option.label}"
            />
            <span>{option.label}</span>
          </label>
        {/each}
      </div>
    {/if}
  </div>

  <!-- QUICK TOOLS SECTION ------------------------------------------------- -->
  {#if quickTools.length > 0}
    <div class="sidebar-section quick-tools">

      <!-- Collapsed -->
      {#if collapsed}
        <div class="collapsed-icon" title="Quick Tools">
          ⚡
        </div>
      {/if}

      <!-- Expanded - Header with Toggle -->
      {#if !collapsed}
        <div class="section-header-collapsible">
          <h3>
            <span>⚡</span>
            Quick Tools
          </h3>
          <button 
            class="expand-button"
            onclick={toggleQuickTools}
            aria-label={quickToolsExpanded ? "Collapse quick tools" : "Expand quick tools"}
            aria-expanded={quickToolsExpanded}
          >
            {quickToolsExpanded ? "▼" : "▶"}
          </button>
        </div>
      {/if}

      <!-- Tools Grid - Only show when expanded -->
      {#if !collapsed && quickToolsExpanded}
        <div class="tools-grid">
          {#each quickTools as tool}
            <div
              class="tool-dropzone"
              class:drag-over={dragOverToolId === tool.id}
              ondrop={(e) => { e.preventDefault(); handleToolDrop(tool.id); }}
              ondragover={(e) => handleDragOver(e, tool.id)}
              ondragleave={handleDragLeave}
              onkeydown={(e) => handleToolKeydown(e, tool.id)}
              role="button"
              tabindex="0"
              aria-label="{tool.label} - Press Enter to apply to selected item"
            >
              <span class="tool-icon">{tool.icon}</span>
              <span class="tool-label">{tool.label}</span>
            </div>
          {/each}
        </div>

        <!-- Drag Instructions -->
        <p class="drag-hint">💡 Drag items here to apply actions</p>
      {/if}

    </div>
  {/if}

  <!-- FILTERED ITEMS SECTION ---------------------------------------------- -->
  {#if filteredItems.length > 0 && !collapsed}
    <div class="sidebar-section filtered-items">
      <h3>
        <span>🔍</span>
        Results ({filteredItems.length})
      </h3>

      <div class="items-list">
        {#each filteredItems.slice(0, 10) as item}
          <div
            class="draggable-item"
            draggable="true"
            ondragstart={() => draggedItem = item}
            ondragend={() => draggedItem = null}
            onkeydown={(e) => handleItemKeydown(e, item)}
            role="button"
            tabindex="0"
            aria-label="Press Enter to select {item.title || item.name || 'item'}, then navigate to a quick tool and press Enter to apply"
          >
            <span class="drag-handle">⋮⋮</span>
            <span class="item-text">{item.title || item.name || 'Untitled'}</span>
            {#if item.status}
              <span class="item-badge {item.status}">{item.status}</span>
            {/if}
          </div>
        {/each}
        {#if filteredItems.length > 10}
          <p class="more-items-hint">...and {filteredItems.length - 10} more</p>
        {/if}
      </div>
    </div>
  {/if}

  {#if children}
    {@render children()}
  {/if}

</aside>
