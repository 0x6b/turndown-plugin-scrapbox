import heading from "./heading";
import list from "./list";
import hr from "./hr";
import char from "./char";
import link from "./link";
import code from "./code";
import image from "./image";
import table from "./table";

export default function scrapbox(turndownService) {
  turndownService.use([heading, list, hr, char, link, code, image, table]);
}
