---
title: "Birding Life List"
_date: "2023-11-04"
pinned: false
draft: false
reverse_sections: false
evaluate_js: true
---

```js
const data = [
  // Headers
  ["Species", "Date", "Location", "Note"],
  // Entries
  ["Eurasian Tree Sparrow", "2023/07-09", "Taytay, Rizal, PH"],
  ["Yellow-vented Bulbul", "2023/07-09", "Taytay, Rizal, PH"],
  ["Rock Pigeon", "2023/07-09", "Taytay, Rizal, PH"],
  ["Zebra Dove", "2023/07-09", "Taytay, Rizal, PH"],
  ["Philippine Pied Fantail", "2023/07-09", "Taytay, Rizal, PH", "Beautiful tail"],
  ["Garden (Olive-backed) Sunbird", "2023/07-09", "Taytay, Rizal, PH", "Chirpy"],
  ["Black-naped Oriole", "2023/07-09", "Taytay, Rizal, PH", "Noisy; sounds like it's whistling"],
  ["White-breasted Waterhen", "2023/07-09", "Taytay, Rizal, PH", "Cute; soft bubbly sounds"],
  ["Java Sparrow", "2023/07-09", "Taytay, Rizal, PH"],
  ["Large-billed Crow", "2023/07-09", "Taytay, Rizal, PH"],
  ["Crested Myna", "2023/07-09", "Taytay, Rizal, PH"],
  ["Golden-bellied Gerygone", "2023/07-09", "Taytay, Rizal, PH", "Fabulous singer"],
  ["American Crow", "2023/09/22", "Daly City, CA, US"],
  ["Common Raven", "2023/09/22", "Daly City, CA, US", "Soars a lot; big and majestic"],
  ["Steller's Jay", "2023/09/23", "San Francisco, CA, US", "Stunning but noisy"],
  ["Red-winged Blackbird", "2023/09/23", "San Francisco, CA, US"],
  ["Mallard", "2023/09/23", "San Francisco, CA, US"],
  ["Brown Pelican", "2023/09/23", "San Francisco, CA, US", "Spectacular dive bombs"],
  ["California Scrub-Jay", "2023/09/24", "Daly City, CA, US"],
  ["Acorn Woodpecker", "2023/09/24", "Oakhurst, CA, US", "Sounds like a monkey"],
  ["Anna's Hummingbird", "2023/09/24", "Oakhurt, CA, US"],
  ["California Quail", "2023/09/24", "Oakhurst, CA, US"],
  ["Brewer's Blackbird", "2023/09/25", "Yosemite, CA, US"],
  ["House Sparrow", "2023/09-10", "New York, NY, US"],
  ["Double-crested Cormorant", "2023/09-10", "New York, NY, US"],
  ["Laughing Gull", "2023/09-10", "New York, NY, US"],
  ["Ring-billed Gull", "2023/09-10", "New York, NY, US"],
  ["Canada Goose", "2023/09-10", "New York, NY, US"],
  ["Mute Swan", "2023/09-10", "New York, NY, US"],
  ["European (Common) Starling", "2023/09-10", "New York, NY, US"],
  ["American Robin", "2023/09-10", "New York, NY, US"],
  ["Yellow-bellied Sapsucker", "2023/09-10", "New York, NY, US"],
  ["Gray Catbird", "2023/09-10", "New York, NY, US", "Cute; surprisingly loud"],
  ["Ovenbird", "2023/09-10", "New York, NY, US"],
  ["White-throated Sparrow", "2023/09-10", "New York, NY, US"],
  ["Common Yellowthroat", "2023/09-10", "New York, NY, US"],
  ["Blue Jay", "2023/09-10", "New York, NY, US", "Stunning but very noisy"],
  ["Red-bellied Woodpecker", "2023/09-10", "New York, NY, US"],
  ["Downy Woodpecker", "2023/09-10", "New York, NY, US"],
  ["Mourning Dove", "2023/09-10", "New York, NY, US"],
  ["Northern Cardinal", "2023/09-10", "New York, NY, US", "One of my favorites"],
  ["Ruby-crowned Kinglet", "2023/09-10", "New York, NY, US", "Cute, tiny and hyperactive; crown usually hidden"],
  ["Golden-crowned Kinglet", "2023/09-10", "New York, NY, US"],
  ["Winter Wren", "2023/09-10", "New York, NY, US", "Cute and tiny"],
  ["Eastern Towhee", "2023/09-10", "New York, NY, US"],
  ["Hermit Thrush", "2023/09-10", "New York, NY, US"],
  ["American Coot", "2023/09-10", "New York, NY, US", "Hangs out with ducks"],
  ["Great Blue Heron", "2023/09-10", "New York, NY, US", "Majestic"],
  ["Common Grackle", "2023/09-10", "New York, NY, US"],
  ["Cooper's Hawk (?)", "2023/09-10", "New York, NY, US", "Fairly large; light and streaked underparts; barred tail; possible red-tailed hawk"],
  ["American Kestrel", "2023/10/19", "New York, NY, US", "Distinctive little raptor; hovers and plunges after prey; personal highlight"],
  ["California Gull", "2023/10/21", "Daly City, CA, US"],
  ["Red-tailed Hawk", "2023/10/21", "Daly City, CA, US"],
  ["Golden-crowned Sparrow", "2023/10-21", "Daly City, CA, US"],
  ["Brown Shrike", "2023/10/23-29", "Taytay, Rizal, PH", "Sleek, noisy"],
  ["White-breasted Woodswallow", "2023/10/23-29", "Taytay, Rizal, PH", "Chunky"],
  ["Spotted Dove", "2023/10/23-29", "Taytay, Rizal, PH", "Beautiful!"],
  ["White-browed Crake", "2023/10/23-29", "Taytay, Rizal, PH", "Sounds like a squeaky toy"],
  ["Eurasian (Common) Moorhen", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Coppersmith Barbet", "2023/10/23-29", "Taytay, Rizal, PH", "Stunning"],
  ["Cattle Egret", "2023/10/23-29", "Taytay, Rizal, PH", "Stockier than other egrets"],
  ["Grey Heron", "2023/10/23-29", "Taytay, Rizal, PH", "Likes to perch on treetops"],
  ["Purple Heron", "2023/10/23-29", "Taytay, Rizal, PH", "Spectacular coloration"],
  ["Whiskered Tern", "2023/10/23-29", "Taytay, Rizal, PH", "Bounces around a lot"],
  ["Red-keeled Flowerpecker", "2023/10/23-29", "Taytay, Rizal, PH", "Gorgeous; clicking sounds"],
  ["Scaly-breasted Munia", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Philippine Glossy (Grey-rumped) Swiftlet", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Philippine Pygmy Woodpecker", "2023/10/30", "Taytay, Rizal, PH"],
  ["Little Egret", "2023/10/30", "Taytay, Rizal, PH"],
  ["Black-winged Stilt", "2023/10/31", "Taytay, Rizal, PH", "Very cute and distinctive"],
  ["Cinnamon Bittern", "2023/10/31", "Taguig, PH"],
  ["Common Sandpiper", "2023/11/03", "Taytay, Rizal, PH"],
  ["Long-tailed Shrike", "2023/11/04", "Quezon City, PH", "Handsome"],
  ["Pied Triller", "2023/11/04", "Quezon City, PH"],
  ["Pygmy Flowerpecker (?)", "2023/11/04", "Quezon City, PH"],
];

function render(data) {
  const spans = [4, 2, 3, 3];
  const headers = data[0];
  data.shift();

  const countries = [...new Set(data.map(([,, loc]) => {
    return loc.split(",").reverse()[0].trim();
  }))];

  return (
    `<ol>
      <div class="row">
        ${headers.map((header, i) => {
          const cls = `col-md-${spans[i]} bold`;
          return `<div class="${cls}">${header}</div>`;
        }).join("\n")}
      </div>
      <div>
        ${data.map((entry) => {
          return `
            <li>
              <div class="row">
                ${entry.map((item, i) => {
                  const cls = `col-md-${spans[i]} ${i > 0 && "small"}`;
                  return `<div class="${cls}">${item}</div>`;
                }).join("\n")}
              </div>
            </li>
          `.trim();
        }).join("\n")}
      </div>
      <div class="my-4">
        ${countries.map((ct) => {
          const count = data.filter(([,, loc]) => loc.endsWith(ct)).length;
          return `<div><strong>No. of ${ct} species:</strong> ${count}</div>`;
        }).join("\n")}
      </div>
    </ol>`
  );
};

render(data);
```
