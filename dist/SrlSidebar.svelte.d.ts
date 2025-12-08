import "./style.css";
import type { FilterGroup, SortOption, QuickTool } from "./types";
type $$ComponentProps = {
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
    ontoggle?: (detail: {
        collapsed: boolean;
    }) => void;
    onchange?: (detail: {
        filteredItems: any[];
        selectedFilters: Record<string, string[]>;
        selectedSortId: string | null;
    }) => void;
    onlogin?: () => void;
    onlogout?: () => void;
    onquickToolAction?: (detail: {
        toolId: string;
        item: any;
    }) => void;
};
declare const SrlSidebar: import("svelte").Component<$$ComponentProps, {}, "selectedFilters" | "selectedSortId" | "filteredItems">;
type SrlSidebar = ReturnType<typeof SrlSidebar>;
export default SrlSidebar;
//# sourceMappingURL=SrlSidebar.svelte.d.ts.map