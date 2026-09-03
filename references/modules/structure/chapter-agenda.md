# 分部分目录

## 用途

在每个章节开始处展示该章节内部、可独立寻址的小部分：按顺序列出各 `section_id` 的面向听众语义标签与最终页段，为随后紧邻的该章内容建立导航锚点。

## 适用与不适用

适用于 `structure-map` 中的每一个真实章节；每章恰有一个对应 `agenda_instance`。用户或来源以顿号、逗号、分号或编号列出的子部分保持为独立 `section_id`，除非其明确说明应合并。

不适用于替代全局总览、提前展示下一章内容、把多个章节的目录堆叠在一起、压缩或重写内容模块字段，或以英文字母/数字等不透明代码替代语义标签。

## 输入

- 冻结的 `structure-map` 中对应的 `chapter_id` 与 `agenda_instance`；
- 该章按用户/来源顺序排列的 `section_id`、`label`、`module_instance_ids` 与最终 `page_span`；
- 本页的 `instance_id`、`narrative_role`、`source_refs` 与备注要求。

## 输出

生成该章节唯一的 `chapter-agenda` 实例，列出每个独立小部分的完整语义标签和最终页段。其连接字段包含 `module_id`、`instance_id`、`chapter_id`、`section_id`（目录本身可为空）、`subsection_label`、`narrative_role`、`source_refs`、`page_span` 与 `navigation_state`。它不定义各内容页的研究主张或字段布局。

## 装配位置

该模块仅出现在其所属章节的起点，并且必须直接由该章节内容跟随：

```text
chapter-agenda(chN) → content instances in chN with progressive-navigation(chN) → chapter-agenda(chN+1)
```

第一章目录位于全局总览之后；其余章节目录位于上一章内容之后。任何章内目录都不得在对应章节内容结束前被下一章目录插入打断。

## 页码同步职责

- 预排版时显示规划器提供的本章预计页段，并将其绑定到对应 `section_id`；
- 任一内容实例拆页、删页或调整后，更新该章所有受影响条目与后续章节的页段；
- 与 `whole-deck-overview` 的章节页段、内容页页脚和 `progressive-navigation` 的当前状态核对；
- 维持一个 `section_id` 对应一个语义标签和连续实际内容页段，不因拆页改变条目顺序或标签。

## 失败条件

- 目录未置于所属章节开始处，或目录后未先呈现本章内容；
- 漏掉、擅自合并、重排或用不透明代码缩写独立小部分；
- 页段与实际内容不一致，尤其是内容拆页后未同步；
- 将本模块用于全局章节总览，或先生成所有目录再统一生成内容；
- 在目录中加入研究结论、来源之外的事实或内容字段布局。

## 核心契约依赖与资产

本模块仅依赖 `core-contract`，并遵循来源忠实、来源与备注、视觉与可读性要求；它不依赖其他结构或内容模块。注册表中的独立模板资产路径为 `assets/modules/chapter-agenda.pptx`。

## 模板占位词

模板资产的待替换文字使用 `小节标题`、`简短说明`、`页码范围`、`来源页码` 等引导字段；不得预填具体论文或章节结论。实际汇报中使用用户给定的小部分名称，并在拆页后同步最终页码。
