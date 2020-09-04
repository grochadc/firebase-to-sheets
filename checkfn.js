const { getNextItem } = require("./lib");

const links = [
  "https://meet.google.com/kzx-emdw-tac",
  "https://meet.google.com/wqf-dmjq-qza",
  "https://meet.google.com/zym-djkh-kmc",
  "https://meet.google.com/huz-dbiq-hry"
];

console.log(getNextItem(links, "https://meet.google.com/huz-diq-hry"));
