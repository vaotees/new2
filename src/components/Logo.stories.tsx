import type { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

const meta = {
  title: 'Design System/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    primaryColor: { control: 'color' },
    secondaryColor: { control: 'color' },
    textLine1: { control: 'text' },
    textLine2: { control: 'text' },
  },
  args: {
    primaryColor: '#F97316',
    secondaryColor: '#64748B',
    textLine1: 'SOLUÇÕES',
    textLine2: 'DIGITAIS',
    className: 'w-48 h-auto',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: {
    className: 'w-64 h-auto',
  },
};

export const Small: Story = {
  args: {
    className: 'w-24 h-auto',
  },
};
