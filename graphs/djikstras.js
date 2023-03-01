const Infinity = Number.POSITIVE_INFINITY

const djikstras = (edges, head) => {
	nodes = {}
	table = {}
	visited = new Set()

	edges.forEach(([start, end, unit]) => {
		nodes[start] ||= {}
		nodes[end] ||= {}
		nodes[start][end] = unit
		nodes[end][start] = unit

		table[start] ||= start === head ? { last: '', unit: 0 } : { last: '', unit: Infinity }
		table[end] ||= end === head ? { last: '', unit: 0 } : { last: '', unit: Infinity }
	})

	iterate(nodes, table, visited, head, 0)
	console.log(nodes)
	return table
}

const iterate = (nodes, table, visited, head, headUnit) => {
	if (visited.has(head)) return
	visited.add(head)

	let smallest = null
	Object.entries(nodes[head]).forEach(([key, unit]) => {
		if (visited.has(key)) return

		const totalUnit = unit + headUnit
		if (!smallest || unit < smallest.unit) smallest = { unit: totalUnit, key }

		if (table[key].unit > totalUnit) {
			table[key].unit = totalUnit
			table[key].last = head
		}
	})

	if (!smallest) return null
	return iterate(nodes, table, visited, smallest.key, smallest.unit)
}




console.log(djikstras([
	['a', 'b', 6],
	['a', 'd', 1],
	['d', 'e', 1],
	['d', 'b', 2],
	['e', 'b', 2],
	['e', 'c', 5],
	['b', 'c', 5],
	['f', 'f', 0]
], 'a'))