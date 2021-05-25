import React from "react";
import { FlexPlugin } from "flex-plugin";

import theme from "./myTheme";

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
    flex.MainHeader.defaultProps.logoUrl =
      "https://tangerine-toad-5117.twil.io/assets/feathercorp-logo-white.svg";
    manager.updateConfig({ colorTheme: theme });

    manager.workerClient.on("reservationCreated", async (reservation) => {
      await flex.Actions.invokeAction("AcceptTask", { sid: reservation.sid });
      await flex.Actions.invokeAction("SelectTask", { sid: reservation.sid });
    });
  }
}
