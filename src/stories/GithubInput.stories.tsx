import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GithubInput } from "@/components/shared/GithubInput";

const meta: Meta<typeof GithubInput> = {
  title: "Shared/GithubInput",
  component: GithubInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GithubInput>;

export const Default: Story = {
  args: {
    onSubmit: (username) => alert(`분석 요청: ${username}`),
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    onSubmit: () => {},
    isLoading: true,
  },
};
