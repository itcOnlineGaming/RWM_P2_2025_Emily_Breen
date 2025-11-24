<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import "./style.css";
  import type { FilterGroup, SortOption } from "./types";

  /* Props ------------------------------ */
  export let title = "Filters";
  export let items: any[] = [];
  export let filterGroups: FilterGroup[] = [];
  export let sortOptions: SortOption[] = [];
  export let initialSortId: string | null = null;

  export let selectedFilters: Record<string, string[]> = {};
  export let selectedSortId: string | null = initialSortId;
  export let filteredItems: any[] = [];

  export let showAuthSection = false;
  export let isAuthenticated = false;

  /* Helper Fns -------------------------- */
  export let filterFn = (item: any, active: Record<string, string[]>) => {
    for (const [groupId, values] of Object.entries(active)) {
      if (!values.length) continue;
      const v = (item[groupId] ?? "").toString();
      if (!values.includes(v)) return false;
    }
    return true;
  };

  export let sortFn = (a: any, b: any, sortId: string | null) => {
    if (!sortId) return 0;
    const av = a[sortId];
    const bv = b[sortId];
    if (av == null || bv == null) return 0;
    return av < bv ? -1 : av > bv ? 1 : 0;
  };

  /* Sidebar collapse -------------------- */
  let collapsed = false;
  const dispatch = createEventDispatcher();

  function toggleCollapse() {
    collapsed = !collapsed;
    dispatch("toggle", { collapsed });
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
    dispatch("login");
  }

  function logout() {
    dispatch("logout");
  }

  /* Sync filters ------------------------- */
  $: {
    for (const group of filterGroups) {
      if (!selectedFilters[group.id]) {
        selectedFilters = { ...selectedFilters, [group.id]: [] };
      }
    }
  }

  $: {
    const base = items.filter(item => filterFn(item, selectedFilters));
    const sorted = [...base].sort((a, b) => sortFn(a, b, selectedSortId));
    filteredItems = sorted;
    dispatch("change", { filteredItems, selectedFilters, selectedSortId });
  }

  // Add default Difficulty filter group if not present
  $: {
    const hasDifficultyFilter = filterGroups.some(g => g.id === "difficulty");
    if (!hasDifficultyFilter) {
      filterGroups = [
        {
          id: "difficulty",
          label: "Difficulty",
          icon: "⚡",
          type: "checkbox",
          options: [
            { value: "Easy", label: "Easy" },
            { value: "Medium", label: "Medium" },
            { value: "Hard", label: "Hard" }
          ]
        },
        ...filterGroups
      ];
    }
  }

  // Add default Difficulty sort option if not present
  $: {
    const hasDifficultySort = sortOptions.some(o => o.id === "difficulty");
    if (!hasDifficultySort) {
      sortOptions = [
        { id: "difficulty", label: "Difficulty", icon: "⚡" },
        ...sortOptions
      ];
    }
  }

  // Modal state for collapsed filter options
  let showModal = false;
  let modalGroup: FilterGroup | null = null;
  let modalPosition = { top: 0, left: 0 };

  function openModal(group: FilterGroup, event?: MouseEvent) {
    modalGroup = group;
    showModal = true;
    if (event) {
      // Position modal near the clicked icon
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      modalPosition = { top: rect.bottom + window.scrollY, left: rect.left + window.scrollX };
    } else {
      // Default position for keyboard events
      modalPosition = { top: window.innerHeight / 2, left: window.innerWidth / 2 };
    }
  }

  function closeModal() {
    showModal = false;
    modalGroup = null;
  }

  // Close modal on outside click
  function handleModalBackgroundClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-background')) {
      closeModal();
    }
  }
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
    <button class="collapse-button" on:click={toggleCollapse}>
      {#if collapsed} ☰ {:else} « {/if}
    </button>

    {#if !collapsed}
      <h2>{title}</h2>
      <button class="clear-button" on:click={clearAll}>Clear</button>
    {/if}
  </div>


  <!-- AUTH SECTION -------------------------------------------------------- -->
  {#if showAuthSection}
    <div class="auth-section">
      {#if collapsed}
        <button class="auth-icon-button" on:click={isAuthenticated ? logout : login}>
          {isAuthenticated ? "🔒" : "🔓"}
        </button>
      {:else}
        <p class="auth-status">
          {isAuthenticated ? "Signed in" : "Guest session"}
        </p>
        <button class="auth-button" on:click={isAuthenticated ? logout : login}>
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
          <button type="button" class="collapsed-icon" title={group.label} on:click={(e) => openModal(group, e)}
            aria-label={group.label} tabindex="0"
            on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && openModal(group)}>
            {group.icon}
          </button>
        {/if}

        <!-- Expanded label -->
        {#if !collapsed}
          <h3>{group.label}</h3>
        {/if}

        <!-- Options -->
        <div class="filter-options">
          {#each group.options as option}
            <label class="filter-chip">
              <input
                type={group.type ?? "checkbox"}
                checked={selectedFilters[group.id]?.includes(option.value)}
                on:change={() => toggleFilter(group.id, option.value, group.type ?? "checkbox")}
              />
              <span class:hidden={collapsed}>{option.label}</span>

              {#if collapsed}
                <span class="collapsed-dot">{option.label.charAt(0)}</span>
              {/if}
            </label>
          {/each}
        </div>

      </section>
    {/each}
  </div>

  <!-- Modal for collapsed filter options -->
  {#if showModal && modalGroup}
    <div class="modal-background" style="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:1000;" on:click={handleModalBackgroundClick} role="dialog" aria-modal="true" tabindex="0"
      on:keydown={(e) => (e.key === 'Escape') && closeModal()}>
      <div class="modal" style="position:absolute;top:{modalPosition.top}px;left:{modalPosition.left}px;background:white;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.2);padding:1em;min-width:180px;z-index:1001;">
        <h3 style="margin-top:0;">{modalGroup?.label}</h3>
        <div class="filter-options">
          {#each modalGroup?.options ?? [] as option}
            <label class="filter-chip">
              <input
                type={modalGroup?.type ?? "checkbox"}
                checked={selectedFilters[modalGroup?.id ?? ""]?.includes(option.value)}
                on:change={() => toggleFilter(modalGroup?.id ?? "", option.value, modalGroup?.type ?? "checkbox")}
              />
              <span>{option.label}</span>
            </label>
          {/each}
        </div>
        <button style="margin-top:1em;" on:click={closeModal}>Close</button>
      </div>
    </div>
  {/if}


  <!-- SORT SECTION -------------------------------------------------------- -->
  <div class="sidebar-section sort">

    <!-- Collapsed -->
    {#if collapsed}
      <div class="collapsed-icon" title="Sort By">
        {sortOptions[0]?.icon ?? "↕️"}
      </div>
    {/if}

    <!-- Expanded -->
    {#if !collapsed}
      <h3>Sort by</h3>
    {/if}

    <!-- Sort Options -->
    <div class="sort-options">
      {#each sortOptions as option}
        <label class="sort-item">
          <input
            type="radio"
            name="sort"
            checked={selectedSortId === option.id}
            on:change={() => handleSortChange(option.id)}
          />
          <span class:hidden={collapsed}>{option.label}</span>

          {#if collapsed}
            <span class="collapsed-dot">{option.label.charAt(0)}</span>
          {/if}
        </label>
      {/each}
    </div>
  </div>

  <slot />

</aside>
