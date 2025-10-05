import type { CuisineName, CuisineObject } from "../types/cuisines";

export const cuisines = {
  afghan: { icon: "🇦🇫", url: "/afghanHyatt/afghanHyatt.jpg" },
  bangladeshi: { icon: "🇧🇩", url: "/chaAdda/chaAdda.jpeg" },
  brunch: { icon: "🥞", url: "/cafeOmnia/cafeOmnia.jpg" },
  chinese: { icon: "🇨🇳", url: "/tian380/tian380.jpg" },
  dessert: { icon: "🍰", url: "/homm/homm.jpg" },
  fishChips: { icon: "🐟", url: "/blueFinBlairgowrie/blueFinBlairgowrie.jpg" },
  greek: { icon: "🇬🇷", url: "/hellenicDepot/hellenicDepot.jpg" },
  indian: { icon: "🇮🇳", url: "/claytonChettinad/claytonChettinad.avif" },
  italian: {
    icon: "🇮🇹",
    url: "/cicciosWoodfirePizzeria/cicciosWoodfirePizzeria.jpg",
  },
  japanese: { icon: "🇯🇵", url: "/shyun/shyun.jpg" },
  korean: { icon: "🇰🇷", url: "/bonChickenAndBeer/bonChickenAndBeer.jpeg" },
  malaysian: { icon: "🇲🇾", url: "/laksaTown/laksaTown.jpg" },
  mexican: { icon: "🇲🇽", url: "/henchoEnMexico/henchoEnMexico.jpeg" },
  middleEastern: {
    icon: "🕌",
    url: "/thePocketMiddleEasternEatery/thePocketMiddleEasternEatery.jpeg",
  }, // region, no single flag
  pastry: { icon: "🥐", url: "/drom/drom.jpg" },
  pub: { icon: "🍺", url: "/railwayHotel/railwayHotel.jpg" },
  thai: { icon: "🇹🇭", url: "/soi38/soi38.jpg" },
  uyghur: { icon: "🏜️", url: "/amat/amat.jpg" }, // region (Xinjiang), no official flag
  vietnamese: {
    icon: "🇻🇳",
    url: "/banhMiPhoMurrumbeena/banhMiPhoMurrumbeena.jpg",
  },
  western: { icon: "🍽️", url: "/huffsBagelry/huffsBagelry.jpg" },
} as Record<CuisineName, CuisineObject>;
