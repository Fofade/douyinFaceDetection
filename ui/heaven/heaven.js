"ui";
ui.layout(
<vertical bg="#00ff00">
    <card h="auto" margin="10" id="cdTitle" text="标题区" w="*">
        <horizontal>
            <appbar margin="10" id="lblTitle" text="这里是标题" w="auto"/>
        </horizontal>
    </card>
    <card h="auto" margin="10" id="cdSwitch" text="开关区" w="*">
        <horizontal>
            <Switch text="无障碍："/>
            <Switch text="悬浮窗："/>
        </horizontal>
    </card>
    <card h="auto" margin="10" id="cdInput" text="输入区" w="*">
        <vertical>
            <input/>
        </vertical>
    </card>
    <card margin="10" w="*" h="auto" id="cdButton" text="按钮区">
        <vertical>
            <horizontal>
                <button/>
                <button/>
            </horizontal>
            <horizontal>
                <button/>
                <button/>
                <button/>
            </horizontal>
        </vertical>
    </card>
</vertical>
)