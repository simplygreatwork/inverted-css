
import { chain_init } from './chain.js'

export function sheet_init() {
	
	let style
	style = document.createElement('style')
	style = document.head.appendChild(style)
	let sheet = {}
	Object.assign(sheet, {
		chains: [],
		queries: {},
		stylesheet: style.sheet,
		rule: function() {
			return chain_init(sheet)
		},
		queries: function(key, value) {
			sheet.queries[key] = value
		}
	})
	return sheet
}

export function sheet_render(sheet, insert) {
	
	insert = insert || true
	if (false) console.log(`sheet.chains: ${JSON.stringify(sheet.chains, null, 2)}`)
	let queries = {}
	sheet.chains.forEach(function(chain) {
		sheet_process(chain, insert, queries)
	})
	sheet_insert_rules(sheet, insert, queries)
}

function sheet_process(chain, insert, queries) {
	
	chain.properties.map(function(each) {
		let { key, value, selector, query } = each
		query = query || chain.query
		query = query ? `@media ${chain.sheet.queries[query]}` : '*'
		queries[query] = queries[query] || { selectors: [] }
		let selectors = queries[query].selectors
		let chain_selector = chain.selectors.join('')
		selector = selector || chain_selector
		if (typeof selector !== 'string') selector = selector.selectors.join('')	
		selector = (selector instanceof Array) ? selector.join('') : selector
		selectors[selector] = selectors[selector] || {}
		selectors[selector][key] = value
	})
}

function sheet_insert_rules(sheet, insert, queries) {
	
	let log = true
	Object.keys(queries).forEach(function(query) {
		let selectors = queries[query].selectors
		let rules = []
		Object.keys(selectors).forEach(function(selector) {
			let properties = selectors[selector]
			let rule = sheet_render_rule(selector, properties)
			rules.push(rule)
			if (query == '*') {
				if (log) console.log(rule)
				if (insert) sheet.stylesheet.insertRule(rule, sheet.stylesheet.cssRules.length)	
			}
		})
		if (query != '*') {
			let rule = `${query} {\n${rules.join('\n')}}`
			if (log) console.log(rule)
			if (insert) sheet.stylesheet.insertRule(rule, sheet.stylesheet.cssRules.length)	
		}
	})
}

function sheet_render_rule(selector, properties) {
	
	selector = (selector instanceof Array) ? selector.join('') : selector
	properties = Object.keys(properties).map(function(key) {
		return `\n\t${key}:${properties[key]};`
	}).join('')
	return `${selector} { ${properties} \n}`
}

export function sheet_config(sheet, fn) {
	
	let rule = sheet_rule(sheet)
	let $ = sheet_rule(sheet)()
	fn(rule, $)
}
