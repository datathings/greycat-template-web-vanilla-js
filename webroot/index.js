await gc.sdk.init();
var filters_el = /** @type {!gc.GuiInputObject}*/ (document.getElementById("filters"));
var results_el = /** @type {!gc.GuiTable}*/ (document.getElementById("results"));
var details_el = /** @type {!any}*/ (document.getElementById("details"));
var detail_el = /** @type {!gc.GuiObject}*/ (document.getElementById("detail"));
const filters = new gc.Filters(0,1000, "", "");
filters_el.value = filters;
let filters_update = async function(/** @type{any} */ev){
    if(ev?.target === filters_update){return;}
    var main_el = /** @type {!gc.GuiSearchableSelect}*/ (filters_el.querySelector('*[slot="main"]'));
    var sub_el = /** @type {!gc.GuiSearchableSelect}*/ (filters_el.querySelector('*[slot="sub"]'));
    main_el.options = (await gc.get_all_names()).map((value) => ({ text: value })).sort((a, b) => a.text.localeCompare(b.text));
    sub_el.options = (await gc.get_sub_names_by_name(filters.main)).map((value) => ({ text: value })); 
    if(filters.main !== undefined && filters.sub !== undefined){
        results_el.value = await gc.fake_table(filters);
    }
};
await filters_update();
filters_el.addEventListener('gui-change', filters_update);
results_el.addEventListener('gui-click', async function(/** @type{any} */ev){
    console.log(results_el.value);
    detail_el.value = ((/** @type {!gc.Array} */results_el.value).at(ev.detail.rowIdx));
    details_el.show();
});
export {};