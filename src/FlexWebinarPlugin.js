import React from "react";
import { FlexPlugin } from "flex-plugin";

import theme from "./myTheme";
import CustomerName from "./components/CustomerName";

const PLUGIN_NAME = "FlexWebinarPlugin";

export default class FlexWebinarPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    // part 1
    flex.MainHeader.defaultProps.logoUrl =
      "https://tangerine-toad-5117.twil.io/assets/feathercorp-logo-white.svg";
    manager.updateConfig({ colorTheme: theme });

    // part 2
    manager.workerClient.on("reservationCreated", async (reservation) => {
      await flex.Actions.invokeAction("AcceptTask", { sid: reservation.sid });
      await flex.Actions.invokeAction("SelectTask", { sid: reservation.sid });
    });

    // part 3
    flex.TaskInfoPanel.Content.add(
      <CustomerName key="customer-name"></CustomerName>,
      { sortOrder: -1 }
    );

    // part 4
    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      if (task && task.attributes.crmid) {
        return `https://app.hubspot.com/contacts/20105123/contacts/${task.attributes.crmid}`;
      } else {
        return "https://app.hubspot.com/contacts/20105123/contacts/list/view/all/";
      }
    };
  }
}
