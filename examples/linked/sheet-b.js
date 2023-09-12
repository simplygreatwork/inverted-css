
import { sheet_init } from '../../source/sheet.js'
import { sheet_render } from '../../source/sheet.js'

export function load() {
	
let sheet = sheet_init()
let rule = sheet.rule
let $ = rule()

rule()
.color('red', $.element('header').class('title'))

}

