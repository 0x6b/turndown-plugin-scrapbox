export default function hr(turndownService) {
  turndownService.addRule("hr", {
    filter: "hr",
    replacement: () => "----------"
  });
}
