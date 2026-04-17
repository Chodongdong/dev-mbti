import type { Meta, StoryObj } from "@storybook/react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

const meta: Meta<typeof LoadingSpinner> = {
  title: "Shared/LoadingSpinner",
  component: LoadingSpinner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {};

export const WithMessage: Story = {
  args: {
    message: "GitHub 데이터 수집 중...",
  },
};
