
import { sheet_init } from '../../source/sheet.js'
import { sheet_render } from '../../source/sheet.js'

export function load() {

let sheet = sheet_init()
let rule = sheet.rule
let $ = rule()

rule()
.font_family('"Open Sans", sans-serif',	$.element('body'))
.font_size('95%', 								$.element('body'))
.font_weight('bold', 							$.element('header').class('title'))
.text_transform('uppercase',	 				$.element('header').class('title'))
.letter_spacing('.2rem', 						$.element('header').class('title'))
.text_decoration('none', 						$.element('a').class('row'))

.color('hsla(200, 100%, 80%, 0.5)', 		$.element('header').class('title'))
.color('hsla(200, 100%, 80%, 1.0)', 		$.element('a').class('row'))

.background('gray', 								$.element('body'))
.background('hsla(200, 100%, 5%, 1.0)', 	$.class('content'))
.background('hsla(200, 100%, 100%, 0.1)',	$.element('div').class('row').hover())
.background('#ddddff', 							$.element('div').class('row').class('selected'))

.margin_bottom('0px', 							$.element('header').class('title'))

.padding('0px', 									$.element('section').class('content'))
.padding('16px', 									$.element('header').class('title'))
.padding_top('10px', 							$.element('div').class('row'))
.padding_bottom('10px', 						$.element('div').class('row'))
.padding_left('16px', 							$.element('div').class('row'))
.padding_right('16px', 							$.element('div').class('row'))
.padding(0, 										$.element('a').class('row'))

.border_bottom('1px solid hsla(200, 100%, 12%, 1.0)', 	$.element('div').class('row'))

.height('100vh', 									$.class('scroll'))
.width('320px', 									$.class('content'))

rule().class('modal')
	.position('fixed')
	.top(0)
	.bottom(0)
	.left(0)
	.right(0)

rule().class('container')
	.display('flex')
	.box_sizing('border-box')

rule().class('content')
	.display('flex')
	.flex_direction('column')
	.box_sizing('border-box')

rule().class('void')
	.display('flex')
	.flex(1)
	.box_sizing('border-box')

rule().class('list')
	.overflow_y('scroll')

rule().element('div').class('row')
	.display('block')
	.box_sizing('border-box')
	.block_size('100%')
	.height('36px')						// bad layout if moved up

sheet_render(sheet)

}


