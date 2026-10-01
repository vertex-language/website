# package cascade

```vertex
import "web/cascade"
```

## Index

- [`func ReadsAttribute(_ name: string) -> bool`](#func-ReadsAttribute)
- [`func SupportsCondition(_ text: string) -> bool`](#func-SupportsCondition)
- [`func UserAgentCSS() -> string`](#func-UserAgentCSS)
- [`func UserAgentRules() -> RuleSet`](#func-UserAgentRules)
- [`enum AlignItems: Equatable`](#enum-AlignItems)
- [`struct BackgroundImage`](#struct-BackgroundImage)
  - [`init(url: string)`](#BackgroundImage.init)
  - [`init(gradient: draw.LinearGradient)`](#BackgroundImage.init-2)
  - [`var URL: string`](#BackgroundImage.URL)
  - [`var Gradient: draw.LinearGradient?`](#BackgroundImage.Gradient)
  - [`var RepeatX: bool`](#BackgroundImage.RepeatX)
  - [`var RepeatY: bool`](#BackgroundImage.RepeatY)
  - [`var Size: BackgroundSize`](#BackgroundImage.Size)
  - [`var PositionX: float32`](#BackgroundImage.PositionX)
  - [`var PositionY: float32`](#BackgroundImage.PositionY)
  - [`var OffsetX: float32 = 0`](#BackgroundImage.OffsetX)
  - [`var OffsetY: float32 = 0`](#BackgroundImage.OffsetY)
  - [`var IsGradient: bool { get }`](#BackgroundImage.IsGradient)
- [`enum BackgroundSize: Equatable`](#enum-BackgroundSize)
- [`enum BorderCollapse: Equatable`](#enum-BorderCollapse)
- [`enum BorderStyle: Equatable`](#enum-BorderStyle)
  - [`var Draws: bool { get }`](#BorderStyle.Draws)
- [`enum BoxSizing: Equatable`](#enum-BoxSizing)
- [`enum Clear: Equatable`](#enum-Clear)
- [`final class ComputedStyle`](#class-ComputedStyle)
  - [`init()`](#ComputedStyle.init)
  - [`init(inheriting parent: ComputedStyle)`](#ComputedStyle.init-2)
  - [`var Display: Display = .inline`](#ComputedStyle.Display)
  - [`var Position: Position = .static`](#ComputedStyle.Position)
  - [`var Float: FloatSide = .none`](#ComputedStyle.Float)
  - [`var Clear: Clear = .none`](#ComputedStyle.Clear)
  - [`var Top: css.Length = .auto`](#ComputedStyle.Top)
  - [`var Right: css.Length = .auto`](#ComputedStyle.Right)
  - [`var Bottom: css.Length = .auto`](#ComputedStyle.Bottom)
  - [`var Left: css.Length = .auto`](#ComputedStyle.Left)
  - [`var ZIndex: int32 = 0`](#ComputedStyle.ZIndex)
  - [`var HasZIndex: bool = false`](#ComputedStyle.HasZIndex)
  - [`var Width: css.Length = .auto`](#ComputedStyle.Width)
  - [`var Height: css.Length = .auto`](#ComputedStyle.Height)
  - [`var MinWidth: css.Length = .px(0)`](#ComputedStyle.MinWidth)
  - [`var MinHeight: css.Length = .px(0)`](#ComputedStyle.MinHeight)
  - [`var MaxWidth: css.Length = .none`](#ComputedStyle.MaxWidth)
  - [`var MaxHeight: css.Length = .none`](#ComputedStyle.MaxHeight)
  - [`var BoxSizing: BoxSizing = .contentBox`](#ComputedStyle.BoxSizing)
  - [`var MarginTop: css.Length = .px(0)`](#ComputedStyle.MarginTop)
  - [`var MarginRight: css.Length = .px(0)`](#ComputedStyle.MarginRight)
  - [`var MarginBottom: css.Length = .px(0)`](#ComputedStyle.MarginBottom)
  - [`var MarginLeft: css.Length = .px(0)`](#ComputedStyle.MarginLeft)
  - [`var PaddingTop: css.Length = .px(0)`](#ComputedStyle.PaddingTop)
  - [`var PaddingRight: css.Length = .px(0)`](#ComputedStyle.PaddingRight)
  - [`var PaddingBottom: css.Length = .px(0)`](#ComputedStyle.PaddingBottom)
  - [`var PaddingLeft: css.Length = .px(0)`](#ComputedStyle.PaddingLeft)
  - [`var BorderTopWidth: float32 = 0`](#ComputedStyle.BorderTopWidth)
  - [`var BorderRightWidth: float32 = 0`](#ComputedStyle.BorderRightWidth)
  - [`var BorderBottomWidth: float32 = 0`](#ComputedStyle.BorderBottomWidth)
  - [`var BorderLeftWidth: float32 = 0`](#ComputedStyle.BorderLeftWidth)
  - [`var BorderTopStyle: BorderStyle = .none`](#ComputedStyle.BorderTopStyle)
  - [`var BorderRightStyle: BorderStyle = .none`](#ComputedStyle.BorderRightStyle)
  - [`var BorderBottomStyle: BorderStyle = .none`](#ComputedStyle.BorderBottomStyle)
  - [`var BorderLeftStyle: BorderStyle = .none`](#ComputedStyle.BorderLeftStyle)
  - [`var BorderTopColor: draw.Color? = nil`](#ComputedStyle.BorderTopColor)
  - [`var BorderRightColor: draw.Color? = nil`](#ComputedStyle.BorderRightColor)
  - [`var BorderBottomColor: draw.Color? = nil`](#ComputedStyle.BorderBottomColor)
  - [`var BorderLeftColor: draw.Color? = nil`](#ComputedStyle.BorderLeftColor)
  - [`var BorderRadius: draw.Radii = draw.Radii.zero`](#ComputedStyle.BorderRadius)
  - [`var BorderRadiusPercent: draw.Radii = draw.Radii.zero`](#ComputedStyle.BorderRadiusPercent)
  - [`var BackgroundColor: draw.Color = draw.Color.transparent`](#ComputedStyle.BackgroundColor)
  - [`var BackgroundImage: BackgroundImage? = nil`](#ComputedStyle.BackgroundImage)
  - [`var Opacity: float32 = 1`](#ComputedStyle.Opacity)
  - [`var FilterBlur: float32 = 0`](#ComputedStyle.FilterBlur)
  - [`var OverflowX: Overflow = .visible`](#ComputedStyle.OverflowX)
  - [`var OverflowY: Overflow = .visible`](#ComputedStyle.OverflowY)
  - [`var Shadows: [Shadow] = []`](#ComputedStyle.Shadows)
  - [`var OutlineWidth: float32 = 0`](#ComputedStyle.OutlineWidth)
  - [`var OutlineColor: draw.Color? = nil`](#ComputedStyle.OutlineColor)
  - [`var VerticalAlign: VerticalAlign = .baseline`](#ComputedStyle.VerticalAlign)
  - [`var TextDecoration: TextDecoration = cascade.TextDecoration()`](#ComputedStyle.TextDecoration)
  - [`var TextDecorationColor: draw.Color? = nil`](#ComputedStyle.TextDecorationColor)
  - [`var FlexDirection: FlexDirection = .row`](#ComputedStyle.FlexDirection)
  - [`var FlexWrap: FlexWrap = .nowrap`](#ComputedStyle.FlexWrap)
  - [`var JustifyContent: JustifyContent = .flexStart`](#ComputedStyle.JustifyContent)
  - [`var AlignItems: AlignItems = .stretch`](#ComputedStyle.AlignItems)
  - [`var AlignSelf: AlignItems = .auto`](#ComputedStyle.AlignSelf)
  - [`var AlignContent: JustifyContent = .flexStart`](#ComputedStyle.AlignContent)
  - [`var FlexGrow: float32 = 0`](#ComputedStyle.FlexGrow)
  - [`var FlexShrink: float32 = 1`](#ComputedStyle.FlexShrink)
  - [`var FlexBasis: css.Length = .auto`](#ComputedStyle.FlexBasis)
  - [`var Order: int32 = 0`](#ComputedStyle.Order)
  - [`var RowGap: css.Length = .px(0)`](#ComputedStyle.RowGap)
  - [`var ColumnGap: css.Length = .px(0)`](#ComputedStyle.ColumnGap)
  - [`var TableLayout: TableLayout = .auto`](#ComputedStyle.TableLayout)
  - [`var GridColumns: [css.GridTrack] = []`](#ComputedStyle.GridColumns)
  - [`var GridRows: [css.GridTrack] = []`](#ComputedStyle.GridRows)
  - [`var GridAutoRows: css.GridTrack = .auto`](#ComputedStyle.GridAutoRows)
  - [`var GridAutoColumns: css.GridTrack = .auto`](#ComputedStyle.GridAutoColumns)
  - [`var GridAutoFlowColumn: bool = false`](#ComputedStyle.GridAutoFlowColumn)
  - [`var AspectRatio: float32 = 0`](#ComputedStyle.AspectRatio)
  - [`var GridColumn: css.GridPlacement = css.GridPlacement.auto`](#ComputedStyle.GridColumn)
  - [`var GridRow: css.GridPlacement = css.GridPlacement.auto`](#ComputedStyle.GridRow)
  - [`var Color: draw.Color = draw.Color.black`](#ComputedStyle.Color)
  - [`var FontFamilies: [string] = ["system-ui"]`](#ComputedStyle.FontFamilies)
  - [`var FontSize: float32 = 16`](#ComputedStyle.FontSize)
  - [`var FontWeight: int32 = 400`](#ComputedStyle.FontWeight)
  - [`var FontStyle: FontStyle = .normal`](#ComputedStyle.FontStyle)
  - [`var LineHeight: LineHeight = .normal`](#ComputedStyle.LineHeight)
  - [`var TextAlign: TextAlign = .start`](#ComputedStyle.TextAlign)
  - [`var TextTransform: TextTransform = .none`](#ComputedStyle.TextTransform)
  - [`var TextIndent: css.Length = .px(0)`](#ComputedStyle.TextIndent)
  - [`var LetterSpacing: float32 = 0`](#ComputedStyle.LetterSpacing)
  - [`var WordSpacing: float32 = 0`](#ComputedStyle.WordSpacing)
  - [`var WhiteSpace: WhiteSpace = .normal`](#ComputedStyle.WhiteSpace)
  - [`var OverflowWrap: OverflowWrap = .normal`](#ComputedStyle.OverflowWrap)
  - [`var WordBreak: WordBreak = .normal`](#ComputedStyle.WordBreak)
  - [`var TextOverflow: TextOverflow = .clip`](#ComputedStyle.TextOverflow)
  - [`var ListStyleType: ListStyleType = .disc`](#ComputedStyle.ListStyleType)
  - [`var ListStylePosition: ListStylePosition = .outside`](#ComputedStyle.ListStylePosition)
  - [`var Cursor: CursorKind = .auto`](#ComputedStyle.Cursor)
  - [`var Visibility: Visibility = .visible`](#ComputedStyle.Visibility)
  - [`var BorderCollapse: BorderCollapse = .separate`](#ComputedStyle.BorderCollapse)
  - [`var BorderSpacing: float32 = 2`](#ComputedStyle.BorderSpacing)
  - [`var TabSize: int32 = 8`](#ComputedStyle.TabSize)
  - [`var Content: [string]? = nil`](#ComputedStyle.Content)
  - [`var Fill: draw.Color = draw.Color(0, 0, 0)`](#ComputedStyle.Fill)
  - [`var FillCurrent: bool = false`](#ComputedStyle.FillCurrent)
  - [`var FillNone: bool = false`](#ComputedStyle.FillNone)
  - [`var Face: font.Face { get }`](#ComputedStyle.Face)
  - [`var LineHeightPx: float32 { get }`](#ComputedStyle.LineHeightPx)
  - [`var BorderWidths: draw.Edges { get }`](#ComputedStyle.BorderWidths)
  - [`var IsPositioned: bool { get }`](#ComputedStyle.IsPositioned)
  - [`var IsOutOfFlow: bool { get }`](#ComputedStyle.IsOutOfFlow)
  - [`var IsFlexContainer: bool { get }`](#ComputedStyle.IsFlexContainer)
  - [`var IsGridContainer: bool { get }`](#ComputedStyle.IsGridContainer)
  - [`var HasBorderRadius: bool { get }`](#ComputedStyle.HasBorderRadius)
  - [`var ClipsOverflow: bool { get }`](#ComputedStyle.ClipsOverflow)
  - [`var IsScrollContainer: bool { get }`](#ComputedStyle.IsScrollContainer)
  - [`func BorderColor(_ side: int) -> draw.Color`](#ComputedStyle.BorderColor)
  - [`func Radii(width: float32, height: float32) -> draw.Radii`](#ComputedStyle.Radii)
- [`enum CursorKind: Equatable`](#enum-CursorKind)
- [`enum Display: Equatable`](#enum-Display)
  - [`var IsInlineLevel: bool { get }`](#Display.IsInlineLevel)
  - [`var Blockified: Display { get }`](#Display.Blockified)
- [`enum FlexDirection: Equatable`](#enum-FlexDirection)
  - [`var IsRow: bool { get }`](#FlexDirection.IsRow)
  - [`var IsReverse: bool { get }`](#FlexDirection.IsReverse)
- [`enum FlexWrap: Equatable`](#enum-FlexWrap)
- [`enum FloatSide: Equatable`](#enum-FloatSide)
- [`enum FontStyle: Equatable`](#enum-FontStyle)
- [`enum JustifyContent: Equatable`](#enum-JustifyContent)
- [`enum LineHeight: Equatable`](#enum-LineHeight)
- [`enum ListStylePosition: Equatable`](#enum-ListStylePosition)
- [`enum ListStyleType: Equatable`](#enum-ListStyleType)
- [`enum Overflow: Equatable`](#enum-Overflow)
  - [`var Clips: bool { get }`](#Overflow.Clips)
  - [`var Scrolls: bool { get }`](#Overflow.Scrolls)
- [`enum OverflowWrap: Equatable`](#enum-OverflowWrap)
- [`enum Position: Equatable`](#enum-Position)
- [`final class RuleSet`](#class-RuleSet)
  - [`init()`](#RuleSet.init)
  - [`var UsesHover: bool = false`](#RuleSet.UsesHover)
  - [`var UsesFocus: bool = false`](#RuleSet.UsesFocus)
  - [`var UsesActive: bool = false`](#RuleSet.UsesActive)
  - [`var UsesVisited: bool = false`](#RuleSet.UsesVisited)
  - [`var UsesViewport: bool = false`](#RuleSet.UsesViewport)
  - [`var UsesCustomProperties: bool = false`](#RuleSet.UsesCustomProperties)
  - [`var ImageURLs: [string] = []`](#RuleSet.ImageURLs)
  - [`var IsEmpty: bool { get }`](#RuleSet.IsEmpty)
  - [`func Add(_ sheet: css.StyleSheet, media: string = "")`](#RuleSet.Add)
- [`struct Shadow: Equatable`](#struct-Shadow)
  - [`init(x: float32, y: float32, blur: float32, spread: float32, color: draw.Color, inset: bool)`](#Shadow.init)
  - [`var X: float32`](#Shadow.X)
  - [`var Y: float32`](#Shadow.Y)
  - [`var Blur: float32`](#Shadow.Blur)
  - [`var Spread: float32`](#Shadow.Spread)
  - [`var Color: draw.Color`](#Shadow.Color)
  - [`var Inset: bool`](#Shadow.Inset)
- [`struct StateEntry`](#struct-StateEntry)
- [`final class StyleResolver`](#class-StyleResolver)
  - [`init(ua: RuleSet)`](#StyleResolver.init)
  - [`let UA: RuleSet`](#StyleResolver.UA)
  - [`var Author: RuleSet`](#StyleResolver.Author)
  - [`var ViewportWidth: float32 = 800`](#StyleResolver.ViewportWidth)
  - [`var ViewportHeight: float32 = 600`](#StyleResolver.ViewportHeight)
  - [`var RootFontSize: float32 = 16`](#StyleResolver.RootFontSize)
  - [`var Dark: bool = false`](#StyleResolver.Dark)
  - [`var StateTrace: [StateEntry] = []`](#StyleResolver.StateTrace)
  - [`var UsesHover: bool { get }`](#StyleResolver.UsesHover)
  - [`var UsesFocus: bool { get }`](#StyleResolver.UsesFocus)
  - [`var UsesActive: bool { get }`](#StyleResolver.UsesActive)
  - [`var UsesVisited: bool { get }`](#StyleResolver.UsesVisited)
  - [`var HasPseudoElements: bool { get }`](#StyleResolver.HasPseudoElements)
  - [`func StateMatchesChanged(_ context: selector.MatchContext) -> bool`](#StyleResolver.StateMatchesChanged)
  - [`func ResolvePseudo(_ node: html.Node, _ which: string, parent: ComputedStyle, context: selector.MatchContext) -> ComputedStyle?`](#StyleResolver.ResolvePseudo)
  - [`func Resolve(_ node: html.Node, parent: ComputedStyle?, context: selector.MatchContext) -> ComputedStyle`](#StyleResolver.Resolve)
  - [`func ResolveText(parent: ComputedStyle) -> ComputedStyle`](#StyleResolver.ResolveText)
  - [`func Invalidate(_ records: [dom.MutationRecord], reads: (string) -> bool) -> [html.Node]`](#StyleResolver.Invalidate)
- [`enum TableLayout: Equatable`](#enum-TableLayout)
- [`enum TextAlign: Equatable`](#enum-TextAlign)
- [`struct TextDecoration: Equatable`](#struct-TextDecoration)
  - [`init()`](#TextDecoration.init)
  - [`var Underline: bool = false`](#TextDecoration.Underline)
  - [`var Overline: bool = false`](#TextDecoration.Overline)
  - [`var LineThrough: bool = false`](#TextDecoration.LineThrough)
  - [`static let none = TextDecoration()`](#TextDecoration.none)
  - [`var IsNone: bool { get }`](#TextDecoration.IsNone)
  - [`func Union(_ o: TextDecoration) -> TextDecoration`](#TextDecoration.Union)
- [`enum TextOverflow: Equatable`](#enum-TextOverflow)
- [`enum TextTransform: Equatable`](#enum-TextTransform)
- [`enum VerticalAlign: Equatable`](#enum-VerticalAlign)
- [`enum Visibility: Equatable`](#enum-Visibility)
- [`enum WhiteSpace: Equatable`](#enum-WhiteSpace)
  - [`var Collapses: bool { get }`](#WhiteSpace.Collapses)
  - [`var Wraps: bool { get }`](#WhiteSpace.Wraps)
  - [`var KeepsNewlines: bool { get }`](#WhiteSpace.KeepsNewlines)
- [`enum WordBreak: Equatable`](#enum-WordBreak)

## Functions

### func ReadsAttribute <a id="func-ReadsAttribute"></a>

```vertex
public func ReadsAttribute(_ name: string) -> bool
```

Whether the cascade reads an attribute itself, outside any selector:
inline style, and the presentational hints.

### func SupportsCondition <a id="func-SupportsCondition"></a>

```vertex
public func SupportsCondition(_ text: string) -> bool
```

Whether an @supports condition holds here: `(display: grid)` where
the engine parses the declaration, `selector(:has(a))` where it
parses and matches the selector, and those combined with `not`,
`and` and `or`. Anything else (`font-tech()`) doesn't hold.

### func UserAgentCSS <a id="func-UserAgentCSS"></a>

```vertex
public func UserAgentCSS() -> string
```

The user agent stylesheet: what HTML looks like before a page says
otherwise, after the standard's rendering section.

### func UserAgentRules <a id="func-UserAgentRules"></a>

```vertex
public func UserAgentRules() -> RuleSet
```

## Types

### enum AlignItems <a id="enum-AlignItems"></a>

```vertex
public enum AlignItems: Equatable
```

#### Cases

<a id="AlignItems.stretch"></a>

```vertex
case stretch
```

<a id="AlignItems.flexStart"></a>

```vertex
case flexStart
```

<a id="AlignItems.flexEnd"></a>

```vertex
case flexEnd
```

<a id="AlignItems.center"></a>

```vertex
case center
```

<a id="AlignItems.baseline"></a>

```vertex
case baseline
```

<a id="AlignItems.auto"></a>

```vertex
case auto
```

### struct BackgroundImage <a id="struct-BackgroundImage"></a>

```vertex
public struct BackgroundImage
```

A background image: a picture by URL, drawn once a loader has
answered, or a gradient. How it repeats, where it sits and how big
it is come from the other background properties.

#### Initializers

<a id="BackgroundImage.init"></a>

```vertex
public init(url: string)
```

<a id="BackgroundImage.init-2"></a>

```vertex
public init(gradient: draw.LinearGradient)
```

#### Properties

<a id="BackgroundImage.URL"></a>

```vertex
public var URL: string
```

<a id="BackgroundImage.Gradient"></a>

```vertex
public var Gradient: draw.LinearGradient?
```

<a id="BackgroundImage.RepeatX"></a>

```vertex
public var RepeatX: bool
```

<a id="BackgroundImage.RepeatY"></a>

```vertex
public var RepeatY: bool
```

<a id="BackgroundImage.Size"></a>

```vertex
public var Size: BackgroundSize
```

<a id="BackgroundImage.PositionX"></a>

```vertex
public var PositionX: float32
```

Position as fractions of the free space: 0 left/top, 0.5 centre, 1 right/bottom.

<a id="BackgroundImage.PositionY"></a>

```vertex
public var PositionY: float32
```

<a id="BackgroundImage.OffsetX"></a>

```vertex
public var OffsetX: float32 = 0
```

Then moved by lengths, in CSS pixels: `0 -261px` is a sprite's
slice 261 pixels down; `right 10px` is 10 pixels in from the right.

<a id="BackgroundImage.OffsetY"></a>

```vertex
public var OffsetY: float32 = 0
```

<a id="BackgroundImage.IsGradient"></a>

```vertex
public var IsGradient: bool { get }
```

### enum BackgroundSize <a id="enum-BackgroundSize"></a>

```vertex
public enum BackgroundSize: Equatable
```

#### Cases

<a id="BackgroundSize.auto"></a>

```vertex
case auto
```

<a id="BackgroundSize.cover"></a>

```vertex
case cover
```

<a id="BackgroundSize.contain"></a>

```vertex
case contain
```

<a id="BackgroundSize.length"></a>

```vertex
case length(css.Length, css.Length)
```

### enum BorderCollapse <a id="enum-BorderCollapse"></a>

```vertex
public enum BorderCollapse: Equatable
```

#### Cases

<a id="BorderCollapse.separate"></a>

```vertex
case separate
```

<a id="BorderCollapse.collapse"></a>

```vertex
case collapse
```

### enum BorderStyle <a id="enum-BorderStyle"></a>

```vertex
public enum BorderStyle: Equatable
```

#### Cases

<a id="BorderStyle.none"></a>

```vertex
case none
```

<a id="BorderStyle.hidden"></a>

```vertex
case hidden
```

<a id="BorderStyle.solid"></a>

```vertex
case solid
```

<a id="BorderStyle.dashed"></a>

```vertex
case dashed
```

<a id="BorderStyle.dotted"></a>

```vertex
case dotted
```

<a id="BorderStyle.double"></a>

```vertex
case double
```

<a id="BorderStyle.groove"></a>

```vertex
case groove
```

<a id="BorderStyle.ridge"></a>

```vertex
case ridge
```

<a id="BorderStyle.inset"></a>

```vertex
case inset
```

<a id="BorderStyle.outset"></a>

```vertex
case outset
```

#### Properties

<a id="BorderStyle.Draws"></a>

```vertex
public var Draws: bool { get }
```

### enum BoxSizing <a id="enum-BoxSizing"></a>

```vertex
public enum BoxSizing: Equatable
```

#### Cases

<a id="BoxSizing.contentBox"></a>

```vertex
case contentBox
```

<a id="BoxSizing.borderBox"></a>

```vertex
case borderBox
```

### enum Clear <a id="enum-Clear"></a>

```vertex
public enum Clear: Equatable
```

#### Cases

<a id="Clear.none"></a>

```vertex
case none
```

<a id="Clear.left"></a>

```vertex
case left
```

<a id="Clear.right"></a>

```vertex
case right
```

<a id="Clear.both"></a>

```vertex
case both
```

### class ComputedStyle <a id="class-ComputedStyle"></a>

```vertex
public final class ComputedStyle
```

The style an element ends up with: every property, resolved as far
as the cascade can without knowing the containing block. One per
element; text takes its parent's.

#### Initializers

<a id="ComputedStyle.init"></a>

```vertex
public init()
```

<a id="ComputedStyle.init-2"></a>

```vertex
public init(inheriting parent: ComputedStyle)
```

A style that inherits what inherits from a parent's, with every
other property at its initial value.

#### Properties

<a id="ComputedStyle.Display"></a>

```vertex
public var Display: Display = .inline
```

Box generation and placement.

<a id="ComputedStyle.Position"></a>

```vertex
public var Position: Position = .static
```

<a id="ComputedStyle.Float"></a>

```vertex
public var Float: FloatSide = .none
```

<a id="ComputedStyle.Clear"></a>

```vertex
public var Clear: Clear = .none
```

<a id="ComputedStyle.Top"></a>

```vertex
public var Top: css.Length = .auto
```

<a id="ComputedStyle.Right"></a>

```vertex
public var Right: css.Length = .auto
```

<a id="ComputedStyle.Bottom"></a>

```vertex
public var Bottom: css.Length = .auto
```

<a id="ComputedStyle.Left"></a>

```vertex
public var Left: css.Length = .auto
```

<a id="ComputedStyle.ZIndex"></a>

```vertex
public var ZIndex: int32 = 0
```

<a id="ComputedStyle.HasZIndex"></a>

```vertex
public var HasZIndex: bool = false
```

<a id="ComputedStyle.Width"></a>

```vertex
public var Width: css.Length = .auto
```

Sizing.

<a id="ComputedStyle.Height"></a>

```vertex
public var Height: css.Length = .auto
```

<a id="ComputedStyle.MinWidth"></a>

```vertex
public var MinWidth: css.Length = .px(0)
```

<a id="ComputedStyle.MinHeight"></a>

```vertex
public var MinHeight: css.Length = .px(0)
```

<a id="ComputedStyle.MaxWidth"></a>

```vertex
public var MaxWidth: css.Length = .none
```

<a id="ComputedStyle.MaxHeight"></a>

```vertex
public var MaxHeight: css.Length = .none
```

<a id="ComputedStyle.BoxSizing"></a>

```vertex
public var BoxSizing: BoxSizing = .contentBox
```

<a id="ComputedStyle.MarginTop"></a>

```vertex
public var MarginTop: css.Length = .px(0)
```

The edges.

<a id="ComputedStyle.MarginRight"></a>

```vertex
public var MarginRight: css.Length = .px(0)
```

<a id="ComputedStyle.MarginBottom"></a>

```vertex
public var MarginBottom: css.Length = .px(0)
```

<a id="ComputedStyle.MarginLeft"></a>

```vertex
public var MarginLeft: css.Length = .px(0)
```

<a id="ComputedStyle.PaddingTop"></a>

```vertex
public var PaddingTop: css.Length = .px(0)
```

<a id="ComputedStyle.PaddingRight"></a>

```vertex
public var PaddingRight: css.Length = .px(0)
```

<a id="ComputedStyle.PaddingBottom"></a>

```vertex
public var PaddingBottom: css.Length = .px(0)
```

<a id="ComputedStyle.PaddingLeft"></a>

```vertex
public var PaddingLeft: css.Length = .px(0)
```

<a id="ComputedStyle.BorderTopWidth"></a>

```vertex
public var BorderTopWidth: float32 = 0
```

<a id="ComputedStyle.BorderRightWidth"></a>

```vertex
public var BorderRightWidth: float32 = 0
```

<a id="ComputedStyle.BorderBottomWidth"></a>

```vertex
public var BorderBottomWidth: float32 = 0
```

<a id="ComputedStyle.BorderLeftWidth"></a>

```vertex
public var BorderLeftWidth: float32 = 0
```

<a id="ComputedStyle.BorderTopStyle"></a>

```vertex
public var BorderTopStyle: BorderStyle = .none
```

<a id="ComputedStyle.BorderRightStyle"></a>

```vertex
public var BorderRightStyle: BorderStyle = .none
```

<a id="ComputedStyle.BorderBottomStyle"></a>

```vertex
public var BorderBottomStyle: BorderStyle = .none
```

<a id="ComputedStyle.BorderLeftStyle"></a>

```vertex
public var BorderLeftStyle: BorderStyle = .none
```

<a id="ComputedStyle.BorderTopColor"></a>

```vertex
public var BorderTopColor: draw.Color? = nil
```

<a id="ComputedStyle.BorderRightColor"></a>

```vertex
public var BorderRightColor: draw.Color? = nil
```

nil is currentcolor

<a id="ComputedStyle.BorderBottomColor"></a>

```vertex
public var BorderBottomColor: draw.Color? = nil
```

<a id="ComputedStyle.BorderLeftColor"></a>

```vertex
public var BorderLeftColor: draw.Color? = nil
```

<a id="ComputedStyle.BorderRadius"></a>

```vertex
public var BorderRadius: draw.Radii = draw.Radii.zero
```

<a id="ComputedStyle.BorderRadiusPercent"></a>

```vertex
public var BorderRadiusPercent: draw.Radii = draw.Radii.zero
```

Corners given in percentages, of the box's size: resolved by
Radii(width:height:) once it's known.

<a id="ComputedStyle.BackgroundColor"></a>

```vertex
public var BackgroundColor: draw.Color = draw.Color.transparent
```

Painting.

<a id="ComputedStyle.BackgroundImage"></a>

```vertex
public var BackgroundImage: BackgroundImage? = nil
```

<a id="ComputedStyle.Opacity"></a>

```vertex
public var Opacity: float32 = 1
```

<a id="ComputedStyle.FilterBlur"></a>

```vertex
public var FilterBlur: float32 = 0
```

filter: blur()'s radius, in CSS pixels; 0 for none.

<a id="ComputedStyle.OverflowX"></a>

```vertex
public var OverflowX: Overflow = .visible
```

<a id="ComputedStyle.OverflowY"></a>

```vertex
public var OverflowY: Overflow = .visible
```

<a id="ComputedStyle.Shadows"></a>

```vertex
public var Shadows: [Shadow] = []
```

<a id="ComputedStyle.OutlineWidth"></a>

```vertex
public var OutlineWidth: float32 = 0
```

<a id="ComputedStyle.OutlineColor"></a>

```vertex
public var OutlineColor: draw.Color? = nil
```

<a id="ComputedStyle.VerticalAlign"></a>

```vertex
public var VerticalAlign: VerticalAlign = .baseline
```

Inline and flex.

<a id="ComputedStyle.TextDecoration"></a>

```vertex
public var TextDecoration: TextDecoration = cascade.TextDecoration()
```

<a id="ComputedStyle.TextDecorationColor"></a>

```vertex
public var TextDecorationColor: draw.Color? = nil
```

<a id="ComputedStyle.FlexDirection"></a>

```vertex
public var FlexDirection: FlexDirection = .row
```

<a id="ComputedStyle.FlexWrap"></a>

```vertex
public var FlexWrap: FlexWrap = .nowrap
```

<a id="ComputedStyle.JustifyContent"></a>

```vertex
public var JustifyContent: JustifyContent = .flexStart
```

<a id="ComputedStyle.AlignItems"></a>

```vertex
public var AlignItems: AlignItems = .stretch
```

<a id="ComputedStyle.AlignSelf"></a>

```vertex
public var AlignSelf: AlignItems = .auto
```

<a id="ComputedStyle.AlignContent"></a>

```vertex
public var AlignContent: JustifyContent = .flexStart
```

<a id="ComputedStyle.FlexGrow"></a>

```vertex
public var FlexGrow: float32 = 0
```

<a id="ComputedStyle.FlexShrink"></a>

```vertex
public var FlexShrink: float32 = 1
```

<a id="ComputedStyle.FlexBasis"></a>

```vertex
public var FlexBasis: css.Length = .auto
```

<a id="ComputedStyle.Order"></a>

```vertex
public var Order: int32 = 0
```

<a id="ComputedStyle.RowGap"></a>

```vertex
public var RowGap: css.Length = .px(0)
```

<a id="ComputedStyle.ColumnGap"></a>

```vertex
public var ColumnGap: css.Length = .px(0)
```

<a id="ComputedStyle.TableLayout"></a>

```vertex
public var TableLayout: TableLayout = .auto
```

<a id="ComputedStyle.GridColumns"></a>

```vertex
public var GridColumns: [css.GridTrack] = []
```

<a id="ComputedStyle.GridRows"></a>

```vertex
public var GridRows: [css.GridTrack] = []
```

<a id="ComputedStyle.GridAutoRows"></a>

```vertex
public var GridAutoRows: css.GridTrack = .auto
```

<a id="ComputedStyle.GridAutoColumns"></a>

```vertex
public var GridAutoColumns: css.GridTrack = .auto
```

<a id="ComputedStyle.GridAutoFlowColumn"></a>

```vertex
public var GridAutoFlowColumn: bool = false
```

grid-auto-flow: column, filling each column before the next.

<a id="ComputedStyle.AspectRatio"></a>

```vertex
public var AspectRatio: float32 = 0
```

aspect-ratio as width over height; 0 for auto.

<a id="ComputedStyle.GridColumn"></a>

```vertex
public var GridColumn: css.GridPlacement = css.GridPlacement.auto
```

<a id="ComputedStyle.GridRow"></a>

```vertex
public var GridRow: css.GridPlacement = css.GridPlacement.auto
```

<a id="ComputedStyle.Color"></a>

```vertex
public var Color: draw.Color = draw.Color.black
```

Inherited.

<a id="ComputedStyle.FontFamilies"></a>

```vertex
public var FontFamilies: [string] = ["system-ui"]
```

<a id="ComputedStyle.FontSize"></a>

```vertex
public var FontSize: float32 = 16
```

<a id="ComputedStyle.FontWeight"></a>

```vertex
public var FontWeight: int32 = 400
```

<a id="ComputedStyle.FontStyle"></a>

```vertex
public var FontStyle: FontStyle = .normal
```

<a id="ComputedStyle.LineHeight"></a>

```vertex
public var LineHeight: LineHeight = .normal
```

<a id="ComputedStyle.TextAlign"></a>

```vertex
public var TextAlign: TextAlign = .start
```

<a id="ComputedStyle.TextTransform"></a>

```vertex
public var TextTransform: TextTransform = .none
```

<a id="ComputedStyle.TextIndent"></a>

```vertex
public var TextIndent: css.Length = .px(0)
```

<a id="ComputedStyle.LetterSpacing"></a>

```vertex
public var LetterSpacing: float32 = 0
```

<a id="ComputedStyle.WordSpacing"></a>

```vertex
public var WordSpacing: float32 = 0
```

<a id="ComputedStyle.WhiteSpace"></a>

```vertex
public var WhiteSpace: WhiteSpace = .normal
```

<a id="ComputedStyle.OverflowWrap"></a>

```vertex
public var OverflowWrap: OverflowWrap = .normal
```

<a id="ComputedStyle.WordBreak"></a>

```vertex
public var WordBreak: WordBreak = .normal
```

<a id="ComputedStyle.TextOverflow"></a>

```vertex
public var TextOverflow: TextOverflow = .clip
```

<a id="ComputedStyle.ListStyleType"></a>

```vertex
public var ListStyleType: ListStyleType = .disc
```

<a id="ComputedStyle.ListStylePosition"></a>

```vertex
public var ListStylePosition: ListStylePosition = .outside
```

<a id="ComputedStyle.Cursor"></a>

```vertex
public var Cursor: CursorKind = .auto
```

<a id="ComputedStyle.Visibility"></a>

```vertex
public var Visibility: Visibility = .visible
```

<a id="ComputedStyle.BorderCollapse"></a>

```vertex
public var BorderCollapse: BorderCollapse = .separate
```

<a id="ComputedStyle.BorderSpacing"></a>

```vertex
public var BorderSpacing: float32 = 2
```

<a id="ComputedStyle.TabSize"></a>

```vertex
public var TabSize: int32 = 8
```

<a id="ComputedStyle.Content"></a>

```vertex
public var Content: [string]? = nil
```

The `content` of a pseudo-element, as its parts: text, or
"\u{1}name" for attr(name). Nil is none.

<a id="ComputedStyle.Fill"></a>

```vertex
public var Fill: draw.Color = draw.Color(0, 0, 0)
```

SVG's fill, which inherits: a color, the element's color
(currentColor, kept as that), or none.

<a id="ComputedStyle.FillCurrent"></a>

```vertex
public var FillCurrent: bool = false
```

<a id="ComputedStyle.FillNone"></a>

```vertex
public var FillNone: bool = false
```

<a id="ComputedStyle.Face"></a>

```vertex
public var Face: font.Face { get }
```

The face for the font properties, loaded the first time it is
asked for. The font properties are settled by the time anything
asks, so the face is kept.

<a id="ComputedStyle.LineHeightPx"></a>

```vertex
public var LineHeightPx: float32 { get }
```

The line height in pixels: the face's for `normal`, a number
times the font size, or what was given.

<a id="ComputedStyle.BorderWidths"></a>

```vertex
public var BorderWidths: draw.Edges { get }
```

<a id="ComputedStyle.IsPositioned"></a>

```vertex
public var IsPositioned: bool { get }
```

<a id="ComputedStyle.IsOutOfFlow"></a>

```vertex
public var IsOutOfFlow: bool { get }
```

<a id="ComputedStyle.IsFlexContainer"></a>

```vertex
public var IsFlexContainer: bool { get }
```

<a id="ComputedStyle.IsGridContainer"></a>

```vertex
public var IsGridContainer: bool { get }
```

<a id="ComputedStyle.HasBorderRadius"></a>

```vertex
public var HasBorderRadius: bool { get }
```

<a id="ComputedStyle.ClipsOverflow"></a>

```vertex
public var ClipsOverflow: bool { get }
```

Whether the box clips or scrolls what overflows it.

<a id="ComputedStyle.IsScrollContainer"></a>

```vertex
public var IsScrollContainer: bool { get }
```

#### Methods

<a id="ComputedStyle.BorderColor"></a>

```vertex
public func BorderColor(_ side: int) -> draw.Color
```

The color a border side paints: its own, or the text color.

<a id="ComputedStyle.Radii"></a>

```vertex
public func Radii(width: float32, height: float32) -> draw.Radii
```

The corners' radii for a box of this size. A percentage takes the
shorter side's share, round corners standing in for elliptical ones.

### enum CursorKind <a id="enum-CursorKind"></a>

```vertex
public enum CursorKind: Equatable
```

#### Cases

<a id="CursorKind.auto"></a>

```vertex
case auto
```

<a id="CursorKind.default"></a>

```vertex
case `default`
```

<a id="CursorKind.pointer"></a>

```vertex
case pointer
```

<a id="CursorKind.text"></a>

```vertex
case text
```

<a id="CursorKind.crosshair"></a>

```vertex
case crosshair
```

<a id="CursorKind.move"></a>

```vertex
case move
```

<a id="CursorKind.notAllowed"></a>

```vertex
case notAllowed
```

<a id="CursorKind.ewResize"></a>

```vertex
case ewResize
```

<a id="CursorKind.nsResize"></a>

```vertex
case nsResize
```

<a id="CursorKind.wait"></a>

```vertex
case wait
```

<a id="CursorKind.help"></a>

```vertex
case help
```

<a id="CursorKind.grab"></a>

```vertex
case grab
```

<a id="CursorKind.none"></a>

```vertex
case none
```

### enum Display <a id="enum-Display"></a>

```vertex
public enum Display: Equatable
```

#### Cases

<a id="Display.none"></a>

```vertex
case none
```

<a id="Display.block"></a>

```vertex
case block
```

<a id="Display.inline"></a>

```vertex
case inline
```

<a id="Display.inlineBlock"></a>

```vertex
case inlineBlock
```

<a id="Display.flex"></a>

```vertex
case flex
```

<a id="Display.inlineFlex"></a>

```vertex
case inlineFlex
```

<a id="Display.grid"></a>

```vertex
case grid
```

<a id="Display.inlineGrid"></a>

```vertex
case inlineGrid
```

<a id="Display.listItem"></a>

```vertex
case listItem
```

<a id="Display.table"></a>

```vertex
case table
```

<a id="Display.inlineTable"></a>

```vertex
case inlineTable
```

<a id="Display.tableRow"></a>

```vertex
case tableRow
```

<a id="Display.tableCell"></a>

```vertex
case tableCell
```

<a id="Display.tableRowGroup"></a>

```vertex
case tableRowGroup
```

<a id="Display.tableHeaderGroup"></a>

```vertex
case tableHeaderGroup
```

<a id="Display.tableFooterGroup"></a>

```vertex
case tableFooterGroup
```

<a id="Display.tableCaption"></a>

```vertex
case tableCaption
```

<a id="Display.tableColumn"></a>

```vertex
case tableColumn
```

<a id="Display.tableColumnGroup"></a>

```vertex
case tableColumnGroup
```

<a id="Display.contents"></a>

```vertex
case contents
```

#### Properties

<a id="Display.IsInlineLevel"></a>

```vertex
public var IsInlineLevel: bool { get }
```

Whether boxes of this display sit in a line with text.

<a id="Display.Blockified"></a>

```vertex
public var Blockified: Display { get }
```

The display a float, an absolutely positioned box or a flex item
takes: the block-level counterpart.

### enum FlexDirection <a id="enum-FlexDirection"></a>

```vertex
public enum FlexDirection: Equatable
```

#### Cases

<a id="FlexDirection.row"></a>

```vertex
case row
```

<a id="FlexDirection.rowReverse"></a>

```vertex
case rowReverse
```

<a id="FlexDirection.column"></a>

```vertex
case column
```

<a id="FlexDirection.columnReverse"></a>

```vertex
case columnReverse
```

#### Properties

<a id="FlexDirection.IsRow"></a>

```vertex
public var IsRow: bool { get }
```

<a id="FlexDirection.IsReverse"></a>

```vertex
public var IsReverse: bool { get }
```

### enum FlexWrap <a id="enum-FlexWrap"></a>

```vertex
public enum FlexWrap: Equatable
```

#### Cases

<a id="FlexWrap.nowrap"></a>

```vertex
case nowrap
```

<a id="FlexWrap.wrap"></a>

```vertex
case wrap
```

<a id="FlexWrap.wrapReverse"></a>

```vertex
case wrapReverse
```

### enum FloatSide <a id="enum-FloatSide"></a>

```vertex
public enum FloatSide: Equatable
```

#### Cases

<a id="FloatSide.none"></a>

```vertex
case none
```

<a id="FloatSide.left"></a>

```vertex
case left
```

<a id="FloatSide.right"></a>

```vertex
case right
```

### enum FontStyle <a id="enum-FontStyle"></a>

```vertex
public enum FontStyle: Equatable
```

#### Cases

<a id="FontStyle.normal"></a>

```vertex
case normal
```

<a id="FontStyle.italic"></a>

```vertex
case italic
```

<a id="FontStyle.oblique"></a>

```vertex
case oblique
```

### enum JustifyContent <a id="enum-JustifyContent"></a>

```vertex
public enum JustifyContent: Equatable
```

#### Cases

<a id="JustifyContent.flexStart"></a>

```vertex
case flexStart
```

<a id="JustifyContent.flexEnd"></a>

```vertex
case flexEnd
```

<a id="JustifyContent.center"></a>

```vertex
case center
```

<a id="JustifyContent.spaceBetween"></a>

```vertex
case spaceBetween
```

<a id="JustifyContent.spaceAround"></a>

```vertex
case spaceAround
```

<a id="JustifyContent.spaceEvenly"></a>

```vertex
case spaceEvenly
```

### enum LineHeight <a id="enum-LineHeight"></a>

```vertex
public enum LineHeight: Equatable
```

#### Cases

<a id="LineHeight.normal"></a>

```vertex
case normal
```

<a id="LineHeight.px"></a>

```vertex
case px(float32)
```

<a id="LineHeight.number"></a>

```vertex
case number(float32)
```

### enum ListStylePosition <a id="enum-ListStylePosition"></a>

```vertex
public enum ListStylePosition: Equatable
```

#### Cases

<a id="ListStylePosition.outside"></a>

```vertex
case outside
```

<a id="ListStylePosition.inside"></a>

```vertex
case inside
```

### enum ListStyleType <a id="enum-ListStyleType"></a>

```vertex
public enum ListStyleType: Equatable
```

#### Cases

<a id="ListStyleType.none"></a>

```vertex
case none
```

<a id="ListStyleType.disc"></a>

```vertex
case disc
```

<a id="ListStyleType.circle"></a>

```vertex
case circle
```

<a id="ListStyleType.square"></a>

```vertex
case square
```

<a id="ListStyleType.decimal"></a>

```vertex
case decimal
```

<a id="ListStyleType.decimalLeadingZero"></a>

```vertex
case decimalLeadingZero
```

<a id="ListStyleType.lowerAlpha"></a>

```vertex
case lowerAlpha
```

<a id="ListStyleType.upperAlpha"></a>

```vertex
case upperAlpha
```

<a id="ListStyleType.lowerRoman"></a>

```vertex
case lowerRoman
```

<a id="ListStyleType.upperRoman"></a>

```vertex
case upperRoman
```

### enum Overflow <a id="enum-Overflow"></a>

```vertex
public enum Overflow: Equatable
```

#### Cases

<a id="Overflow.visible"></a>

```vertex
case visible
```

<a id="Overflow.hidden"></a>

```vertex
case hidden
```

<a id="Overflow.scroll"></a>

```vertex
case scroll
```

<a id="Overflow.auto"></a>

```vertex
case auto
```

<a id="Overflow.clip"></a>

```vertex
case clip
```

#### Properties

<a id="Overflow.Clips"></a>

```vertex
public var Clips: bool { get }
```

<a id="Overflow.Scrolls"></a>

```vertex
public var Scrolls: bool { get }
```

### enum OverflowWrap <a id="enum-OverflowWrap"></a>

```vertex
public enum OverflowWrap: Equatable
```

#### Cases

<a id="OverflowWrap.normal"></a>

```vertex
case normal
```

<a id="OverflowWrap.breakWord"></a>

```vertex
case breakWord
```

<a id="OverflowWrap.anywhere"></a>

```vertex
case anywhere
```

### enum Position <a id="enum-Position"></a>

```vertex
public enum Position: Equatable
```

#### Cases

<a id="Position.static"></a>

```vertex
case `static`
```

<a id="Position.relative"></a>

```vertex
case relative
```

<a id="Position.absolute"></a>

```vertex
case absolute
```

<a id="Position.fixed"></a>

```vertex
case fixed
```

<a id="Position.sticky"></a>

```vertex
case sticky
```

### class RuleSet <a id="class-RuleSet"></a>

```vertex
public final class RuleSet
```

The rules of one origin, bucketed by what their rightmost compound
asks for, so that an element is tested against the rules that could
match it and not against every rule on the page.

#### Initializers

<a id="RuleSet.init"></a>

```vertex
public init()
```

#### Properties

<a id="RuleSet.UsesHover"></a>

```vertex
public var UsesHover: bool = false
```

Whether any rule asks about pointer or keyboard state, which is
what makes hovering or focusing worth a style recalculation.

<a id="RuleSet.UsesFocus"></a>

```vertex
public var UsesFocus: bool = false
```

<a id="RuleSet.UsesActive"></a>

```vertex
public var UsesActive: bool = false
```

<a id="RuleSet.UsesVisited"></a>

```vertex
public var UsesVisited: bool = false
```

<a id="RuleSet.UsesViewport"></a>

```vertex
public var UsesViewport: bool = false
```

Whether any rule depends on the viewport: a media query, or a
length in vw or vh, which a resize has to recompute.

<a id="RuleSet.UsesCustomProperties"></a>

```vertex
public var UsesCustomProperties: bool = false
```

Whether any rule declares a custom property or uses var().

<a id="RuleSet.ImageURLs"></a>

```vertex
public var ImageURLs: [string] = []
```

The URLs of background images the rules name, for loading.

<a id="RuleSet.IsEmpty"></a>

```vertex
public var IsEmpty: bool { get }
```

#### Methods

<a id="RuleSet.Add"></a>

```vertex
public func Add(_ sheet: css.StyleSheet, media: string = "")
```

Adds a stylesheet's rules, including those under @media.
Adds a stylesheet's rules. `media` is a query the whole sheet is
under, as a <link media> or <style media> puts it.

### struct Shadow <a id="struct-Shadow"></a>

```vertex
public struct Shadow: Equatable
```

One shadow of box-shadow.

#### Initializers

<a id="Shadow.init"></a>

```vertex
public init(x: float32, y: float32, blur: float32, spread: float32, color: draw.Color, inset: bool)
```

#### Properties

<a id="Shadow.X"></a>

```vertex
public var X: float32
```

<a id="Shadow.Y"></a>

```vertex
public var Y: float32
```

<a id="Shadow.Blur"></a>

```vertex
public var Blur: float32
```

<a id="Shadow.Spread"></a>

```vertex
public var Spread: float32
```

<a id="Shadow.Color"></a>

```vertex
public var Color: draw.Color
```

<a id="Shadow.Inset"></a>

```vertex
public var Inset: bool
```

### struct StateEntry <a id="struct-StateEntry"></a>

```vertex
public struct StateEntry
```

One selector of one rule, with what the cascade sorts by.
One test of a rule that asks about hover, focus or the press.

### class StyleResolver <a id="class-StyleResolver"></a>

```vertex
public final class StyleResolver
```

Computes styles: the user agent's rules, the page's, the element's
own attribute, in that order, sorted as the cascade sorts them.

#### Initializers

<a id="StyleResolver.init"></a>

```vertex
public init(ua: RuleSet)
```

#### Properties

<a id="StyleResolver.UA"></a>

```vertex
public let UA: RuleSet
```

<a id="StyleResolver.Author"></a>

```vertex
public var Author: RuleSet
```

<a id="StyleResolver.ViewportWidth"></a>

```vertex
public var ViewportWidth: float32 = 800
```

<a id="StyleResolver.ViewportHeight"></a>

```vertex
public var ViewportHeight: float32 = 600
```

<a id="StyleResolver.RootFontSize"></a>

```vertex
public var RootFontSize: float32 = 16
```

<a id="StyleResolver.Dark"></a>

```vertex
public var Dark: bool = false
```

Whether the page is shown in a dark color scheme: what
`prefers-color-scheme` answers.

<a id="StyleResolver.StateTrace"></a>

```vertex
public var StateTrace: [StateEntry] = []
```

Every test of a state-dependent rule against an element since the
trace was last cleared, with its outcome. A change of hover, focus
or press can only alter styles where one of these outcomes turns.

<a id="StyleResolver.UsesHover"></a>

```vertex
public var UsesHover: bool { get }
```

Whether the page's rules react to the pointer or keyboard.

<a id="StyleResolver.UsesFocus"></a>

```vertex
public var UsesFocus: bool { get }
```

<a id="StyleResolver.UsesActive"></a>

```vertex
public var UsesActive: bool { get }
```

<a id="StyleResolver.UsesVisited"></a>

```vertex
public var UsesVisited: bool { get }
```

<a id="StyleResolver.HasPseudoElements"></a>

```vertex
public var HasPseudoElements: bool { get }
```

Whether any rule generates content before or after elements.

#### Methods

<a id="StyleResolver.StateMatchesChanged"></a>

```vertex
public func StateMatchesChanged(_ context: selector.MatchContext) -> bool
```

Whether any rule that asks about hover, focus or the press matches
differently under a context than it did when the styles were last
built: the question a pointer move asks before restyling.

<a id="StyleResolver.ResolvePseudo"></a>

```vertex
public func ResolvePseudo(_ node: html.Node, _ which: string, parent: ComputedStyle, context: selector.MatchContext) -> ComputedStyle?
```

The style of an element's ::before or ::after, or nil where no
rule gives it content.

<a id="StyleResolver.Resolve"></a>

```vertex
public func Resolve(_ node: html.Node, parent: ComputedStyle?, context: selector.MatchContext) -> ComputedStyle
```

The style of an element, given its parent's.

<a id="StyleResolver.ResolveText"></a>

```vertex
public func ResolveText(parent: ComputedStyle) -> ComputedStyle
```

The style text takes: its parent's, which is what inherits.

<a id="StyleResolver.Invalidate"></a>

```vertex
public func Invalidate(_ records: [dom.MutationRecord], reads: (string) -> bool) -> [html.Node]
```

The elements a batch of changes may restyle: each is the root of
a subtree to restyle, as inherited values flow down. Empty where
no rule, no hint and nothing `reads` names depends on what
changed -- the page can skip the frame.

`reads` answers for the attributes later stages read themselves
(an image's src, a cell's colspan).

### enum TableLayout <a id="enum-TableLayout"></a>

```vertex
public enum TableLayout: Equatable
```

#### Cases

<a id="TableLayout.auto"></a>

```vertex
case auto
```

<a id="TableLayout.fixed"></a>

```vertex
case fixed
```

### enum TextAlign <a id="enum-TextAlign"></a>

```vertex
public enum TextAlign: Equatable
```

#### Cases

<a id="TextAlign.start"></a>

```vertex
case start
```

<a id="TextAlign.end"></a>

```vertex
case end
```

<a id="TextAlign.left"></a>

```vertex
case left
```

<a id="TextAlign.right"></a>

```vertex
case right
```

<a id="TextAlign.center"></a>

```vertex
case center
```

<a id="TextAlign.justify"></a>

```vertex
case justify
```

### struct TextDecoration <a id="struct-TextDecoration"></a>

```vertex
public struct TextDecoration: Equatable
```

Which lines text-decoration draws, as bits.

#### Initializers

<a id="TextDecoration.init"></a>

```vertex
public init()
```

#### Properties

<a id="TextDecoration.Underline"></a>

```vertex
public var Underline: bool = false
```

<a id="TextDecoration.Overline"></a>

```vertex
public var Overline: bool = false
```

<a id="TextDecoration.LineThrough"></a>

```vertex
public var LineThrough: bool = false
```

<a id="TextDecoration.none"></a>

```vertex
public static let none = TextDecoration()
```

<a id="TextDecoration.IsNone"></a>

```vertex
public var IsNone: bool { get }
```

#### Methods

<a id="TextDecoration.Union"></a>

```vertex
public func Union(_ o: TextDecoration) -> TextDecoration
```

### enum TextOverflow <a id="enum-TextOverflow"></a>

```vertex
public enum TextOverflow: Equatable
```

#### Cases

<a id="TextOverflow.clip"></a>

```vertex
case clip
```

<a id="TextOverflow.ellipsis"></a>

```vertex
case ellipsis
```

### enum TextTransform <a id="enum-TextTransform"></a>

```vertex
public enum TextTransform: Equatable
```

#### Cases

<a id="TextTransform.none"></a>

```vertex
case none
```

<a id="TextTransform.uppercase"></a>

```vertex
case uppercase
```

<a id="TextTransform.lowercase"></a>

```vertex
case lowercase
```

<a id="TextTransform.capitalize"></a>

```vertex
case capitalize
```

### enum VerticalAlign <a id="enum-VerticalAlign"></a>

```vertex
public enum VerticalAlign: Equatable
```

#### Cases

<a id="VerticalAlign.baseline"></a>

```vertex
case baseline
```

<a id="VerticalAlign.middle"></a>

```vertex
case middle
```

<a id="VerticalAlign.top"></a>

```vertex
case top
```

<a id="VerticalAlign.bottom"></a>

```vertex
case bottom
```

<a id="VerticalAlign.textTop"></a>

```vertex
case textTop
```

<a id="VerticalAlign.textBottom"></a>

```vertex
case textBottom
```

<a id="VerticalAlign.sub"></a>

```vertex
case sub
```

<a id="VerticalAlign.super"></a>

```vertex
case `super`
```

<a id="VerticalAlign.length"></a>

```vertex
case length(css.Length)
```

### enum Visibility <a id="enum-Visibility"></a>

```vertex
public enum Visibility: Equatable
```

#### Cases

<a id="Visibility.visible"></a>

```vertex
case visible
```

<a id="Visibility.hidden"></a>

```vertex
case hidden
```

<a id="Visibility.collapse"></a>

```vertex
case collapse
```

### enum WhiteSpace <a id="enum-WhiteSpace"></a>

```vertex
public enum WhiteSpace: Equatable
```

#### Cases

<a id="WhiteSpace.normal"></a>

```vertex
case normal
```

<a id="WhiteSpace.nowrap"></a>

```vertex
case nowrap
```

<a id="WhiteSpace.pre"></a>

```vertex
case pre
```

<a id="WhiteSpace.preWrap"></a>

```vertex
case preWrap
```

<a id="WhiteSpace.preLine"></a>

```vertex
case preLine
```

#### Properties

<a id="WhiteSpace.Collapses"></a>

```vertex
public var Collapses: bool { get }
```

<a id="WhiteSpace.Wraps"></a>

```vertex
public var Wraps: bool { get }
```

<a id="WhiteSpace.KeepsNewlines"></a>

```vertex
public var KeepsNewlines: bool { get }
```

### enum WordBreak <a id="enum-WordBreak"></a>

```vertex
public enum WordBreak: Equatable
```

#### Cases

<a id="WordBreak.normal"></a>

```vertex
case normal
```

<a id="WordBreak.breakAll"></a>

```vertex
case breakAll
```

<a id="WordBreak.keepAll"></a>

```vertex
case keepAll
```

## Files

- cascade.vs
- computed.vs
- invalidation.vs
- supports.vs
- ua.vs
- util.vs
- values.vs
- vars.vs
