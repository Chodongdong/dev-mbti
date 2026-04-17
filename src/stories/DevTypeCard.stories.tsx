import type { Meta, StoryObj } from "@storybook/react";
import { DevTypeCard } from "@/components/shared/DevTypeCard";
import { DEV_TYPES } from "@/constants/devTypes";

const meta: Meta<typeof DevTypeCard> = {
  title: "Shared/DevTypeCard",
  component: DevTypeCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof DevTypeCard>;

export const Default: Story = {
  args: {
    devType: DEV_TYPES[0],
    size: "md",
  },
};

export const Small: Story = {
  args: {
    devType: DEV_TYPES[1],
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    devType: DEV_TYPES[2],
    size: "lg",
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[600px]">
      {DEV_TYPES.map((type) => (
        <DevTypeCard key={type.id} devType={type} size="sm" />
      ))}
    </div>
  ),
};
