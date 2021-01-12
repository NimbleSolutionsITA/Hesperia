const settings = {
  name: "hesperia",
  state: {
    frontity: {
      url: "http://localhost:3005",
      title: "Hesperia Hospital",
      description: "WordPress installation for Frontity development"
    }
  },
  packages: [
    {
      name: "@frontity/mars-theme",
      state: {
        theme: {
          featured: {
            showOnList: false,
            showOnPost: false
          }
        }
      }
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://wp.nimble-lab.com",
          homepage: "/inizio",
          postTypes: [
            {
              type: "practical_info",
              endpoint: "practical_info",
              archive: "/practical_info",
            },
            {
              type: "doctors",
              endpoint: "doctors",
              archive: "/doctors",
            },
            {
              type: "services",
              endpoint: "services",
              archive: "/services",
            },
          ]
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;