import searchForm from "../page_model/searchFormPage";
import metroSelectDialog from "../page_model/metroSelectDialogPage";

fixture`AvitoTest`
  .page`https://m.avito.ru/moskva/kommercheskaya_nedvizhimost?searchForm=true`
  .afterEach( async t => {
    await t.eval(() => document.location.reload(true));
  });

test("Тест табов Алфавит/Линия", async (t) => {
  const isEqual = (stationList1, stationList2) => {
    let arr1 = [...new Set(stationList1)];
    let arr2 = [...new Set(stationList2)];

    if (arr1.length !== arr2.length) return false;
    for (let i = 0; arr2.length > i; i++) {
      if (!arr1.includes(arr2[i])) return false;
    }
    return true;
  };

  const stations = [
    "Домодедовская",
    "Красногвардейская",
    "Технопарк",
    "Строгино",
    "Арбатская",
  ];

  await searchForm.openMetroSelectDialog();

  for (let i = 0; stations.length > i; i++) {
    await metroSelectDialog.selectStationBySearch(stations[i]);
  }

  let selectedAlphabeticalList = await metroSelectDialog.getSelectedList(
    "stationsItem"
  );
  let selectedLineList = await metroSelectDialog.getSelectedList("linesItem");
  if (!isEqual(selectedAlphabeticalList, selectedLineList)) {
    throw new Error(
      'Тест выявил ошибку:некорректное дублирование выбора станций при переключении между табами'
    );
  }
  if (await metroSelectDialog.hasExpandedLines()) {
    throw new Error(
      'Тест выявил ошибку:раскрытие ветви линии метро при выборе станции через таб "Алфавит"'
    );
  }
});

test("Тест кнопки выбора станции", async (t) => {
  const stations = ["Кантемировская", "Театральная", "Охотный ряд"];

  await searchForm.openMetroSelectDialog();

  for (let i = 0; stations.length > i; i++) {
    await metroSelectDialog.selectStationBySearch(stations[i]);
  }
  if (!(await metroSelectDialog.selectButtonIsCorrect())) {
    throw new Error(
      'текст кнопки «выбрать станцию» не соответсвует заданному шаблону'
    );
  }
});

test("Тест выбора станций", async (t) => {
  const stations = ["Красносельская", "Дубровка"];

  await searchForm.openMetroSelectDialog();

  if (!await metroSelectDialog.isDropSelectionDisabled()) {
    throw new Error(
      'кнопка «Сбросить» активна при невыбранных станциях'
    );
  }

  for (let i = 0; stations.length > i; i++) {
    await metroSelectDialog.selectStationBySearch(stations[i]);
  }

  if (await metroSelectDialog.isDropSelectionDisabled()) {
    throw new Error(
      'кнопка «Сбросить» не активна при выбранных станциях'
    );
  }

  if (!await metroSelectDialog.searchCompleteIsCorrect()) {
    throw new Error(
      'при выборе станции метро через поисковую строку поиск не был закрыт'
    );
  }

  if (!await searchForm.metroSelectValueIsCorrect(stations.length)) {
    throw new Error(
      'фильтр по метро на экране «Уточнить» отображается с некорректной формулировкой'
    );
  }
});