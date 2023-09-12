
import { properties as props } from './properties.js' 

export function chain_init(sheet) {
	
	let chain = { selectors: [], properties: [], query: null, sheet: sheet }
	let stub = {}
	stub = Object.assign(stub, properties(chain))
	stub = Object.assign(stub, selectors(chain))
	stub = Object.assign(stub, queries(chain))
	Object.keys(stub).forEach(function(key) {
		let fn = stub[key]
		stub[key] = function() {
			sheet.chains.push(chain)
			fn(...arguments)
			return chain_offer(chain)
		}
	})
	return stub
}

function chain_offer(chain) {
	
	let result = {}
	result = Object.assign(result, properties(chain))
	result = Object.assign(result, selectors(chain))
	result = Object.assign(result, queries(chain))
	return result
}

export function properties(chain) {
	
	let fns = {}
	props.forEach(function(property) {
		let escape = property.replace('-', '_')
		fns[escape] = function(value, selector, query) {
			if (selector) {
				let selector_ = selector.selectors.join('')
				selector.selectors.splice(0, selector.selectors.length)
				selector.properties.splice(0, selector.properties.length)
				selector = selector_
			}
			chain.properties.push({
				key: property,
				value: value,
				selector: selector || chain.selector,
				query: query || chain.query
			})
			return chain_offer(chain)
		}
	})
	return Object.assign(chain, fns)
}

export function selectors(chain) {
	
	return {
		element: function(value) {
			chain.selectors.push(value)
			return chain_offer(chain)
		},
		id: function(value) {
			chain.selectors.push(`#${value}`)
			return chain_offer(chain)
		},
		class: function(value) {
			chain.selectors.push(`.${value}`)
			return chain_offer(chain)
		},
		pseudo: function(value) {
			chain.selectors.push(`:${value}]`)
			return chain_offer(chain)
		},
		hover: function() {
			chain.selectors.push(`:hover`)
			return chain_offer(chain)
		},
		focus: function(value) {
			chain.selectors.push(`:focuss`)
			return chain_offer(chain)
		},
		attr: function(key, value) {
			chain.selectors.push(`[${key}=${value}]`)
			return chain_offer(chain)
		}	
	}
}

export function queries(chain) {
	
	return {
		media: function(value) {
			chain.query = value
			return chain_offer(chain)
		}
	}
}
