---
excalidraw-plugin: parsed
tags:
  - excalidraw
  - jobfilter
  - data-sources
---

==Switch to EXCALIDRAW VIEW in Obsidian to edit this board visually.==

# Text Elements
JOBFILTER DATA SOURCES ^title

IMPLEMENTED NOW
Contracts Finder
Find a Tender
Planning Data
Public Contracts Scotland
DirectorySignal
Companies House - key gated ^implemented

NOT YET / NEXT
Sell2Wales - prove endpoint
PlanWire - fresh planning feed
UK PlanIt - wider planning
Council APIs - official only
HMO / licensing
Building control
Materials price signals ^next

FETCH -> NORMALISE -> FILTER -> SCORE -> STORE -> DELIVER ^flow

FREE = signal only
PAID = buyer, URL, deadline, exact value, contact signal, WhatsApp action ^gate

%%
# Drawing
```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://github.com/zsviczian/obsidian-excalidraw-plugin",
  "elements": [
    {
      "id": "title",
      "type": "text",
      "x": 60,
      "y": 40,
      "width": 620,
      "height": 45,
      "angle": 0,
      "strokeColor": "#111827",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 0,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 1,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "JOBFILTER DATA SOURCES",
      "fontSize": 36,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "containerId": null,
      "originalText": "JOBFILTER DATA SOURCES",
      "lineHeight": 1.25,
      "baseline": 34
    },
    {
      "id": "implementedBox",
      "type": "rectangle",
      "x": 60,
      "y": 130,
      "width": 440,
      "height": 340,
      "angle": 0,
      "strokeColor": "#166534",
      "backgroundColor": "#dcfce7",
      "fillStyle": "solid",
      "strokeWidth": 3,
      "strokeStyle": "solid",
      "roughness": 0,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": { "type": 3 },
      "seed": 2,
      "version": 1,
      "versionNonce": 2,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "implemented",
      "type": "text",
      "x": 90,
      "y": 160,
      "width": 360,
      "height": 250,
      "angle": 0,
      "strokeColor": "#111827",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 0,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 3,
      "version": 1,
      "versionNonce": 3,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "IMPLEMENTED NOW\n\nContracts Finder\nFind a Tender\nPlanning Data\nPublic Contracts Scotland\nDirectorySignal\nCompanies House - key gated",
      "fontSize": 24,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "containerId": null,
      "originalText": "IMPLEMENTED NOW\n\nContracts Finder\nFind a Tender\nPlanning Data\nPublic Contracts Scotland\nDirectorySignal\nCompanies House - key gated",
      "lineHeight": 1.25,
      "baseline": 238
    },
    {
      "id": "nextBox",
      "type": "rectangle",
      "x": 560,
      "y": 130,
      "width": 500,
      "height": 340,
      "angle": 0,
      "strokeColor": "#92400e",
      "backgroundColor": "#fef3c7",
      "fillStyle": "solid",
      "strokeWidth": 3,
      "strokeStyle": "solid",
      "roughness": 0,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": { "type": 3 },
      "seed": 4,
      "version": 1,
      "versionNonce": 4,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "next",
      "type": "text",
      "x": 590,
      "y": 160,
      "width": 420,
      "height": 250,
      "angle": 0,
      "strokeColor": "#111827",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 0,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 5,
      "version": 1,
      "versionNonce": 5,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "NOT YET / NEXT\n\nSell2Wales - prove endpoint\nPlanWire - fresh planning feed\nUK PlanIt - wider planning\nCouncil APIs - official only\nHMO / licensing\nBuilding control\nMaterials price signals",
      "fontSize": 24,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "containerId": null,
      "originalText": "NOT YET / NEXT\n\nSell2Wales - prove endpoint\nPlanWire - fresh planning feed\nUK PlanIt - wider planning\nCouncil APIs - official only\nHMO / licensing\nBuilding control\nMaterials price signals",
      "lineHeight": 1.25,
      "baseline": 238
    },
    {
      "id": "flow",
      "type": "text",
      "x": 80,
      "y": 540,
      "width": 900,
      "height": 40,
      "angle": 0,
      "strokeColor": "#1e3a8a",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 0,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 6,
      "version": 1,
      "versionNonce": 6,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "FETCH -> NORMALISE -> FILTER -> SCORE -> STORE -> DELIVER",
      "fontSize": 28,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "containerId": null,
      "originalText": "FETCH -> NORMALISE -> FILTER -> SCORE -> STORE -> DELIVER",
      "lineHeight": 1.25,
      "baseline": 34
    },
    {
      "id": "gate",
      "type": "text",
      "x": 80,
      "y": 620,
      "width": 920,
      "height": 80,
      "angle": 0,
      "strokeColor": "#7f1d1d",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 0,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 7,
      "version": 1,
      "versionNonce": 7,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "FREE = signal only\nPAID = buyer, URL, deadline, exact value, contact signal, WhatsApp action",
      "fontSize": 26,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "containerId": null,
      "originalText": "FREE = signal only\nPAID = buyer, URL, deadline, exact value, contact signal, WhatsApp action",
      "lineHeight": 1.25,
      "baseline": 65
    }
  ],
  "appState": {
    "theme": "light",
    "viewBackgroundColor": "#ffffff",
    "zoom": { "value": 0.8 },
    "scrollX": 0,
    "scrollY": 0
  },
  "files": {}
}
```
%%
