import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialCard } from './TestimonialCard';

const meta = {
  title: 'Design System/TestimonialCard',
  component: TestimonialCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    quote: 'A AURÁ transformou completamente a presença digital da nossa empresa. Em 6 meses triplicamos o tráfego orgânico e duplicamos as conversões. Um trabalho impecável.',
    name: 'Rafael Mendes',
    role: 'CEO, Mendes Investimentos',
    stars: 5,
    color: '#4F46E5',
    initials: 'RM',
  },
  argTypes: {
    quote: { control: 'text' },
    name: { control: 'text' },
    role: { control: 'text' },
    stars: { control: { type: 'number', min: 1, max: 5 } },
    color: { control: 'color' },
    initials: { control: 'text' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TestimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
