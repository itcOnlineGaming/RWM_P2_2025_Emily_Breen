import type { StoryObj } from '@storybook/svelte';
import type { QuickTool } from './types';
declare const meta: Meta<{
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<{
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
        sortFn?: (a: any, b: any, sortId: string | null) => number;
        children?: import("svelte").Snippet;
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
    }>): void;
}>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Authenticated: Story;
export declare const Collapsed: Story;
export declare const Empty: Story;
export declare const ManyItems: Story;
//# sourceMappingURL=SrlSidebar.stories.d.ts.map