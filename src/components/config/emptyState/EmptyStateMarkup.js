import { EmptyState } from "@shopify/polaris";
import React from "react";
import { emptyStateImage } from "../../../config/theme";

const EmptyStateMarkup = ({ toggleModal }) => {
  return (
    <EmptyState
      heading="No task found!"
      action={{ content: "Add new task!", onAction: toggleModal }}
      image={emptyStateImage}
    />
  );
};

export default EmptyStateMarkup;
