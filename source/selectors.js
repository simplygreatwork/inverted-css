
export function selector_fns() {
	
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
		}
	}
}

export function selector_render(selector) {
	return
}
