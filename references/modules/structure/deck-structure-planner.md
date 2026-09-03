# 整体结构规划器

## 用途

在任何内容模块排版前，读取用户指定的章节、来源顺序与并列小部分，生成并冻结整套汇报的 `structure-map`。本模块是结构编排的入口：它决定内容模块实例的章节归属、出现顺序、目录插入点、导航状态与页码映射；不生成页面、研究结论或内容字段布局。

## 适用与不适用

适用于有一个或多个章节、需要全局总览、章内目录或章节内容导航的源忠实汇报。用户或来源以顿号、逗号、分号或编号列出的并列小部分，必须分别成为独立的 `section_id`，除非用户或来源明确将它们合并为一个部分。

不适用于临时补写研究结论、改变来源的叙事顺序、合并相邻内容单元以节省页数，或进入内容模块内部改写字段、术语、证据或版式。单页、无章节的材料也不应虚构章节结构；仅在实际需要时创建最小的结构映射。

## 输入

- 用户指定的章节、章节顺序、子部分和介绍顺序；
- 已读取的来源结构、可追溯位置与明确的合并关系；
- 每个内容单元的 `module_id`、`instance_id`、`narrative_role`、`source_refs` 与预计页数；
- 首尾页实例及其在整套叙事中的位置。

## 输出：`structure-map`

冻结后的 `structure-map` 是唯一的上层编排清单。它至少保留以下字段；内容模块仍独立拥有其内部字段与语义。

```yaml
deck:
  assembly_recipe:
    - front-and-ending.cover
    - whole-deck-overview
    - chapter-agenda(ch1)
    - content-instances(ch1) + progressive-navigation(ch1)
    - chapter-agenda(ch2)
    - content-instances(ch2) + progressive-navigation(ch2)
    - front-and-ending.summary-or-end
chapters:
  - chapter_id: ch1
    agenda_instance: chapter-agenda-ch1
    sections:
      - section_id: ch1-s1
        label: 问题背景
        module_instance_ids: [paper-01-overview]
        page_span: 4-5
      - section_id: ch1-s2
        label: 方法流程
        module_instance_ids: [paper-01-training, paper-01-inference]
        page_span: 6-8
  - chapter_id: ch2
    agenda_instance: chapter-agenda-ch2
    sections:
      - section_id: ch2-s1
        label: 证据边界
        module_instance_ids: [conclusion-01]
        page_span: 10
```

`chapter_id` 标识章节所有权，`agenda_instance` 标识该章唯一目录实例，`section_id` 标识可独立寻址的小部分，`label` 是面向听众的语义标签，`module_instance_ids` 记录本部分串联的内容实例，`page_span` 记录当前的闭区间页码或页段。实例还应保留统一接口所要求的 `module_id`、`instance_id`、`subsection_label`、`narrative_role`、`source_refs` 与 `navigation_state`。

## 两阶段页码同步

1. **预排版阶段：预计页段。** 在内容模块布局前，根据各实例预计页数填入 `page_span`，冻结章节、目录项、插入点和叙事顺序。此时总览与章内目录使用该映射准备对应的页码占位和范围。
2. **拆页后阶段：最终同步。** 任何内容实例因可读性拆页、删页或改变页数后，重新计算全部后续 `page_span`，并同步全局总览、章内目录、内容页的导航状态与当前高亮、页脚页码和备注中的前后过渡语。只有同步完成后，映射才可标记为最终版。

## 装配位置与顺序

结构模块在存储中相互独立，在执行中作为内容模块外层的包装器和插入点。正向装配顺序必须是：

```text
front-and-ending.cover
→ whole-deck-overview
→ chapter-agenda(ch1)
→ content instances in ch1 with progressive-navigation(ch1)
→ chapter-agenda(ch2)
→ content instances in ch2 with progressive-navigation(ch2)
→ ...
→ front-and-ending.summary-or-end
```

禁止先生成所有结构页、再生成所有内容页；每一章目录后必须先完成该章内容，再进入下一章目录。规划器只包裹、插入和串联内容模块实例，不能改写其内部内容。

## 页码同步职责

- 在预排版阶段为每个章节、目录实例、内容实例与首尾页分配预计页段；
- 在终版阶段向 `whole-deck-overview` 提供每章最终起始页/页段，向 `chapter-agenda` 提供本章各 `section_id` 的最终页段；
- 向 `progressive-navigation` 提供章节、稳定标签、当前 `section_id` 和跨拆分页的持续范围；
- 检查目录、导航、页脚与实际内容页的页码一致性。

## 失败条件

- 未在内容排版前冻结 `structure-map`；
- 将并列子部分未经明确授权合并，或用不透明代码替代语义标签；
- 把全部目录/导航结构页集中置于内容前，或让下一章目录早于上一章内容；
- 内容拆页后未重新计算页段和所有下游页码状态；
- 结构层改写内容模块的内部字段、来源、证据边界或研究语义。

## 核心契约依赖与资产

本模块仅依赖 `core-contract`：来源忠实、来源与备注、视觉与可读性契约约束所有被编排实例。注册表 ID 为 `deck-structure-planner`，其 `template` 为 `null`；本规划器无独立 PPTX 资产。
