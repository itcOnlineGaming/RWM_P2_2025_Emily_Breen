import type { Meta, StoryObj } from '@storybook/svelte';
import SrlSidebar from './SrlSidebar.svelte';
import type { QuickTool } from './types';

interface DraggableItem {
  id: string;
  text: string;
  category: string;
  difficulty: string;
  dueDate: string;
}

const meta = {
  title: 'Components/SrlSidebar',
  component: SrlSidebar,
  tags: ['autodocs'],
  argTypes: {
    draggableItems: { control: 'object' },
    quickTools: { control: 'object' },
    isAuthenticated: { control: 'boolean' },
    initialCollapsed: { control: 'boolean' },
    onItemDrop: { action: 'item-dropped' },
    onLogin: { action: 'login-clicked' },
    onLogout: { action: 'logout-clicked' },
  },
} satisfies Meta<SrlSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: DraggableItem[] = [
  { id: '1', text: 'Reading Assignment', category: 'Readings', difficulty: 'Easy', dueDate: '2025-12-15' },
  { id: '2', text: 'Math Problem Set', category: 'Homework', difficulty: 'Hard', dueDate: '2025-12-10' },
  { id: '3', text: 'Science Lab Report', category: 'Labs', difficulty: 'Medium', dueDate: '2025-12-20' },
  { id: '4', text: 'History Essay', category: 'Essays', difficulty: 'Medium', dueDate: '2025-12-18' },
  { id: '5', text: 'Programming Project', category: 'Projects', difficulty: 'Hard', dueDate: '2025-12-22' },
];

const sampleTools: QuickTool[] = [
  { id: 'tool1', label: 'Timer', icon: '⏱️' },
  { id: 'tool2', label: 'Notes', icon: '📝' },
  { id: 'tool3', label: 'Calculator', icon: '🧮' },
];

export const Default: Story = {
  args: {
    draggableItems: sampleItems,
    quickTools: sampleTools,
    isAuthenticated: false,
    initialCollapsed: false,
  },
};

export const Authenticated: Story = {
  args: {
    draggableItems: sampleItems,
    quickTools: sampleTools,
    isAuthenticated: true,
    initialCollapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    draggableItems: sampleItems,
    quickTools: sampleTools,
    isAuthenticated: false,
    initialCollapsed: true,
  },
};

export const Empty: Story = {
  args: {
    draggableItems: [],
    quickTools: [],
    isAuthenticated: false,
    initialCollapsed: false,
  },
};

export const ManyItems: Story = {
  args: {
    draggableItems: [
      ...sampleItems,
      { id: '6', text: 'Biology Quiz', category: 'Quizzes', difficulty: 'Easy', dueDate: '2025-12-12' },
      { id: '7', text: 'Art Portfolio', category: 'Projects', difficulty: 'Medium', dueDate: '2025-12-25' },
      { id: '8', text: 'Physics Homework', category: 'Homework', difficulty: 'Hard', dueDate: '2025-12-14' },
      { id: '9', text: 'English Presentation', category: 'Presentations', difficulty: 'Medium', dueDate: '2025-12-19' },
      { id: '10', text: 'Chemistry Lab', category: 'Labs', difficulty: 'Hard', dueDate: '2025-12-21' },
    ],
    quickTools: sampleTools,
    isAuthenticated: true,
    initialCollapsed: false,
  },
};
