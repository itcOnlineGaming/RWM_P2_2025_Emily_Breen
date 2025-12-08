import "./style.css";
import type { FilterGroup, SortOption, QuickTool } from "./types";
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
type $$__sveltets_2_PropsWithChildren<Props, Slots> = Props & (Slots extends {
    default: any;
} ? Props extends Record<string, never> ? any : {
    children?: any;
} : {});
declare const SrlSidebar: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
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
    sortFn?: (a: any, b: any, sortId: string | null) => 0 | 1 | -1;
}, {
    default: {};
}>, {
    toggle: CustomEvent<any>;
    login: CustomEvent<any>;
    logout: CustomEvent<any>;
    quickToolAction: CustomEvent<any>;
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}, {}, string>;
type SrlSidebar = InstanceType<typeof SrlSidebar>;
export default SrlSidebar;
//# sourceMappingURL=SrlSidebar.svelte.d.ts.map