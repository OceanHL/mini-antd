import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../components/Input/Input";

// fas 把所有图表都引入
library.add(fas);

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Input",
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Input>;

const ControlledInput = () => {
  const [value, setValue] = useState("");
  return <Input value={value} onChange={e => setValue(e.target.value)} />;
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = args => (
  <div style={{ width: 400 }}>
    <Input {...args} />
  </div>
);

export const defaultInput = () => {
  return (
    <div style={{ width: 400 }}>
      <Input />
      <ControlledInput />
    </div>
  );
};
defaultInput.args = {};
defaultInput.storyName = "Input";

export const DisableInput = Template.bind({});
DisableInput.args = {
  disabled: true,
};
DisableInput.storyName = "被禁用的 Input";

export const IconInput = Template.bind({});
IconInput.args = {
  icon: "coffee",
};
IconInput.storyName = "带图标的 Input";

export const LGSMInput = () => {
  return (
    <div style={{ width: 400 }}>
      <Input size='lg' />
      <Input size='sm' />
    </div>
  );
};
LGSMInput.storyName = "大小不同的 Input";

export const PreInput = () => {
  return (
    <div>
      <Input style={{ width: "300px" }} defaultValue='prepend text' prepend='https://' />
      <Input style={{ width: "300px" }} defaultValue='google' append='.com' />
    </div>
  );
};
PreInput.args = {};
PreInput.storyName = "带前后缀的 Input";
