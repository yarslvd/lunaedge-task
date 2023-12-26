import type {Meta, StoryObj} from '@storybook/react';

import {Select} from "../components/Select";

const meta = {
  title: 'Example/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    helpText: 'This is help text',
    optional: true,
    disabled: false,
  },
  parameters: {
    docs: {
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: 'shown' }, // start with the source open
      source: { type: 'code' }, // forces the raw source code (rather than the rendered JSX).
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    helpText: 'This is help text',
    optional: true,
    disabled: true,
  },
  parameters: {
    docs: {
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: 'shown' }, // start with the source open
      source: { type: 'code' }, // forces the raw source code (rather than the rendered JSX).
    },
  },
};

export const MultipleOptions: Story = {
  args: {
    label: 'Label',
    helpText: 'This is help text',
    optional: true,
    disabled: false,
    multiple: true
  },
  parameters: {
    docs: {
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: 'shown' }, // start with the source open
      source: { type: 'code' }, // forces the raw source code (rather than the rendered JSX).
    },
  },
};