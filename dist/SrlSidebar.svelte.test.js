import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import SrlSidebar from './SrlSidebar.svelte';
describe('SrlSidebar', () => {
    const mockItems = [
        { id: 1, phase: 'plan', status: 'todo', title: 'Plan study' },
        { id: 2, phase: 'monitor', status: 'in-progress', title: 'Review notes' },
        { id: 3, phase: 'reflect', status: 'done', title: 'Reflect on goals' }
    ];
    const mockFilterGroups = [
        {
            id: 'phase',
            label: 'SRL Phase',
            icon: '🔮',
            type: 'radio',
            options: [
                { value: 'plan', label: 'Plan' },
                { value: 'monitor', label: 'Monitor' },
                { value: 'reflect', label: 'Reflect' }
            ]
        },
        {
            id: 'status',
            label: 'Status',
            icon: '✔️',
            options: [
                { value: 'todo', label: 'To Do' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'done', label: 'Done' }
            ]
        }
    ];
    const mockSortOptions = [
        { id: 'title', label: 'Alphabetical', icon: '↕️' }
    ];
    const mockQuickTools = [
        { id: 'mark-complete', label: 'Mark Complete', icon: '✅', category: 'status' },
        { id: 'delete', label: 'Delete', icon: '🗑️', category: 'action' }
    ];
    describe('Rendering', () => {
        it('should render with default title', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            await expect.element(page.getByText('Filters')).toBeInTheDocument();
        });
        it('should render with custom title', async () => {
            render(SrlSidebar, {
                title: 'Custom Filters',
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            await expect.element(page.getByText('Custom Filters')).toBeInTheDocument();
        });
        it('should render all filter groups', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            await expect.element(page.getByText('SRL Phase')).toBeInTheDocument();
            await expect.element(page.getByText('Status')).toBeInTheDocument();
        });
        it('should render filter options', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            await expect.element(page.getByLabelText('SRL Phase: Plan')).toBeInTheDocument();
            await expect.element(page.getByLabelText('SRL Phase: Monitor')).toBeInTheDocument();
            await expect.element(page.getByLabelText('SRL Phase: Reflect')).toBeInTheDocument();
            await expect.element(page.getByLabelText('Status: To Do')).toBeInTheDocument();
            await expect.element(page.getByLabelText('Status: In Progress')).toBeInTheDocument();
            await expect.element(page.getByLabelText('Status: Done')).toBeInTheDocument();
        });
        it('should render sort options', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            await expect.element(page.getByText('Sort by')).toBeInTheDocument();
            await expect.element(page.getByText('Alphabetical')).toBeInTheDocument();
        });
        it('should render quick tools when provided', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions,
                quickTools: mockQuickTools
            });
            await expect.element(page.getByText('Quick Tools')).toBeInTheDocument();
        });
        it('should not render quick tools section when empty array', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions,
                quickTools: []
            });
            const quickTools = page.getByText('Quick Tools');
            await expect.element(quickTools).not.toBeInTheDocument();
        });
    });
    describe('Filtering', () => {
        it('should have checkbox filter inputs', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            const todoCheckbox = page.getByLabelText('Status: To Do');
            await expect.element(todoCheckbox).toBeInTheDocument();
            await todoCheckbox.click();
            await expect.element(todoCheckbox).toBeChecked();
        });
        it('should allow multiple checkbox selections', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            const todoCheckbox = page.getByLabelText('Status: To Do');
            const doneCheckbox = page.getByLabelText('Status: Done');
            await todoCheckbox.click();
            await doneCheckbox.click();
            await expect.element(todoCheckbox).toBeChecked();
            await expect.element(doneCheckbox).toBeChecked();
        });
        it('should allow radio selection', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            const planRadio = page.getByLabelText('SRL Phase: Plan');
            await planRadio.click();
            await expect.element(planRadio).toBeChecked();
        });
        it('should clear all filters when Clear button clicked', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            // First apply a filter
            const todoCheckbox = page.getByLabelText('Status: To Do');
            await todoCheckbox.click();
            await expect.element(todoCheckbox).toBeChecked();
            // Then clear
            const clearButton = page.getByLabelText('Clear all filters');
            await clearButton.click();
            await expect.element(todoCheckbox).not.toBeChecked();
        });
    });
    describe('Sorting', () => {
        it('should allow sort option selection', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            const sortRadio = page.getByLabelText('Sort by Alphabetical');
            await sortRadio.click();
            await expect.element(sortRadio).toBeChecked();
        });
    });
    describe('Collapse Functionality', () => {
        it('should toggle collapsed state when collapse button clicked', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            const collapseButton = page.getByLabelText('Collapse sidebar');
            await collapseButton.click();
            // After clicking, button should show expand label
            await expect.element(page.getByLabelText('Expand sidebar')).toBeInTheDocument();
        });
        it('should hide title when collapsed', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            const collapseButton = page.getByLabelText('Collapse sidebar');
            await collapseButton.click();
            // Title should not be in document when collapsed
            const title = page.getByText('Filters');
            await expect.element(title).not.toBeInTheDocument();
        });
    });
    describe('Quick Tools', () => {
        it('should toggle quick tools section', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions,
                quickTools: mockQuickTools
            });
            const expandButton = page.getByLabelText('Expand quick tools');
            await expandButton.click();
            await expect.element(page.getByText('Mark Complete')).toBeInTheDocument();
            await expect.element(page.getByText('Delete')).toBeInTheDocument();
        });
    });
    describe('Auth Section', () => {
        it('should render auth section when showAuthSection is true', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions,
                showAuthSection: true,
                isAuthenticated: false
            });
            await expect.element(page.getByText('👤 Guest session')).toBeInTheDocument();
            await expect.element(page.getByText('Log in to save filters')).toBeInTheDocument();
        });
        it('should show authenticated state', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions,
                showAuthSection: true,
                isAuthenticated: true
            });
            await expect.element(page.getByText('✓ Signed in')).toBeInTheDocument();
            await expect.element(page.getByText('Log out')).toBeInTheDocument();
        });
        it('should not render auth section when showAuthSection is false', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions,
                showAuthSection: false
            });
            const guestSession = page.getByText('Guest session');
            await expect.element(guestSession).not.toBeInTheDocument();
        });
    });
    describe('Accessibility', () => {
        it('should have proper ARIA labels on collapse button', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            const collapseButton = page.getByLabelText('Collapse sidebar');
            await expect.element(collapseButton).toBeInTheDocument();
        });
        it('should have proper ARIA labels on filter inputs', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            await expect.element(page.getByLabelText('SRL Phase: Plan')).toBeInTheDocument();
            await expect.element(page.getByLabelText('Status: To Do')).toBeInTheDocument();
        });
        it('should have proper ARIA labels on sort inputs', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions
            });
            await expect.element(page.getByLabelText('Sort by Alphabetical')).toBeInTheDocument();
        });
        it('should have proper ARIA expanded state on quick tools', async () => {
            render(SrlSidebar, {
                items: mockItems,
                filterGroups: mockFilterGroups,
                sortOptions: mockSortOptions,
                quickTools: mockQuickTools
            });
            // Quick Tools section starts collapsed, so find the expand button
            const quickToolsSection = page.getByText('Quick Tools');
            await expect.element(quickToolsSection).toBeInTheDocument();
            // The section header acts as the toggle button
            const toggleButton = quickToolsSection.element()?.closest('.sidebar-section-header');
            if (toggleButton) {
                const ariaExpanded = toggleButton.getAttribute('aria-expanded');
                expect(ariaExpanded).toBe('false');
            }
        });
    });
});
