import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import { mainMenu, pagesMap, categories } from "./config";

const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      lang: ({ state }) => state.router.link.split('/')[1] === 'en' ? 'en' : 'it',
      currentPage: ({ state }) => pagesMap.filter(page => page[state.theme.lang][1] === state.router.link)[0],
      autoPrefetch: "in-view",
      menu: ({ state }) => mainMenu(state.theme.lang),
      openTuoTempo: false,
      featured: {
        showOnList: false,
        showOnPost: false,
      },
    },
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      beforeSSR: async ({ actions, state }) => {
        await actions.source.fetch(pagesMap[1][state.theme.lang][1])
        await actions.source.fetch(pagesMap[2][state.theme.lang][1])
        await actions.source.fetch(`/practical_info/`)
        await actions.source.fetch(`/services/`)
        const getServices = state.source.get('/services/')
        getServices.totalPages > 1 && await actions.source.fetch(`/services/page/2/`)
        getServices.totalPages > 2 && await actions.source.fetch(`/services/page/3/`)
        await actions.source.fetch(pagesMap[8][state.theme.lang][1])
        await actions.source.fetch(`/doctors/`)
        const getDoctors = state.source.get('/doctors/')
        getDoctors.totalPages > 1 && await actions.source.fetch(`/doctors/page/2/`)
        getDoctors.totalPages > 2 && await actions.source.fetch(`/doctors/page/3/`)
        await Promise.all(
            Object.values(categories(state.theme.lang))
                .map(category => actions.source.fetch(`/category/${category}`))
        )
      },
      toggleLanguage: ({ state, actions }) => {
        const otherPage = state.theme.currentPage ?
            state.theme.currentPage[state.theme.lang === 'it' ? 'en' : 'it'][1] :
            state.theme.lang === 'it' ? '/en/start' : '/';
        actions.router.set(otherPage)
      },
      toggleTuoTempo: ({state}) => state.theme.openTuoTempo = !state.theme.openTuoTempo
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [image, iframe, link],
    },
  },
};

export default marsTheme;
