import type { StoryObj } from '@storybook/svelte';
import type { QuickTool } from './types';
declare const meta: Meta<import("svelte").SvelteComponent<{
    title?: string;
    items?: any[];
    filterGroups?: import("./types").FilterGroup[];
    sortOptions?: import("./types").SortOption[];
    quickTools?: QuickTool[];
    initialSortId?: string | null;
    selectedFilters?: Record<string, string[]>;
    selectedSortId?: string | null;
    filteredItems?: any[];
    showAuthSection?: boolean;
    isAuthenticated?: boolean;
    filterFn?: (item: any, active: Record<string, string[]>) => boolean;
    sortFn?: (a: any, b: any, sortId: string | null) => 0 | 1 | -1;
} & {
    children?: any;
}, {
    toggle: CustomEvent<any>;
    login: CustomEvent<any>;
    logout: CustomEvent<any>;
    quickToolAction: CustomEvent<any>;
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> & {
    $$bindings?: string | undefined;
}>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Authenticated: Story;
export declare const Collapsed: Story;
export declare const Empty: Story;
export declare const ManyItems: Story;
//# sourceMappingURL=SrlSidebar.stories.d.ts.map