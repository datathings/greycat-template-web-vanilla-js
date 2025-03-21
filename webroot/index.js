import * as web from './web/greycat.js';

await gc.sdk.init();

const filters_el = /** @type {gc.GuiInputObject<gc.Filters>}*/ (
  document.getElementById('filters')
);
const results_el = /** @type {gc.GuiTable}*/ (
  document.getElementById('results')
);
const details_el = /** @type {web.sl.SlDrawer} */ (
  document.getElementById('details')
);
const detail_el = /** @type {gc.GuiObject}*/ (
  document.getElementById('detail')
);
const filters = new gc.Filters(
  0,
  1000,
  '',
  '' /*, new gc.Date(0,0,0,0,0,0,0)*/,
  gc.time.now(),
  gc.TimeZone['Africa/Bamako']
);
filters_el.value = filters;
filters_el.inline = true;
filters_el.noTypes = true;
let filters_update = async function (/** @type{any} */ ev) {
  const main_el = /** @type {gc.GuiSelect<String>}*/ (filters_el.fields.main);
  const sub_el = /** @type {gc.GuiSelect<String>}*/ (filters_el.fields.sub);
  main_el.options = (await gc.get_all_names())
    .map((value) => ({ value }))
    .sort((a, b) => a.value.localeCompare(b.value));
  sub_el.options = (await gc.get_sub_names_by_name(filters.main)).map(
    (value) => ({ value })
  );
  if (filters.main !== undefined && filters.sub !== undefined) {
    results_el.value = await gc.fake_table(filters);
  }
};
filters_el.addEventListener('gui-change', filters_update);
await filters_update();
results_el.addEventListener('gui-table-click', function (ev) {
  const arr = /** @type {gc.TableLine[]} */ (results_el.value);
  detail_el.value = arr[ev.detail.rowIdx];
  details_el.show();
});
