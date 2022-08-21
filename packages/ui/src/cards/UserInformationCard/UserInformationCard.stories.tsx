import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserInformationCard } from "./UserInformationCard";

export default {
  title: "Cards/UserInformationCard",
  component: UserInformationCard,
  argTypes: {},
} as ComponentMeta<typeof UserInformationCard>;

const Template: ComponentStory<typeof UserInformationCard> = (args) => (
  <UserInformationCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "SCRUM MASTER",
  description: "Sabre Corporation · Fulltime",
  timeSpent: "Oct 2021 - Present (9 mos)",
  isEditable: true,
};
