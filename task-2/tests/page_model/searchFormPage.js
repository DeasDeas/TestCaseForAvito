import { t, Selector } from "testcafe";

class SearchForm {

  constructor() {
    // Metro select control
    this.metroSelect = Selector("div").withAttribute(
      "data-marker",
      RegExp("metro-select/*")
    );
  }

  async openMetroSelectDialog() {
    await t.click(this.metroSelect);
  }

  async metroSelectValueIsCorrect(stationsQuantity) {
    let textContent = await this.metroSelect.child("span").withAttribute("data-marker", "metro-select/value").textContent;
    if (stationsQuantity === 1) {
      return (/\w+/).test(textContent)
    }
    return (/Выбрано \d+ станц((ий)|(ии)|(ию))/).test(textContent);
  }
}

export default new SearchForm();
