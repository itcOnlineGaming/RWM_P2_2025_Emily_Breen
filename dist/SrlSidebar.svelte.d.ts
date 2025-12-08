import "./style.css";
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const SrlSidebar: $$__sveltets_2_IsomorphicComponent<any, {
    toggle: CustomEvent<any>;
    login: CustomEvent<any>;
    logout: CustomEvent<any>;
    quickToolAction: CustomEvent<any>;
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}, {}, "">;
type SrlSidebar = InstanceType<typeof SrlSidebar>;
export default SrlSidebar;
//# sourceMappingURL=SrlSidebar.svelte.d.ts.map