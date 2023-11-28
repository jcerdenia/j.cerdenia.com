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
  const spans = [4, 3, 3, 2];
  const headers = data[0];
  data.shift()

  const tables = [
    { title: "", filter: ([name]) => !name.endsWith("?") },
    { title: "Almost sure", filter: ([name]) => name.endsWith("?") },
  ];

  const countries = [...new Set(data.map((i) => (
    i[headers.indexOf("Location")].split(",").reverse()[0].trim()
  )))].filter((ctr) => ctr);

  return (
    `<ol reversed>
      <div class="row">
        ${headers.filter((_, i) => spans[i]).map((hdr, i) => (
          `<div class="col-md-${spans[i]} bold">${hdr}</div>`
        ).trim()).join("\n")}
      </div>
      <div>
        ${tables.map(({ title, filter }) => (
            `${title 
              ? `<div class="mt-4 mb-2 bold">${title}</div>`
              : `<span></span>`}
            <div>
              ${[...data].reverse().filter(filter).map((items) => (
                `<li>
                  <div class="row">
                    ${items.filter((_, i) => spans[i]).map((_item, i) => {
                      const ref = items[headers.indexOf("Ref")];
                      const item = _item.replace("?", "");
                      return (
                        `<div class="row-item
                          ${`col-md-${spans[i]} 
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
            </div>`
          )).join("\n")}
      </div>
      <div class="my-4">
        ${countries.map((ctr) => {
          const locationIdx = headers.indexOf("Location");
          const items = data.filter((i) => i[locationIdx].endsWith(ctr));
          return (
            `<div>
              <strong>Count of ${ctr} species:</strong> ${items.length}
            </div>`
          );
        }).join("\n")}
      </div>
    </ol>`
  );
};

const data = [
  ['Common Name', 'Scientific Name', 'Location', 'Date', 'Ref'],
  ['Eurasian Tree Sparrow', 'Passer montanus', 'Taytay, Rizal, PH', '2023/07-09', '/birding-ph-2023#1023-1029'],
  ['Yellow-vented Bulbul', 'Pycnonotus goiavier', 'Taytay, Rizal, PH', '2023/07-09', '/birding-ph-2023#1023-1029'],
  ['Rock Pigeon', 'Columba livia', 'Taytay, Rizal, PH', '2023/07-09', '/birding-ph-2023#1023-1029'],
  ['Zebra Dove', 'Geopelia striata', 'Taytay, Rizal, PH', '2023/07-09', '/birding-ph-2023#1023-1029'],
  ['Philippine Pied Fantail', 'Rhipidura nigritorquis', 'Taytay, Rizal, PH', '2023/07-09', '/birding-ph-2023#1023-1029'],
  ['Garden Sunbird', 'Cinnyris jugularis', 'Taytay, Rizal, PH', '2023/07-09', '/birding-ph-2023#1023-1029'],
  ['Black-naped Oriole', 'Oriolus chinensis', 'Taytay, Rizal, PH', '2023/07-09', '/birding-ph-2023#1023-1029'],
  ['White-breasted Waterhen', 'Amaurornis phoenicurus', 'Taytay, Rizal, PH', '2023/07-09', '/birding-ph-2023#1023-1029'],
  ['Java Sparrow', 'Padda oryzivora', 'Taytay, Rizal, PH', '2023/07-09', '/birding-ph-2023#1023-1029'],
  ['Large-billed Crow', 'Corvus macrorhynchos', 'Taytay, Rizal, PH', '2023/07-09', '/birding-ph-2023#1023-1029'],
  ['Crested Myna', 'Acridotheres cristatellus', 'Taytay, Rizal, PH', '2023/07-09', '/birding-ph-2023#1023-1029'],
  ['Golden-bellied Gerygone', 'Gerygone sulphurea', 'Taytay, Rizal, PH', '2023/07-09', '/birding-ph-2023#1023-1029'],
  ['American Crow', 'Corvus brachyrhynchos', 'Daly City, CA, US', '2023/09/22'],
  ['Common Raven', 'Corvus corax', 'Daly City, CA, US', '2023/09/22'],
  ["Steller's Jay", 'Cyanocitta stelleri', 'San Francisco, CA, US', '2023/09/23'],
  ['Red-winged Blackbird', 'Agelaius phoeniceus', 'San Francisco, CA, US', '2023/09/23'],
  ['Mallard', 'Anas platyrhynchos', 'San Francisco, CA, US', '2023/09/23'],
  ['Brown Pelican', 'Pelecanus occidentalis', 'San Francisco, CA, US', '2023/09/23'],
  ['California Scrub-Jay', 'Aphelocoma californica', 'Daly City, CA, US', '2023/09/24'],
  ['Acorn Woodpecker', 'Melanerpes formicivorus', 'Oakhurst, CA, US', '2023/09/24'],
  ["Anna's Hummingbird", 'Calypte anna', 'Oakhurt, CA, US', '2023/09/24'],
  ['California Quail', 'Callipepla californica', 'Oakhurst, CA, US', '2023/09/24'],
  ["Brewer's Blackbird", 'Euphagus cyanocephalus', 'Yosemite, CA, US', '2023/09/25'],
  ['House Sparrow', 'Passer domesticus', 'New York, NY, US', '2023/09-10'],
  ['Double-crested Cormorant', 'Nannopterum auritum', 'New York, NY, US', '2023/09-10'],
  ['Ring-billed Gull', 'Larus delawarensis', 'New York, NY, US', '2023/09-10'],
  ['Canada Goose', 'Branta canadensis', 'New York, NY, US', '2023/09-10'],
  ['Mute Swan', 'Cygnus olor', 'New York, NY, US', '2023/09-10'],
  ['European Starling', 'Sturnus vulgaris', 'New York, NY, US', '2023/09-10'],
  ['American Robin', 'Turdus migratorius', 'New York, NY, US', '2023/09-10'],
  ['Yellow-bellied Sapsucker', 'Sphyrapicus varius', 'New York, NY, US', '2023/09-10'],
  ['Gray Catbird', 'Dumetella carolinensis', 'New York, NY, US', '2023/09-10'],
  ['Ovenbird', 'Seiurus aurocapilla', 'New York, NY, US', '2023/09-10'],
  ['White-throated Sparrow', 'Zonotrichia albicollis', 'New York, NY, US', '2023/09-10'],
  ['Common Yellowthroat', 'Geothlypis trichas', 'New York, NY, US', '2023/09-10'],
  ['Blue Jay', 'Cyanocitta cristata', 'New York, NY, US', '2023/09-10'],
  ['Red-bellied Woodpecker', 'Melanerpes carolinus', 'New York, NY, US', '2023/09-10'],
  ['Downy Woodpecker', 'Dryobates pubescens', 'New York, NY, US', '2023/09-10'],
  ['Mourning Dove', 'Zenaida macroura', 'New York, NY, US', '2023/09-10'],
  ['Northern Cardinal', 'Cardinalis cardinalis', 'New York, NY, US', '2023/09-10'],
  ['Ruby-crowned Kinglet', 'Corthylio calendula', 'New York, NY, US', '2023/09-10'],
  ['Golden-crowned Kinglet', 'Regulus satrapa', 'New York, NY, US', '2023/09-10'],
  ['Winter Wren', 'Troglodytes hiemalis', 'New York, NY, US', '2023/09-10'],
  ['Eastern Towhee', 'Pipilo erythrophthalmus', 'New York, NY, US', '2023/09-10'],
  ['Hermit Thrush', 'Catharus guttatus', 'New York, NY, US', '2023/09-10'],
  ['American Coot', 'Fulica americana', 'New York, NY, US', '2023/09-10'],
  ['Great Blue Heron', 'Ardea herodias', 'New York, NY, US', '2023/09-10'],
  ['Common Grackle', 'Quiscalus quiscula', 'New York, NY, US', '2023/09-10'],
  ["Cooper's Hawk?", 'Accipiter cooperii', 'New York, NY, US', '2023/09-10'],
  ['American Kestrel', 'Falco sparverius', 'New York, NY, US', '2023/10/19'],
  ['Red-tailed Hawk', 'Buteo jamaicensis', 'Daly City, CA, US', '2023/10/21'],
  ['White-crowned Sparrow', 'Zonotrichia leucophrys', 'Daly City, CA, US', '2023/10/21'],
  ['Brown Shrike', 'Lanius cristatus', 'Taytay, Rizal, PH', '2023/10/23-29', '/birding-ph-2023#1023-1029'],
  ['White-breasted Woodswallow', 'Artamus leucorynchus', 'Taytay, Rizal, PH', '2023/10/23-29', '/birding-ph-2023#1023-1029'],
  ['Spotted Dove', 'Spilopelia chinensis', 'Taytay, Rizal, PH', '2023/10/23-29', '/birding-ph-2023#1023-1029'],
  ['White-browed Crake', 'Poliolimnas cinereus', 'Taytay, Rizal, PH', '2023/10/23-29', '/birding-ph-2023#1023-1029'],
  ['Eurasian Moorhen', 'Gallinula chloropus', 'Taytay, Rizal, PH', '2023/10/23-29', '/birding-ph-2023#1023-1029'],
  ['Coppersmith Barbet', 'Psilopogon haemacephalus', 'Taytay, Rizal, PH', '2023/10/23-29', '/birding-ph-2023#1023-1029'],
  ['Eastern Cattle Egret', 'Bubulcus coromandus', 'Taytay, Rizal, PH', '2023/10/23-29', '/birding-ph-2023#1023-1029'],
  ['Gray Heron', 'Ardea cinerea', 'Taytay, Rizal, PH', '2023/10/23-29', '/birding-ph-2023#1023-1029'],
  ['Purple Heron', 'Ardea purpurea', 'Taytay, Rizal, PH', '2023/10/23-29', '/birding-ph-2023#1023-1029'],
  ['Whiskered Tern', 'Chlidonias hybrida', 'Taytay, Rizal, PH', '2023/10/23-29', '/birding-ph-2023#1023-1029'],
  ['Red-keeled Flowerpecker', 'Dicaeum australe', 'Taytay, Rizal, PH', '2023/10/23-29', '/birding-ph-2023#1023-1029'],
  ['Scaly-breasted Munia', 'Lonchura punctulata', 'Taytay, Rizal, PH', '2023/10/23-29', '/birding-ph-2023#1023-1029'],
  ['Gray-rumped Swiftlet', 'Collocalia marginata', 'Taytay, Rizal, PH', '2023/10/23-29', '/birding-ph-2023#1023-1029'],
  ['Philippine Pygmy Woodpecker', 'Yungipicus maculatus', 'Taytay, Rizal, PH', '2023/10/30', '/birding-ph-2023#1030-1105'],
  ['Little Egret', 'Egretta garzetta', 'Taytay, Rizal, PH', '2023/10/30', '/birding-ph-2023#1030-1105'],
  ['Black-winged Stilt', 'Himantopus himantopus', 'Taytay, Rizal, PH', '2023/10/31', '/birding-ph-2023#1030-1105'],
  ['Long-tailed Shrike', 'Lanius schach', 'Quezon City, PH', '2023/11/04', '/birding-ph-2023#1030-1105'],
  ['Pied Triller', 'Lalage nigra', 'Quezon City, PH', '2023/11/04', '/birding-ph-2023#1030-1105'],
  ['Pygmy Flowerpecker?', 'Dicaeum pygmaeum', 'Quezon City, PH', '2023/11/04', '/birding-ph-2023#1030-1105'],
  // ['Common Sandpiper?', 'Actitis hypoleucos', 'Taytay, Rizal, PH', '2023/11/05', '/birding-ph-2023#1030-1105'],
  ['Javan Pond-heron', 'Ardeola speciosa', 'Taytay, Rizal, PH', '2023/11/06', '/birding-ph-2023#1106-1112'],
  ['Blue-tailed Bea-eater', 'Merops philippinus', 'Taytay, Rizal, PH', '2023/11/06', '/birding-ph-2023#1106-1112'],
  ['Barn Swallow', 'Hirundo rustica', 'Taytay, Rizal, PH', '2023/11/07', '/birding-ph-2023#1106-1112'],
  ['Pacific Swallow', 'Hirundo tahitica', 'Taytay, Rizal, PH', '2023/11/09', '/birding-ph-2023#1106-1112'],
  ['Great Egret', 'Ardea alba', 'Taytay, Rizal, PH', '2023/11/10', '/birding-ph-2023#1106-1112'],
  ['Common Kingfisher', 'Alcedo atthis', 'Taytay, Rizal, PH', '2023/11/11', '/birding-ph-2023#1106-1112'],
  ['Intermediate Egret', 'Ardea intermedia', 'Taytay, Rizal, PH', '2023/11/14', '/birding-ph-2023#1113-1114'],
  ['Arctic Warbler?', 'Phylloscopus borealis', 'Taytay, Rizal, PH', '2023/11/14', '/birding-ph-2023#1113-1114'],
  ['Striated Grassbird', 'Megalurus palustris', 'Taytay, Rizal, PH', '2023/11/16', '/birding-ph-2023#1115-1119'],
  ['Chestnut Munia', 'Lonchura atricapilla', 'Taytay, Rizal, PH', '2023/11/17', '/birding-ph-2023#1115-1119'],
  ['Collared Kingfisher', 'Todiramphus chloris', 'Taytay, Rizal, PH', '2023/11/18', '/birding-ph-2023#1115-1119'],
  ['Cinnamon Bittern', 'Ixobrychus cinnamomeu', 'Taytay, Rizal, PH', '2023/11/18', '/birding-ph-2023#1115-1119'],
  ['Yellow Bittern', 'Ixobrychus sinensis', 'Taytay, Rizal, PH', '2023/11/19', '/birding-ph-2023#1115-1119'],
  ['Black-crowned Night-heron', 'Nycticorax nycticorax', 'Taytay, Rizal, PH', '2023/11/21'],
  ['Barred Rail', 'Hypotaenidia torquata', 'Taytay, Rizal, PH', '2023/11/21'],
  ['Wood Sandpiper?', 'Tringa glareola', 'Taytay, Rizal, PH', '2023/11/24'],
  ['Common Sandpiper', 'Actitis hypoleucos', "Taytay, Rizal, PH", "2023/11/26"],
];

render(data);
```
