import { EmptyState } from "@shopify/polaris";
import React from "react";

const EmptyStateMarkup = ({ toggleModal }) => {
  return (
    <EmptyState
      heading="No task found!"
      action={{ content: "Add new task!", onAction: toggleModal }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    />
  );
};

export default EmptyStateMarkup;
