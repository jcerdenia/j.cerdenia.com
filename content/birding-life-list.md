---
title: "Birding Life List"
_date: "2023-11-04"
pinned: false
draft: false
reverse_sections: false
evaluate_js: true
---

```js
function render(data) {
  const spans = [4, 3, 2, 3];
  const headers = {};

  data[0].forEach((hdr, i) => {
    const key = hdr.replace(/ /g, '_').toUpperCase();
    headers[key] = { text: hdr, idx: i};
  });

  data.shift();

  const countries = [...new Set(
    data.map(([,,, loc]) => loc.split(",").reverse()[0].trim())
  )].filter((ct) => ct);

  const tables = [
    { title: "", filter: ([name]) => !name.endsWith("?") },
    { title: "Almost sure", filter: ([name]) => name.endsWith("?") }
  ];

  return (
    `<ol reversed>
      <div class="row">
        ${Object.keys(headers).filter((_, i) => spans[i]).map((key, i) => (
          `<div class="col-md-${spans[i]} bold">${headers[key].text}</div>`
        ).trim()).join("\n")}
      </div>
      <div>
        ${tables.map(({ title, filter }) => (
            `${title 
              ? `<div class="mt-4 mb-2 bold">${title}</div>`
              : `<span></span>`
            }
            <div>
              ${data.reverse().filter(filter).map((entry) => (
                `<li>
                  <div class="row">
                    ${entry.filter((_, i) => spans[i]).map((item, i) => (
                      `<div class="
                        ${`col-md-${spans[i]}
                        ${i !== headers.COMMON_NAME.idx? "small" : ""}
                        ${i === headers.SCIENTIFIC_NAME.idx? "italic" : ""}
                      `.trim()}">
                        ${item.replace("?", "")}
                      </div>`
                    )).join("\n")}
                  </div>
                </li>`
              ).trim()).join("\n")}
            </div>`
          )).join("\n")}
      </div>
      <div class="my-4">
        ${countries.map((ct) => {
          const count = data.filter(([,,, loc]) => loc.endsWith(ct)).length;
          return `<div><strong>Count of ${ct} species:</strong> ${count}</div>`;
        }).join("\n")}
      </div>
    </ol>`
  );
};

render([
  // Headers
  ["Common Name", "Scientific Name", "Date", "Location", "Note"],
  // Entries
  ["Eurasian Tree Sparrow", "Passer montanus", "2023/07-09", "Taytay, Rizal, PH"],
  ["Yellow-vented Bulbul", "Pycnonotus goiavier", "2023/07-09", "Taytay, Rizal, PH"],
  ["Rock Pigeon", "Columba livia", "2023/07-09", "Taytay, Rizal, PH"],
  ["Zebra Dove", "Geopelia striata", "2023/07-09", "Taytay, Rizal, PH"],
  ["Philippine Pied Fantail", "Rhipidura nigritorquis", "2023/07-09", "Taytay, Rizal, PH"],
  ["Garden Sunbird", "Cinnyris jugularis", "2023/07-09", "Taytay, Rizal, PH"],
  ["Black-naped Oriole", "Oriolus chinensis", "2023/07-09", "Taytay, Rizal, PH"],
  ["White-breasted Waterhen", "Amaurornis phoenicurus", "2023/07-09", "Taytay, Rizal, PH"],
  ["Java Sparrow", "Padda oryzivora", "2023/07-09", "Taytay, Rizal, PH"],
  ["Large-billed Crow", "Corvus macrorhynchos", "2023/07-09", "Taytay, Rizal, PH"],
  ["Crested Myna", "Acridotheres cristatellus", "2023/07-09", "Taytay, Rizal, PH"],
  ["Golden-bellied Gerygone", "Gerygone sulphurea", "2023/07-09", "Taytay, Rizal, PH"],
  ["American Crow", "Corvus brachyrhynchos", "2023/09/22", "Daly City, CA, US"],
  ["Common Raven", "Corvus corax", "2023/09/22", "Daly City, CA, US"],
  ["Steller's Jay", "Cyanocitta stelleri", "2023/09/23", "San Francisco, CA, US"],
  ["Red-winged Blackbird", "Agelaius phoeniceus", "2023/09/23", "San Francisco, CA, US"],
  ["Mallard", "Anas platyrhynchos", "2023/09/23", "San Francisco, CA, US"],
  ["Brown Pelican", "Pelecanus occidentalis", "2023/09/23", "San Francisco, CA, US"],
  ["California Scrub-Jay", "Aphelocoma californica", "2023/09/24", "Daly City, CA, US"],
  ["Acorn Woodpecker", "Melanerpes formicivorus", "2023/09/24", "Oakhurst, CA, US"],
  ["Anna's Hummingbird", "Calypte anna", "2023/09/24", "Oakhurt, CA, US"],
  ["California Quail", "Callipepla californica", "2023/09/24", "Oakhurst, CA, US"],
  ["Brewer's Blackbird", "Euphagus cyanocephalus", "2023/09/25", "Yosemite, CA, US"],
  ["House Sparrow", "Passer domesticus", "2023/09-10", "New York, NY, US"],
  ["Double-crested Cormorant", "Nannopterum auritum", "2023/09-10", "New York, NY, US"],
  ["Ring-billed Gull", "Larus delawarensis", "2023/09-10", "New York, NY, US"],
  ["Canada Goose", "Branta canadensis", "2023/09-10", "New York, NY, US"],
  ["Mute Swan", "Cygnus olor", "2023/09-10", "New York, NY, US"],
  ["European Starling", "Sturnus vulgaris", "2023/09-10", "New York, NY, US"],
  ["American Robin", "Turdus migratorius", "2023/09-10", "New York, NY, US"],
  ["Yellow-bellied Sapsucker", "Sphyrapicus varius", "2023/09-10", "New York, NY, US"],
  ["Gray Catbird", "Dumetella carolinensis", "2023/09-10", "New York, NY, US"],
  ["Ovenbird", "Seiurus aurocapilla", "2023/09-10", "New York, NY, US"],
  ["White-throated Sparrow", "Zonotrichia albicollis", "2023/09-10", "New York, NY, US"],
  ["Common Yellowthroat", "Geothlypis trichas", "2023/09-10", "New York, NY, US"],
  ["Blue Jay", "Cyanocitta cristata", "2023/09-10", "New York, NY, US"],
  ["Red-bellied Woodpecker", "Melanerpes carolinus", "2023/09-10", "New York, NY, US"],
  ["Downy Woodpecker", "Dryobates pubescens", "2023/09-10", "New York, NY, US"],
  ["Mourning Dove", "Zenaida macroura", "2023/09-10", "New York, NY, US"],
  ["Northern Cardinal", "Cardinalis cardinalis", "2023/09-10", "New York, NY, US"],
  ["Ruby-crowned Kinglet", "Corthylio calendula", "2023/09-10", "New York, NY, US"],
  ["Golden-crowned Kinglet", "Regulus satrapa", "2023/09-10", "New York, NY, US"],
  ["Winter Wren", "Troglodytes hiemalis", "2023/09-10", "New York, NY, US"],
  ["Eastern Towhee", "Pipilo erythrophthalmus", "2023/09-10", "New York, NY, US"],
  ["Hermit Thrush", "Catharus guttatus", "2023/09-10", "New York, NY, US"],
  ["American Coot", "Fulica americana", "2023/09-10", "New York, NY, US"],
  ["Great Blue Heron", "Ardea herodias", "2023/09-10", "New York, NY, US"],
  ["Common Grackle", "Quiscalus quiscula", "2023/09-10", "New York, NY, US"],
  ["Cooper's Hawk?", "Accipiter cooperii", "2023/09-10", "New York, NY, US", "Fairly large; light and streaked underparts; barred tail; possible red-tailed hawk"],
  ["American Kestrel", "Falco sparverius", "2023/10/19", "New York, NY, US", "Distinctive little raptor; hovers and plunges after prey; personal highlight"],
  ["Red-tailed Hawk", "Buteo jamaicensis", "2023/10/21", "Daly City, CA, US"],
  ["Golden-crowned Sparrow", "Zonotrichia atricapilla", "2023/10/21", "Daly City, CA, US"],
  ["Brown Shrike", "Lanius cristatus", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["White-breasted Woodswallow", "Artamus leucorynchus", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Spotted Dove", "Spilopelia chinensis", "2023/10/23-29", "Taytay, Rizal, PH", "Beautiful!"],
  ["White-browed Crake", "Poliolimnas cinereus", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Eurasian Moorhen", "Gallinula chloropus", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Coppersmith Barbet", "Psilopogon haemacephalus", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Eastern Cattle Egret", "Bubulcus coromandus", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Gray Heron", "Ardea cinerea", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Purple Heron", "Ardea purpurea", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Whiskered Tern", "Chlidonias hybrida", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Red-keeled Flowerpecker", "Dicaeum australe", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Scaly-breasted Munia", "Lonchura punctulata", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Gray-rumped Swiftlet", "Collocalia marginata", "2023/10/23-29", "Taytay, Rizal, PH"],
  ["Philippine Pygmy Woodpecker", "Yungipicus maculatus", "2023/10/30", "Taytay, Rizal, PH"],
  ["Little Egret", "Egretta garzetta", "2023/10/30", "Taytay, Rizal, PH"],
  ["Black-winged Stilt", "Himantopus himantopus", "2023/10/31", "Taytay, Rizal, PH"],
  ["Cinnamon Bittern?", "Ixobrychus cinnamomeus", "2023/10/31", "Taguig, PH"],
  ["Long-tailed Shrike", "Lanius schach", "2023/11/04", "Quezon City, PH"],
  ["Pied Triller", "Lalage nigra", "2023/11/04", "Quezon City, PH"],
  ["Pygmy Flowerpecker?", "Dicaeum pygmaeum", "2023/11/04", "Quezon City, PH"],
  ["Common Sandpiper?", "Actitis hypoleucos", "2023/11/05", "Taytay, Rizal, PH"],
  ["Javan Pond-heron", "Ardeola speciosa", "2023/11/06", "Taytay, Rizal, PH", "Saw red-brownish head poking out of grass; somewhat streaked; black-tipped bill; in flight, distinctly white wings"],
  ["Blue-tailed Bea-eater", "Merops philippinus", "2023/11/06", "Taytay, Rizal, PH", "Spotted on telephone wire outside my window; overall greenish color; superficially looks like kingfisher from afar, but sleeker and more pointed bill"],
  ["Barn Swallow", "Hirundo rustica", "2023/11/07", "Taytay, Rizal, PH", "Seen gliding overhead; clear deeply forked tail"],
  ["Pacific Swallow", "Hirundo tahitica", "2023/11/09", "Taytay, Rizal, PH", "Clearly forked tail, but not as deep as barn swallow's; see also, House Swallow (javanica)"],
  ["Great Egret", "Ardea alba", "2023/11/10", "Taytay, Rizal, PH", "Lone egret slowly wading across lake to stalk prey; very long neck"],
  ["Common Kingfisher", "Alcedo atthis", "2023/11/11", "Taytay, Rizal, PH"],
  ["Intermediate Egret", "Ardea intermedia", "2023/11/14", "Taytay, Rizal, PH", "Rounder head; black-tipped bill; not as lanky as great egret"],
  ["Arctic Warbler?", "Phylloscopus borealis", "2023/11/14", "Taytay, Rizal, PH"],
  ["Striated Grassbird", "Megalurus palustris", "2023/11/16", "Taytay, Rizal, PH", "Found singing on a tree branch; big with long tail; strongly streaked back"],
  ["Yellow Bittern", "Ixobrychus sinensis", "2023/11/16", "Taytay, Rizal, PH"],
]);
```
