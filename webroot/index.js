await gc.sdk.init();
var filters_el = /** @type {gc.GuiInputObject<gc.Filters>}*/ (document.getElementById("filters"));
var results_el = /** @type {gc.GuiTable}*/ (document.getElementById("results"));
var details_el = /** @type {any}*/ (document.getElementById("details"));
var detail_el = /** @type {gc.GuiObject}*/ (document.getElementById("detail"));
const filters = new gc.Filters(0,1000, "", "");
filters_el.value = filters;
let filters_update = async function(/** @type{any} */ev){
    var main_el = /** @type {gc.GuiSearchableSelect<String>}*/ (filters_el.fields.main);
    var sub_el = /** @type {gc.GuiSearchableSelect<String>}*/ (filters_el.fields.sub);
    main_el.options = (await gc.get_all_names()).map((value) => ({ value })).sort((a, b) => a.value.localeCompare(b.value));
    sub_el.options = (await gc.get_sub_names_by_name(filters.main)).map((value) => ({ value })); 
    if(filters.main !== undefined && filters.sub !== undefined){
        results_el.value = await gc.fake_table(filters);
    }
};
await filters_update();
filters_el.addEventListener('gui-change', filters_update);
results_el.addEventListener('gui-click', async function(/** @type{any} */ev){
    const arr = /** @type {gc.TableLine[]} */ (results_el.value);
    detail_el.value = arr[ev.detail.rowIdx];
    details_el.show();
});
export {};