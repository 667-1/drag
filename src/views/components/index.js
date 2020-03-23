let TEMPLATES = {};
const TEMPITEM = require.context('./', false, /.vue/);
TEMPITEM.keys().forEach(item => {
  console.log(item);
  TEMPLATES[item.match(/^.\/(.*).vue$/)[1]] = TEMPITEM(item).default;
});
export default TEMPLATES;
