import type { StoryObj } from '@storybook/svelte';
declare const meta: Meta<import("svelte").SvelteComponent<any, {
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
    $$bindings?: "" | undefined;
}>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Authenticated: Story;
export declare const Collapsed: Story;
export declare const Empty: Story;
export declare const ManyItems: Story;
//# sourceMappingURL=SrlSidebar.stories.d.ts.map