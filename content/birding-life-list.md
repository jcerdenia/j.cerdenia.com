---
title: "Birding Life List"
_date: "2023-11-04"
pinned: false
draft: false
reverse_sections: false
evaluate: true
---

(function content() {
  const data = [
    ["Eurasian Tree Sparrow", "2023/07-09", "Taytay, Rizal, PH"],
    ["Yellow-vented Bulbul", "2023/07-09", "Taytay, Rizal, PH"],
    ["Rock Pigeon", "2023/07-09", "Taytay, Rizal, PH"],
    ["Zebra Dove", "2023/07-09", "Taytay, Rizal, PH"],
    ["Philippine Pied Fantail", "2023/07-09", "Taytay, Rizal, PH"],
    ["Garden (Olive-backed) Sunbird", "2023/07-09", "Taytay, Rizal, PH"],
    ["Black-naped Oriole", "2023/07-09", "Taytay, Rizal, PH"],
    ["White-breasted Waterhen", "2023/07-09", "Taytay, Rizal, PH"],
    ["Java Sparrow", "2023/07-09", "Taytay, Rizal, PH"],
    ["Large-billed Crow", "2023/07-09", "Taytay, Rizal, PH"],
    ["Crested Myna", "2023/07-09", "Taytay, Rizal, PH"],
    ["Golden-bellied Gerygone", "2023/07-09", "Taytay, Rizal, PH"],
    ["American Crow", "2023/09/22", "Daly City, CA, US"],
    ["Common Raven", "2023/09/22", "Daly City, CA, US"],
    ["Steller's Jay", "2023/09/23", "San Francisco, CA, US"],
    ["Red-winged Blackbird", "2023/09/23", "San Francisco, CA, US"],
    ["Mallard", "2023/09/23", "San Francisco, CA, US"],
    ["Brown Pelican", "2023/09/23", "San Francisco, CA, US"],
    ["California Scrub-Jay", "2023/09/24", "Daly City, CA, US"],
    ["Acorn Woodpecker", "2023/09/24", "Oakhurst, CA, US"],
    ["Anna's Hummingbird", "2023/09/24", "Oakhurt, CA, US"],
    ["California Quail", "2023/09/24", "Oakhurst, CA, US"],
    ["Brewer's Blackbird", "2023/09/25", "Yosemite National Park, CA, US"],
    ["House Sparrow", "2023/09-10", "New York, NY, US"],
    ["Double-crested Cormorant", "2023/09-10", "New York, NY, US"],
    ["Laughing Gull", "2023/09-10", "New York, NY, US"],
    ["Ring-billed Gull", "2023/09-10", "New York, NY, US"],
    ["Canada Goose", "2023/09-10", "New York, NY, US"],
    ["Mute Swan", "2023/09-10", "New York, NY, US"],
    ["European (Common) Starling", "2023/09-10", "New York, NY, US"],
    ["American Robin", "2023/09-10", "New York, NY, US"],
    ["Yellow-bellied Sapsucker", "2023/09-10", "New York, NY, US"],
    ["Gray Catbird", "2023/09-10", "New York, NY, US"],
    ["Ovenbird", "2023/09-10", "New York, NY, US"],
    ["White-throated Sparrow", "2023/09-10", "New York, NY, US"],
    ["Common Yellowthroat", "2023/09-10", "New York, NY, US"],
    ["Blue Jay", "2023/09-10", "New York, NY, US"],
    ["Red-bellied Woodpecker", "2023/09-10", "New York, NY, US"],
    ["Downy Woodpecker", "2023/09-10", "New York, NY, US"],
    ["Mourning Dove", "2023/09-10", "New York, NY, US"],
    ["Northern Cardinal", "2023/09-10", "New York, NY, US"],
    ["Ruby-crowned Kinglet", "2023/09-10", "New York, NY, US"],
    ["Golden-crowned Kinglet", "2023/09-10", "New York, NY, US"],
    ["Winter Wren", "2023/09-10", "New York, NY, US"],
    ["Eastern Towhee", "2023/09-10", "New York, NY, US"],
    ["Hermit Thrush", "2023/09-10", "New York, NY, US"],
    ["American Coot", "2023/09-10", "New York, NY, US"],
    ["Great Blue Heron", "2023/09-10", "New York, NY, US"],
    ["Common Grackle", "2023/09-10", "New York, NY, US"],
    ["Cooper's Hawk (?)", "2023/09-10", "New York, NY, US"],
    ["American Kestrel", "2023/10/19", "New York, NY, US"],
    ["California Gull", "2023/10/21", "Daly City, CA, US"],
    ["Red-tailed Hawk", "2023/10/21", "Daly City, CA, US"],
    ["Golden-crowned Sparrow", "2023/10-21", "Daly City, CA, US"],
    ["Brown Shrike", "2023/10/23-29", "Taytay, Rizal, PH"],
    ["White-breasted Woodswallow", "2023/10/23-29", "Taytay, Rizal, PH"],
    ["Spotted Dove", "2023/10/23-29", "Taytay, Rizal, PH"],
    ["White-browed Crake", "2023/10/23-29", "Taytay, Rizal, PH"],
    ["Eurasian (Common) Moorhen", "2023/10/23-29", "Taytay, Rizal, PH"],
    ["Coppersmith Barbet", "2023/10/23-29", "Taytay, Rizal, PH"],
    ["Cattle Egret", "2023/10/23-29", "Taytay, Rizal, PH"],
    ["Grey Heron", "2023/10/23-29", "Taytay, Rizal, PH"],
    ["Purple Heron", "2023/10/23-29", "Taytay, Rizal, PH"],
    ["Whiskered Tern", "2023/10/23-29", "Taytay, Rizal, PH"],
    ["Red-keeled Flowerpecker", "2023/10/23-29", "Taytay, Rizal, PH"],
    ["Scaly-breasted Munia", "2023/10/23-29", "Taytay, Rizal, PH"],
    ["Philippine Glossy (Grey-rumped) Swiftlet", "2023/10/23-29", "Taytay, Rizal, PH"],
    ["Philippine Pygmy Woodpecker", "2023/10/30", "Taytay, Rizal, PH"],
    ["Little Egret", "2023/10/30", "Taytay, Rizal, PH"],
    ["Black-winged Stilt", "2023/10/31", "Taytay, Rizal, PH"],
    ["Cinnamon Bittern", "2023/10/31", "Taguig, PH"],
    ["Common Sandpiper (?)", "2023/11/03", "Taytay, Rizal, PH"],
    ["Long-tailed Shrike", "2023/11/04", "Quezon City, PH"],
    ["Pied Triller", "2023/11/04", "Quezon City, PH"],
    ["Pygmy Flowerpecker (?)", "2023/11/04", "Quezon City, PH"],
  ];

  const renderedList = data.map(([name, date, loc]) => {
    return `
      <li>
        <div class="row">
          <div class="col-md-5 bold">${name}</div>
          <div class="col-md-3">${date}</div>
          <div class="col-md-4">${loc}</div>
        </div>
      </li>
    `;
  }).join("\n");

  return `
    <ol>
      <div class="row">
        <div class="col-md-5 bold">Species</div>
        <div class="col-md-3 bold">Date</div>
        <div class="col-md-4 bold">Location</div>
      </div>
      ${renderedList}
    </ol>
  `
})();
