
import { sheet_init } from '../../source/sheet.js'
import { sheet_render } from '../../source/sheet.js'

export function load() {

// work in progress

let sheet = sheet_init()
let rule = sheet.rule
let $ = rule()

rule().class('modal')
	.position('fixed')
	.top(0)
	.bottom(0)
	.left(0)
	.right(0)

sheet_render(sheet)

}
