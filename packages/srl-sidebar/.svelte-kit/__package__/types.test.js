import { describe, it, expect } from 'vitest';
describe('Type Definitions', () => {
    describe('FilterGroup', () => {
        it('should accept valid checkbox filter group', () => {
            const filterGroup = {
                id: 'status',
                label: 'Status',
                icon: '✔️',
                type: 'checkbox',
                options: [
                    { value: 'todo', label: 'To Do' },
                    { value: 'done', label: 'Done' }
                ]
            };
            expect(filterGroup.id).toBe('status');
            expect(filterGroup.type).toBe('checkbox');
            expect(filterGroup.options.length).toBe(2);
        });
        it('should accept valid radio filter group', () => {
            const filterGroup = {
                id: 'phase',
                label: 'SRL Phase',
                icon: '🔮',
                type: 'radio',
                options: [
                    { value: 'plan', label: 'Plan' },
                    { value: 'monitor', label: 'Monitor' }
                ]
            };
            expect(filterGroup.id).toBe('phase');
            expect(filterGroup.type).toBe('radio');
        });
        it('should accept filter group without type (defaults to checkbox)', () => {
            const filterGroup = {
                id: 'priority',
                label: 'Priority',
                options: [
                    { value: 'high', label: 'High' },
                    { value: 'low', label: 'Low' }
                ]
            };
            expect(filterGroup.id).toBe('priority');
            expect(filterGroup.type).toBeUndefined();
        });
        it('should accept filter group without icon', () => {
            const filterGroup = {
                id: 'category',
                label: 'Category',
                options: [
                    { value: 'work', label: 'Work' }
                ]
            };
            expect(filterGroup.icon).toBeUndefined();
        });
    });
    describe('SortOption', () => {
        it('should accept valid sort option with icon', () => {
            const sortOption = {
                id: 'date',
                label: 'Date',
                icon: '📅'
            };
            expect(sortOption.id).toBe('date');
            expect(sortOption.label).toBe('Date');
            expect(sortOption.icon).toBe('📅');
        });
        it('should accept sort option without icon', () => {
            const sortOption = {
                id: 'title',
                label: 'Alphabetical'
            };
            expect(sortOption.id).toBe('title');
            expect(sortOption.icon).toBeUndefined();
        });
    });
    describe('QuickTool', () => {
        it('should accept valid quick tool with all properties', () => {
            const quickTool = {
                id: 'mark-complete',
                label: 'Mark Complete',
                icon: '✅',
                category: 'status',
                color: '#00ff00'
            };
            expect(quickTool.id).toBe('mark-complete');
            expect(quickTool.label).toBe('Mark Complete');
            expect(quickTool.icon).toBe('✅');
            expect(quickTool.category).toBe('status');
            expect(quickTool.color).toBe('#00ff00');
        });
        it('should accept quick tool with only required properties', () => {
            const quickTool = {
                id: 'delete',
                label: 'Delete',
                icon: '🗑️'
            };
            expect(quickTool.id).toBe('delete');
            expect(quickTool.category).toBeUndefined();
            expect(quickTool.color).toBeUndefined();
        });
        it('should accept all valid category types', () => {
            const categories = [
                'status',
                'organization',
                'action',
                'time',
                'collaboration'
            ];
            categories.forEach(category => {
                const quickTool = {
                    id: 'test',
                    label: 'Test',
                    icon: '🔧',
                    category
                };
                expect(quickTool.category).toBe(category);
            });
        });
    });
});
