
var baseConsole = (function () {
  let q = {};

  q.init = function () {
    console.show();
    let baseCons = getConsoleWindow();
    let parent = baseCons.parent;
    var inputView = parent.findViewById(
      context
        .getResources()
        .getIdentifier("input", "id", context.getPackageName())
    );
    var buttonView = parent.findViewById(
      context
        .getResources()
        .getIdentifier("submit", "id", context.getPackageName())
    );
    var titleView = parent.findViewById(
      context
        .getResources()
        .getIdentifier("title", "id", context.getPackageName())
    );
    var consoleView = parent.findViewById(
      context
        .getResources()
        .getIdentifier("console", "id", context.getPackageName())
    );

    /**
     * 显示自定义控制台
     */
    q.show = function(){
        this.init();
    }
  };
  return q;
})();

module.exports = baseConsole;
