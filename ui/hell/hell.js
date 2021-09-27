"ui";

let eggController = require("../eggController");
let dfdObj = require("../../utils/setConfig");

ui.layout(
  <vertical bg="#A52A2A">
    {/* 标题 */}
    <card h="auto" margin="10" id="cdTitle" text="标题区" w="*">
      <horizontal>
        <appbar margin="10" id="lblTitle" text="欢迎来到地狱区" w="auto" />
      </horizontal>
    </card>
    {/* 权限 */}
    <card h="auto" margin="10" id="cdSwitch" text="开关区" w="*">
      <horizontal>
        <Switch
          textSize="25sp"
          id="autoService"
          text="无障碍服务:"
          checked="{{auto.service != null}}"
          w="auto"
          textStyle="bold"
          textColor="red"
        />
        <Switch
          textSize="25sp"
          id="autoFloat"
          text="悬浮窗权限:"
          w="auto"
          textStyle="bold"
          textColor="red"
        />
      </horizontal>
    </card>
    {/* 输入框 */}
    <card h="auto" margin="10" id="cdInput" text="输入区" w="*">
      <vertical>
        <input />
      </vertical>
    </card>
    {/* 按钮区 */}
    <card margin="10" w="*" h="auto" id="cdButton" text="按钮区">
      <vertical>
        <horizontal>
          <button
            id="btnStart"
            text="开始"
            w="auto"
            style="Widget.AppCompat.Button.Colored"
          />
          <button
            id="btnExit"
            text="退出"
            w="auto"
            style="Widget.AppCompat.Button.Colored"
          />
        </horizontal>
        {/* <horizontal>
          <button />
          <button />
          <button />
        </horizontal> */}
      </vertical>
    </card>
  </vertical>
);

// 初始化
(function () {
  if (
    dfdObj.getDfdObjParam("eggB") != null &&
    dfdObj.getDfdObjParam("eggB") > 900
  ) {
    // 显示区域
  }
})();

// 权限
ui.autoService.on("check", (checked) => {
  if (checked && auto.service == null) {
    app.startActivity({
      action: "android.setting.ACCESSIBILITY_SETTINGS",
    });
    if (!checked && auto.service != null) {
      auto.service.disableSelf();
    }
  }
});
ui.emitter.on("resume", () => {
  ui.autoService.checked = auto.service != null;
});
ui.autoFloat.on("check", (checked) => {
  if (checked) console.show();
});

// 输入区

// 功能区
ui.btnExit.click(() => {
  eggController.pageInfo.reduction("main"); // 返回
});
