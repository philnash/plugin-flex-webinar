# Quick Start to Developing with [Twilio Flex](https://www.twilio.com/docs/flex)

This plugin is a collection of functionality added to Twilio Flex as part of the webinar [Quick Start to Developing with Twilio Flex](https://www.twilio.com/go/flex-webinar-may2021-apac-1).

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

* [Running the plugin](#running-the-plugin)
  * [Setup](#setup)
  * [Development](#development)
* [Functionality](#functionality)
  * [Branding and theming](#branding-and-theming)
    * [Learn more](#learn-more)
  * [Actions Framework](#actions-framework)
    * [Learn more](#learn-more-1)
  * [Adding React Components and setting attributes on tasks](#adding-react-components-and-setting-attributes-on-tasks)
    * [Learn more](#learn-more-2)
  * [Integrating a CRM](#integrating-a-crm)
    * [Create a Twilio Function](#create-a-twilio-function)
    * [Use the Function from Twilio Studio](#use-the-function-from-twilio-studio)
    * [Integrate the CRM into the UI](#integrate-the-crm-into-the-ui)
    * [Learn more](#learn-more-3)

## Running the plugin

### Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Clone the repo and install the dependencies:

```bash
git clone https://github.com/philnash/plugin-flex-webinar.git
npm install
```

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
npm install -g twilio-cli
```

Finally, install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex@beta
```

### Development

To start the local Flex instance and see your plugin running, run:

```bash
twilio flex:plugins:start
```

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.

## Functionality

This example plugin implements various bits of functionality. Each is an example of how you can use or customise Flex, and for each you can go further and deeper. Here is how each part works and the resources to learn more:

### Branding and theming

Change the main logo in flex by [setting `flex.MainHeader.defaultProps.logoUrl` to the URL of your logo](./src/FlexWebinarPlugin.js#L23).

Change the theme colours by defining a [theme object](./src/myTheme.js) that contains the base theme, base colours and overrides. You then apply the theme by [updating the config of the `manager` object](./src/FlexWebinarPlugin.js#L25).

#### Learn more

* Flex docs on [overriding Flex UI themes, branding and styling](https://www.twilio.com/docs/flex/developer/ui/themes-branding-styling)
* [Flexercise #2: UI Customizations](https://www.twiliotraining.com/store/819633-flexercise-2-ui-customizations)

### Actions Framework

There are many things you can hook into using the Flex Actions framework. In this example we [listen for new reservations for the current worker](./src/FlexWebinarPlugin.js#L28) and immediately [accept the task, then select it](./src/FlexWebinarPlugin.js#L29-L30) to show in the UI.

#### Learn more

* This example was based on the [Auto Answer Flex Plugin](https://github.com/lehel-twilio/plugin-autoanswer)
* [Flexercise #6: More UI Customizations](https://www.twiliotraining.com/store/987479-flexercise-6-more-ui-customizations)
* [Twilio Docs on the Actions Framework](https://www.twilio.com/docs/flex/developer/ui/actions)
* [All available Actions](https://assets.flex.twilio.com/docs/releases/flex-ui/1.26.1/Actions.html)

### Adding React Components and setting attributes on tasks

You can create your own React components and add them to any part of the React UI. In this example, we add a form to update the customer name on the task to the task info panel. The [`CustomerName` component](./src/components/CustomerName.js) is much like any other React component, though we do wrap it with the `withTaskContext` function so that it has access to the current task in the component's `props`. We then [add the component to the UI](./src/FlexWebinarPlugin.js#L34-L37) using Flex's dynamic ability to add, remove or replace components anywhere in the component tree.

#### Learn more

* [Twilio Docs on Flex UI Components](https://www.twilio.com/docs/flex/developer/ui/components)
* [Creating and Styling Custom Components](https://www.twilio.com/docs/flex/developer/plugins/creating-styling-custom-components)
* [Add Task and Theme Context to Components](https://www.twilio.com/docs/flex/developer/ui/add-component-context)

### Integrating a CRM

Integrating a CRM digs beneath the UI. To fetch the user details from the CRM we use [Twilio Studio](https://www.twilio.com/docs/studio) to intercept the call and make a call to a [Twilio Function](https://www.twilio.com/docs/runtime/functions).

For this example, we are integrating to [HubSpot](https://www.hubspot.com/). You can [sign up for a free account](https://www.hubspot.com/products/get-started) and add your contact details to your own CRM to test with.

#### Create a Twilio Function

The Twilio Function makes a request to the [HubSpot API](https://developers.hubspot.com/docs/api/overview) to search for contacts using the number that called into your Twilio number. If a contact is returned it returns a JSON object with the full name and ID of the contact. [You can see an example of the Function here](./functions/hubspot.js). To use this function:

1. Create a [Function Service](https://www.twilio.com/console/functions/overview)
2. Add your [HubSpot API Key](https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key) to the environment variables as `HUBSPOT_API_KEY`
3. Add `axios` to the dependencies
4. Create a Function and give it a path, like `/hubspot`
5. Paste the code from [`./functions/hubspot.js`](./functions/hubspot.js) into the Function
6. Save the Function and deploy the Service

#### Use the Function from Twilio Studio

Open [Twilio Studio](https://www.twilio.com/console/studio/dashboard) and select the Voice IVR flow. Drag a Function Widget onto the canvas and name it `getDetails`. In the widget config select the Service, Environment (ui), and Function (`/hubspot`). Add one Function parameter, naming the key "From" and the value `{{trigger.call.From}}`.

Connect the incoming call trigger to the `getDetails` widget and then connect the success transition to the Flex widget. In the Flex widget config, update the attributes to:

```json
{
  "type": "inbound",
  "name": "{{widgets.getDetails.parsed.fullName}}",
  "crmid": "{{widgets.getDetails.parsed.crmid}}"
}
```

Save and Publish the Studio flow.

Now when you call your Flex number, the customer name will come through from the CRM.

#### Integrate the CRM into the UI

We still need to integrate the CRM into the UI. To do this we update the [`flex.CRMContainer.defaultProps.uriCallback` to a function that returns the HubSpot URL for either the contacts list or the contact that has called by the CRM ID we fetched from the API](./src/FlexWebinarPlugin.js#L40-L46).

#### Learn more

* [Configuring CRM integration](https://www.twilio.com/docs/flex/developer/ui/configuration#configuring-crm-integration)
* [Flexercise #3: Embedding CRMs](https://www.twiliotraining.com/store/846416-flexercise-3-embedding-crms)
* [Flexercise #4: Advanced CRM Integration](https://www.twiliotraining.com/store/927838-flexercise-4-advanced-crm-integration)
* [Flexercise #5: CRM Integration & Security](https://www.twiliotraining.com/store/963034-flexercise-5-crm-integration-security)
