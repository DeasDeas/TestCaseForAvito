import { t, Selector, ClientFunction } from "testcafe";

class MetroSelectDialog {
  constructor() {
    // Metro search input
    this.searchInput = Selector("input").withAttribute(
      "placeholder",
      "Название станции"
    );

    // Button to select alphabetic list of stations
    this.buttonStations = Selector("button").withAttribute(
      "data-marker",
      "metro-select-dialog/tabs/button(stations)"
    );

    // Button to select list of stations composed by lines
    this.buttonLines = Selector("button").withAttribute(
      "data-marker",
      "metro-select-dialog/tabs/button(lines)"
    );

    // Label of station checkbox in alphabetical list
    this.stationsItem = Selector("label").withAttribute(
      "data-marker",
      "metro-select-dialog/stations/item"
    );

    this.linesItem = Selector("label").withAttribute(
      "data-marker",
      "metro-select-dialog/lines/station"
    );

    // Button to clear search input
    this.dropSearchButton = Selector("svg")
      .withAttribute("data-marker", "metro-select-dialog")
      .child("div")
      .child("label")
      .child("svg")
      .withAttribute("name", "cross");
  }

  async getSelectedList(listType) {
    let itemObj = {stationsItem : this.stationsItem, linesItem : this.linesItem}

    await t.click(listType === "stationsItem" ? this.buttonStations : this.buttonLines)
    let stationItems = itemObj[listType].withAttribute("aria-checked",
      "true").child();
    let list = [];

    let stationItemsCount = await stationItems.child("span > span").count;
    for (let i = 0; stationItemsCount > i; i++) {
      list.push(
        await stationItems.child("span > span").nth(i).textContent
      );
    }

    return list;
  }

  async selectStationBySearch(stationName) {
    await t.typeText(this.searchInput, stationName);

    if (await this.stationsItem.nth(0).exists) {
      await t.click(this.stationsItem);
    } else {
      await t.click(this.dropSearchButton);
    }
  }

  async selectButtonIsCorrect() {
    let buttonText = await Selector("button").withAttribute(
      "data-marker",
      "metro-select-dialog/apply"
    ).child("span").textContent;

    return /Выбрать \d+ станц((ий)|(ии)|(ию))/.test(buttonText);
  }

  async hasExpandedLines() {
    return await Selector("div").withAttribute(
      "data-marker",
      "metro-select-dialog/lines/expanded"
    ).exists;
  }

  async isDropSelectionDisabled() {
    return await Selector("button")
      .withAttribute("data-marker", "metro-select-dialog/reset")
      .withAttribute("aria-disabled", "true").exists;
  }

  async searchCompleteIsCorrect() {
    const completeSearch = Selector("button").withAttribute(
      "data-marker",
      "metro-select-dialog/apply"
    );
    await t.click(completeSearch())
    return !await Selector("div").withAttribute(
      "data-marker",
      "metro-select-dialog"
    ).exists;
  }
}

export default new MetroSelectDialog();
