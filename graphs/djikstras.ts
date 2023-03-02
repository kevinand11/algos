const Inf = Number.POSITIVE_INFINITY

const djikstras = (edges: [string, string, number][], head: string) => {
	const nodes = {} as Record<string, Record<string, number>>
	const table = {} as Record<string, { last: string, unit: number }>
	const visited = new Set<string>()

	edges.forEach(([start, end, unit]) => {
		nodes[start] ||= {}
		nodes[end] ||= {}
		nodes[start][end] = unit
		nodes[end][start] = unit

		table[start] ||= start === head ? { last: '', unit: 0 } : { last: '', unit: Inf }
		table[end] ||= end === head ? { last: '', unit: 0 } : { last: '', unit: Inf }
	})

	const iterate = (head: string, headUnit: number) => {
		if (visited.has(head)) return
		visited.add(head)

		let smallest = null as { key: string, unit: number } | null
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
		return iterate(smallest.key, smallest.unit)
	}

	iterate(head, 0)
	console.log(nodes)
	return table
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