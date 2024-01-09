---
title: "Birding Life List"
subtitle: "Since July 2023"
_date: "2023-11-04"
pinned: true
draft: false
reverse_sections: false
evaluate_js: true
---

```js
function render(data, spans = [4, 3, 3, 2], breakpoint = "sm") {
  const headers = data[0];
  data.shift()

  const lists = [
    // Main Table
    { title: "", filter: ([name]) => !name.endsWith("?"), start: "default" },
    // Provisional IDs
    { title: "Not Sure", filter: ([name]) => name.endsWith("?"), start: -1 },
  ];

  const summaries = [
    { // Counts by country
      title: (ctr) => `Count of ${ctr} species`,
      filter: (i, ctr) => (
        i[headers.indexOf("Location")].endsWith(ctr)
        && !i[headers.indexOf("Common Name")].endsWith("?")
      ),
      items: [...new Set(data.map((i) => (
        i[headers.indexOf("Location")].split(",").reverse()[0].trim()
      )))].filter((ctr) => ctr),
    },
    { // Counts by year
      title: (yr) => `${yr} count`,
      filter: (i, yr) => (
        i[headers.indexOf("Date")].startsWith(yr)
        && !i[headers.indexOf("Common Name")].endsWith("?")
      ),
      items: [...new Set(data.map((i) => (
        i[headers.indexOf("Date")].split("/")[0].trim()
      )))].filter((yr) => yr),
    },
  ];

  return (
    `<ol class="mb-2">
      <div class="row">
        ${headers.filter((_, i) => spans[i]).map((hdr, i) => (
          `<div class="col-${breakpoint}-${spans[i]} bold">${hdr}</div>`
        ).trim()).join("\n")}
      </div>
    </ol>
    <div>
      ${lists
        .filter(({ filter }) => data.filter(filter).length)
        .map(({ title, filter, start }) => (
          `${title 
            ? `<div class="mt-4 mb-2 bold">${title}</div>`
            : `<span></span>`}
          <ol reversed start="${start}">
            <div>
              ${[...data].reverse().filter(filter).map((items) => (
                `<li>
                  <div class="row">
                    ${items.filter((_, i) => spans[i]).map((_item, i) => {
                      const ref = items[headers.indexOf("Ref")];
                      const item = _item.replace("?", "");
                      return (
                        `<div class="row-item
                          ${`col-${breakpoint}-${spans[i]} 
                          ${i !== headers.indexOf("Common Name") ? "small" : ""}
                          ${i === headers.indexOf("Scientific Name") ? "italic" : ""}
                        `.trim()}">
                          ${i === headers.indexOf("Date") && ref 
                            ? `<a href="${ref}">${item}</a>`
                            : item}
                        </div>`
                      );
                    }).join("\n")}
                  </div>
                </li>`
              ).trim()).join("\n")}
            </div>
          </ol>`
        )).join("\n")}
    </div>
    <div>
      ${summaries.map(({ title, filter, items }) => (
        `<div class="my-4">
          ${items.map((i) => {
            const entries = data.filter((e) => filter(e, i));
            return (
              `<div>
                <strong>${title(i)}:</strong> ${entries.length}
              </div>`
            )
          }).join("\n")}
        </div>`
      )).join("\n")}
    </div>`
  );
};

const data = [
  ["Common Name", "Scientific Name", "Location", "Date", "Ref"],
  ["Eurasian Tree Sparrow", "Passer montanus", "Taytay, Rizal, PH", "2023/07-09", "/birding-ph-2023/1"],
  ["Yellow-vented Bulbul", "Pycnonotus goiavier", "Taytay, Rizal, PH", "2023/07-09", "/birding-ph-2023/1"],
  ["Rock Dove", "Columba livia", "Taytay, Rizal, PH", "2023/07-09", "/birding-ph-2023/1"],
  ["Zebra Dove", "Geopelia striata", "Taytay, Rizal, PH", "2023/07-09", "/birding-ph-2023/1"],
  ["Philippine Pied Fantail", "Rhipidura nigritorquis", "Taytay, Rizal, PH", "2023/07-09", "/birding-ph-2023/1"],
  ["Garden Sunbird", "Cinnyris jugularis", "Taytay, Rizal, PH", "2023/07-09", "/birding-ph-2023/1"],
  ["Black-naped Oriole", "Oriolus chinensis", "Taytay, Rizal, PH", "2023/07-09", "/birding-ph-2023/1"],
  ["White-breasted Waterhen", "Amaurornis phoenicurus", "Taytay, Rizal, PH", "2023/07-09", "/birding-ph-2023/1"],
  ["Java Sparrow", "Padda oryzivora", "Taytay, Rizal, PH", "2023/07-09", "/birding-ph-2023/1"],
  ["Large-billed Crow", "Corvus macrorhynchos", "Taytay, Rizal, PH", "2023/07-09", "/birding-ph-2023/1"],
  ["Crested Myna", "Acridotheres cristatellus", "Taytay, Rizal, PH", "2023/07-09", "/birding-ph-2023/1"],
  ["Golden-bellied Gerygone", "Gerygone sulphurea", "Taytay, Rizal, PH", "2023/07-09", "/birding-ph-2023/1"],
  ["Herring Gull", "Larus argentatus", "Daly City, CA, US", "2023/09/22"],
  ["American Crow", "Corvus brachyrhynchos", "Daly City, CA, US", "2023/09/22"],
  ["Common Raven", "Corvus corax", "Daly City, CA, US", "2023/09/22"],
  ["Red-winged Blackbird", "Agelaius phoeniceus", "San Francisco, CA, US", "2023/09/23"],
  ["Mallard", "Anas platyrhynchos", "San Francisco, CA, US", "2023/09/23"],
  ["Canada Goose", "Branta canadensis", "San Francisco, CA, US", "2023/09/23"],
  ["Steller's Jay", "Cyanocitta stelleri", "San Francisco, CA, US", "2023/09/23"],
  ["Brown Pelican", "Pelecanus occidentalis", "San Francisco, CA, US", "2023/09/23"],
  ["California Scrub-Jay", "Aphelocoma californica", "Daly City, CA, US", "2023/09/24"],
  ["Acorn Woodpecker", "Melanerpes formicivorus", "Oakhurst, CA, US", "2023/09/24"],
  ["Anna's Hummingbird", "Calypte anna", "Oakhurt, CA, US", "2023/09/24"],
  ["California Quail", "Callipepla californica", "Oakhurst, CA, US", "2023/09/24"],
  ["Brewer's Blackbird", "Euphagus cyanocephalus", "Yosemite, CA, US", "2023/09/25"],
  ["House Sparrow", "Passer domesticus", "New York, NY, US", "2023/10/04"],
  ["Double-crested Cormorant", "Nannopterum auritum", "New York, NY, US", "2023/10/04"],
  ["Mute Swan", "Cygnus olor", "New York, NY, US", "2023/10/04"],
  ["European Starling", "Sturnus vulgaris", "New York, NY, US", "2023/10/05"],
  ["Gray Catbird", "Dumetella carolinensis", "New York, NY, US", "2023/10/05"],
  ["Ovenbird", "Seiurus aurocapilla", "New York, NY, US", "2023/10/05"],
  ["White-throated Sparrow", "Zonotrichia albicollis", "New York, NY, US", "2023/10/05"],
  ["Yellow-bellied Sapsucker", "Sphyrapicus varius", "New York, NY, US", "2023/10/05"],
  ["Blue Jay", "Cyanocitta cristata", "New York, NY, US", "2023/10/08"],
  ["Cooper's/Sharp-shinned Hawk?", "Accipiter cooperii/striatus", "New York, NY, US", "2023/10/08"],
  ["American Robin", "Turdus migratorius", "New York, NY, US", "2023/10/08"],
  ["Ring-billed Gull", "Larus delawarensis", "New York, NY, US", "2023/10/08"],
  ["Northern Cardinal", "Cardinalis cardinalis", "New York, NY, US", "2023/10/10"],
  ["Common Grackle", "Quiscalus quiscula", "New York, NY, US", "2023/10/10"],
  ["Great Blue Heron", "Ardea herodias", "New York, NY, US", "2023/10/12"],
  ["American Coot", "Fulica americana", "New York, NY, US", "2023/10/12"],
  ["Red-bellied Woodpecker", "Melanerpes carolinus", "New York, NY, US", "2023/10/13"],
  ["Eastern Towhee", "Pipilo erythrophthalmus", "New York, NY, US", "2023/10/13"],
  ["Common Yellowthroat", "Geothlypis trichas", "New York, NY, US", "2023/10/15"],
  ["Ruby-crowned Kinglet", "Corthylio calendula", "New York, NY, US", "2023/10/15"],
  ["Golden-crowned Kinglet", "Regulus satrapa", "New York, NY, US", "2023/10/15"],
  ["Downy Woodpecker", "Dryobates pubescens", "New York, NY, US", "2023/10/18"],
  ["Mourning Dove", "Zenaida macroura", "New York, NY, US", "2023/10/18"],
  ["Hermit Thrush", "Catharus guttatus", "New York, NY, US", "2023/10/18"],
  ["Winter Wren", "Troglodytes hiemalis", "New York, NY, US", "2023/10/18"],
  ["American Kestrel", "Falco sparverius", "New York, NY, US", "2023/10/19"],
  ["White-crowned Sparrow", "Zonotrichia leucophrys", "Daly City, CA, US", "2023/10/21"],
  ["Western Gull", "Larus occindentalis", "Daly City, CA, US", "2023/09/22"],
  ["Red-tailed Hawk", "Buteo jamaicensis", "Daly City, CA, US", "2023/10/21"],
  ["Brown Shrike", "Lanius cristatus", "Taytay, Rizal, PH", "2023/10/24", "/birding-ph-2023/1"],
  ["Whiskered Tern", "Chlidonias hybrida", "Taytay, Rizal, PH", "2023/10/24", "/birding-ph-2023/1"],
  ["Coppersmith Barbet", "Psilopogon haemacephalus", "Taytay, Rizal, PH", "2023/10/24", "/birding-ph-2023/1"],
  ["White-breasted Woodswallow", "Artamus leucorynchus", "Taytay, Rizal, PH", "2023/10/24", "/birding-ph-2023/1"],
  ["Red-keeled Flowerpecker", "Dicaeum australe", "Taytay, Rizal, PH", "2023/10/25", "/birding-ph-2023/1"],
  ["Spotted Dove", "Spilopelia chinensis", "Taytay, Rizal, PH", "2023/10/25", "/birding-ph-2023/1"],
  ["Purple Heron", "Ardea purpurea", "Taytay, Rizal, PH", "2023/10/26", "/birding-ph-2023/1"],
  ["Eastern Cattle Egret", "Bubulcus coromandus", "Taytay, Rizal, PH", "2023/10/26", "/birding-ph-2023/1"],
  ["White-browed Crake", "Poliolimnas cinereus", "Taytay, Rizal, PH", "2023/10/26", "/birding-ph-2023/1"],
  ["Eurasian Moorhen", "Gallinula chloropus", "Taytay, Rizal, PH", "2023/10/26", "/birding-ph-2023/1"],
  ["Gray Heron", "Ardea cinerea", "Taytay, Rizal, PH", "2023/10/27", "/birding-ph-2023/1"],
  ["Scaly-breasted Munia", "Lonchura punctulata", "Taytay, Rizal, PH", "2023/10/29", "/birding-ph-2023/1"],
  ["Gray-rumped Swiftlet", "Collocalia marginata", "Taytay, Rizal, PH", "2023/10/29", "/birding-ph-2023/1"],
  ["Philippine Pygmy Woodpecker", "Yungipicus maculatus", "Taytay, Rizal, PH", "2023/10/30", "/birding-ph-2023/2"],
  ["Little Egret", "Egretta garzetta", "Taytay, Rizal, PH", "2023/10/30", "/birding-ph-2023/2"],
  ["Black-winged Stilt", "Himantopus himantopus", "Taytay, Rizal, PH", "2023/10/31", "/birding-ph-2023/2"],
  ["Long-tailed Shrike", "Lanius schach", "Quezon City, PH", "2023/11/04", "/birding-ph-2023/2"],
  ["Pied Triller", "Lalage nigra", "Quezon City, PH", "2023/11/04", "/birding-ph-2023/2"],
  ["Pygmy Flowerpecker", "Dicaeum pygmaeum", "Quezon City, PH", "2023/11/04", "/birding-ph-2023/2"],
  ["Javan Pond-heron", "Ardeola speciosa", "Taytay, Rizal, PH", "2023/11/06", "/birding-ph-2023/3"],
  ["Blue-tailed Bee-eater", "Merops philippinus", "Taytay, Rizal, PH", "2023/11/06", "/birding-ph-2023/3"],
  ["Barn Swallow", "Hirundo rustica", "Taytay, Rizal, PH", "2023/11/07", "/birding-ph-2023/3"],
  ["Pacific Swallow", "Hirundo tahitica", "Taytay, Rizal, PH", "2023/11/09", "/birding-ph-2023/3"],
  ["Great Egret", "Ardea alba", "Taytay, Rizal, PH", "2023/11/10", "/birding-ph-2023/3"],
  ["Common Kingfisher", "Alcedo atthis", "Taytay, Rizal, PH", "2023/11/11", "/birding-ph-2023/3"],
  ["Intermediate Egret", "Ardea intermedia", "Taytay, Rizal, PH", "2023/11/14", "/birding-ph-2023/4"],
  ["Striated Grassbird", "Megalurus palustris", "Taytay, Rizal, PH", "2023/11/16", "/birding-ph-2023/5"],
  ["Chestnut Munia", "Lonchura atricapilla", "Taytay, Rizal, PH", "2023/11/17", "/birding-ph-2023/5"],
  ["Collared Kingfisher", "Todiramphus chloris", "Taytay, Rizal, PH", "2023/11/18", "/birding-ph-2023/5"],
  ["Cinnamon Bittern", "Ixobrychus cinnamomeu", "Taytay, Rizal, PH", "2023/11/18", "/birding-ph-2023/5"],
  ["Yellow Bittern", "Ixobrychus sinensis", "Taytay, Rizal, PH", "2023/11/19", "/birding-ph-2023/5"],
  ["Black-crowned Night-heron", "Nycticorax nycticorax", "Taytay, Rizal, PH", "2023/11/21", "/birding-ph-2023/6"],
  ["Barred Rail", "Hypotaenidia torquata", "Taytay, Rizal, PH", "2023/11/21", "/birding-ph-2023/6"],
  ["Wood Sandpiper", "Tringa glareola", "Taytay, Rizal, PH", "2023/11/24", "/birding-ph-2023/6"],
  ["Common Sandpiper", "Actitis hypoleucos", "Taytay, Rizal, PH", "2023/11/26", "/birding-ph-2023/6"],
  ["Elegant Tit", "Pardaliparus elegans", "Antipolo, Rizal, PH", "2023/12/14", "/birding-ph-2023/7"],
  ["Lowland White-eye", "Zosterops meyeni", "Antipolo, Rizal, PH", "2023/12/14", "/birding-ph-2023/7"],
  ["Philippine Cuckoo-dove", "Macropygia tenuirostris", "Antipolo, Rizal, PH", "2023/12/14", "/birding-ph-2023/7"],
  ["Philippine Bulbul", "Hypsipetes philippinus", "Antipolo, Rizal, PH", "2023/12/14", "/birding-ph-2023/7"],
  ["Striated Heron", "Butorides striata", "Las Piñas/Parañaque, PH", "2023/12/17", "/birding-ph-2023/8"],
  ["Pacific Golden Plover", "Pluvialis fulva", "Las Piñas/Parañaque, PH", "2023/12/17", "/birding-ph-2023/8"],
  ["Common Redshank", "Tringa totanus", "Las Piñas/Parañaque, PH", "2023/12/17", "/birding-ph-2023/8"],
  ["Common Greenshank", "Tringa nebularia", "Las Piñas/Parañaque, PH", "2023/12/17", "/birding-ph-2023/8"],
  ["Kentish Plover", "Anarhynchus alexandrinus", "Las Piñas/Parañaque, PH", "2023/12/17", "/birding-ph-2023/8"],
  ["Rufous Night-heron", "Nycticorax caledonicus", "Las Piñas/Parañaque, PH", "2023/12/17", "/birding-ph-2023/8"],
  ["Buff-banded Rail", "Hypotaenidia philippensis", "Taytay, Rizal, PH", "2023/12/21", "/birding-ph-2023/8"],
  ["Brown-breasted Kingfisher", "Halcyon gularis", "Taytay, Rizal, PH", "2023/12/23", "/birding-ph-2023/9"],
  ["Asian Glossy Starling", "Aplonis panayensis", "Taytay, Rizal, PH", "2023/12/23", "/birding-ph-2023/9"],
  ["Tawny Grassbird", "Cincloramphus timoriensis", "Taytay, Rizal, PH", "2024/01/01"],
  ["Arctic Warbler", "Phylloscopus borealis", "Taytay, Rizal, PH", "2024/01/04"],
  ["Common Snipe", "Gallinago gallinago", "Taytay, Rizal, PH", "2024/01/06"],
  ["Greater Painted-Snipe", "Rostratula benghalensis", "Taytay, Rizal, PH", "2024/01/06"],
  ["Philippine/Lesser Coucal?", "Centropus viridis/bengalensis", "Taytay, Rizal, PH", "2024/01/06"],
  ["Watercock", "Gallicrex cinerea", "Taytay, Rizal, PH", "2024/01/06"],
  ["White-bellied Munia", "Lonchura leucogastra", "Taytay, Rizal, PH", "2024/01/06"],
  ["Balicassiao", "Dicrurus balicassius", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["Blue-naped Parrot", "Tanygnathus lucionensis", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["White-bellied Woodpecker", "Dryocopus javensis", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["Northern Sooty-Woodpecker", "Mulleripicus funebris", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["Luzon Flameback", "Chrysocolaptes haematribon", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["Dollarbird", "Eurystomus orientalis", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["Rufous-crowned Bee-eater", "Merops americanus", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["Brahminy Kite", "Haliastur indus", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["Green Imperial-Pigeon", "Ducula aenea", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["Blue Rock-Thrush", "Monticola solitarius", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["Coleto", "Sarcops calvus", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["Peregrine Falcon", "Falco peregrinus", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["Philippine Falconet", "Microhierax erythrogenys", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["Luzon Hornbill", "Penelopides manillae", "Subic Bay, Bataan, PH", "2024/01/07"],
  ["White-eared Brown-Dove", "Phapitreron leucotis", "Subic Bay, Bataan, PH", "2024/01/07"],
]

render(data);
```
