await gc.sdk.init();
var filters_el = /** @type {any}*/ (document.getElementById("filters"));
var results_el = /** @type {any}*/ (document.getElementById("results"));
var details_el = /** @type {any}*/ (document.getElementById("details"));
const filters = new gc.Filters(0,1000, "default");
filters_el.value = filters;
filters_el.addEventListener('gui-change', async function(){
    results_el.value = await gc.fake_table(filters);
});
results_el.value = await gc.fake_table(filters);
results_el.addEventListener('gui-click', async function(/** @type{any} */ev){
    var line = /** @type{gc.TableLine} */ (results_el.value[ev.detail.rowIdx]);
    var obj_el = document.createElement('gui-object');
    obj_el.value = line;
    obj_el.header = true;
    details_el.replaceChildren(obj_el);
    details_el.show();
});
export {};