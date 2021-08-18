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
    // Branding and theming
    flex.MainHeader.defaultProps.logoUrl =
      "https://earthy-development-1769.twil.io/logo.png";
    manager.updateConfig({ colorTheme: theme });

    // Actions Framework
    // When a reservation is created, immediately accept the reservation
    manager.workerClient.on("reservationCreated", async (reservation) => {
      await flex.Actions.invokeAction("AcceptTask", { sid: reservation.sid });
      await flex.Actions.invokeAction("SelectTask", { sid: reservation.sid });
    });

    // When hanging up on a call, complete the task after a timeout
    flex.Actions.addListener("afterHangupCall", (payload) => {
      console.log("MY AFTER HANGUP CALL", payload);
      setTimeout(() => {
        flex.Actions.invokeAction("CompleteTask", { sid: payload.task.sid });
      }, 5000);
    });

    // Adding React Components and setting attributes on tasks
    flex.TaskInfoPanel.Content.add(
      <CustomerName key="customer-name"></CustomerName>,
      { sortOrder: -1 }
    );

    // Integrating a CRM
    // flex.CRMContainer.defaultProps.uriCallback = (task) => {
    //   if (task && task.attributes.crmid) {
    //     return `https://app.hubspot.com/contacts/20105123/contacts/${task.attributes.crmid}`;
    //   } else {
    //     return "https://app.hubspot.com/contacts/20105123/contacts/list/view/all/";
    //   }
    // };
  }
}
