export default {
  light: true,
  baseName: "FlexLight",
  overrides: {
    MainHeader: {
      Container: {
        background: "#F22F46",
        color: "#FFF",
      },
      Button: {
        color: "#ffffff",
        background: "#F22F46",
      },
    },
    SideNav: {
      Container: {
        background: "#F22F46",
      },
      Button: {
        background: "#F22F46",
        color: "#fff",
      },
      Icon: {
        color: "#fff",
      },
    },
    TaskCanvasHeader: {
      WrapupTaskButton: {
        background: "#F22F46",
        color: "#fff",
      },
      EndTaskButton: {
        background: "#F22F46",
        color: "#fff",
      },
    },
    TaskList: {
      Container: {
        background: "#F22F46",
        color: "#ffffff",
      },
      Item: {
        SelectedContainer: {
          background: "#1c2762",
          color: "#ffffff",
        },
        Container: {
          background: "#ffffff",
          color: "#1c2762",
        },
        Icon: {
          color: "#fff",
          background: "#F22F46",
        },
      },
    },
    NoTasksCanvas: {
      Container: {
        background: "#ffffff",
        color: "#000",
      },
      Hint: {
        color: "#000",
      },
    },
    UserActivityControls: {
      Item: {
        background: "#ffffff",
        color: "#F22F46",
      },
      Items: {
        background: "#ffffff",
        color: "#F22F46",
      },
    },
  },
};
