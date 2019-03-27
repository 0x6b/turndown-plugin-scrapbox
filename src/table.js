const rules = {
  tableCell: {
    filter: ["th", "td"],
    replacement: (content, node) => `\t${node.textContent.trim() === "" ? "(blank)" : node.textContent}`
  },
  tableRow: {
    filter: "tr",
    replacement: (content, node) => {
      let borderCells = "";

      if (isHeadingRow(node)) {
        for (let i = 0; i < node.childNodes.length; i++) {
          borderCells += `\t${"-----"}`;
        }
      }

      return `\n${content}\n${borderCells}`;
    }
  },
  table: {
    // Only convert table with a heading row.
    filter: node => node.nodeName === "TABLE" && isHeadingRow(node.rows[0]),
    replacement: content => `\n\ntable:table${content.replace("\n\n", "\n")}\n\n`
  },
  tableSection: {
    filter: ["thead", "tbody", "tfoot"],
    replacement: content => content
  }
};

// A tr is a heading row if:
// - the parent is a THEAD
// - or if its the first child of the TABLE or the first TBODY (possibly
//   following a blank THEAD)
// - and every cell is a TH
function isHeadingRow(tr) {
  const { childNodes, parentNode } = tr;
  return (
    parentNode.nodeName === "THEAD" ||
    (parentNode.firstChild === tr &&
      (parentNode.nodeName === "TABLE" || isFirstTbody(parentNode)) &&
      Array.prototype.every.call(childNodes, function(n) {
        return n.nodeName === "TH";
      }))
  );
}

function isFirstTbody(element) {
  const previousSibling = element.previousSibling;
  return (
    element.nodeName === "TBODY" &&
    (!previousSibling || (previousSibling.nodeName === "THEAD" && /^\s*$/i.test(previousSibling.textContent)))
  );
}

export default function table(turndownService) {
  turndownService.keep(function(node) {
    return node.nodeName === "TABLE" && !isHeadingRow(node.rows[0]);
  });
  Object.keys(rules).forEach(key => {
    turndownService.addRule(key, rules[key]);
  });
}
