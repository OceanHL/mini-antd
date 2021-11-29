import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { AutoComplete } from "../components/AutoComplete/AutoComplete";
import type { DataSourceType } from "../components/AutoComplete/AutoComplete";
export default {
  title: "Example/AutoComplete",
  component: AutoComplete,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AutoComplete>;

const Template: ComponentStory<typeof AutoComplete> = args => <AutoComplete {...args} />;

interface LakerPlayerProps {
  value: string;
  number: number;
}

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

export const SimpleComplete = () => {
  const lakers = [
    "bradley",
    "pope",
    "caruso",
    "cook",
    "cousins",
    "james",
    "AD",
    "green",
    "howard",
    "kuzma",
    "McGee",
    "rando",
  ];
  const lakersWithNumbers = [
    { value: "bradley", number: 11 },
    { value: "pope", number: 1 },
    { value: "caruso", number: 4 },
    { value: "cook", number: 2 },
    { value: "cousins", number: 15 },
    { value: "james", number: 23 },
    { value: "AD", number: 3 },
    { value: "green", number: 14 },
    { value: "howard", number: 39 },
    { value: "kuzma", number: 0 },
  ];
  // const handleFetch = (query: string) => {
  //   return lakers.filter(item => item.includes(query)).map(name => ({ value: name }));
  // };

  const renderOption = (item: { value: string }) => {
    return <p>Name: {item.value}</p>;
  };

  // const handleFetch = (query: string) => {
  //   return lakersWithNumbers.filter(palyer => palyer.value.includes(query));
  // };
  // const renderOption = (item: DataSourceType<Omit<LakerPlayerProps, "value">>) => {
  //   return (
  //     <>
  //       <h2>Name: {item.value}</h2>
  //       <p>Number: {item.number}</p>
  //     </>
  //   );
  // };

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log("items", items);
        const formatItems = items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
        return formatItems;
      });
  };
  // const renderOption = (item: DataSourceType<GithubUserProps>) => {
  //   return (
  //     <>
  //       <h2>Name: {item.value}</h2>
  //       <p>{item.url}</p>
  //     </>
  //   );
  // };
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("selected")}
      renderOption={renderOption}
    />
  );
};
SimpleComplete.storyName = "AutoComplete";
