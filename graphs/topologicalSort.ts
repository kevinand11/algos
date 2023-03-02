const topologicalSort = (nodes: Record<string, string[]>) => {
	const output: string[] = []
	const visited = new Set()
	const cycle = new Set()

	const dfs = (node: string) => {
		if (visited.has(node)) return true
		if (cycle.has(node)) return false

		cycle.add(node)
		for (const neighbor of nodes[node]) {
			if (dfs(neighbor) === false) return false
		}
		cycle.delete(node)

		visited.add(node)
		output.push(node)
		return true
	}

	for (const node of Object.keys(nodes)) {
		if (dfs(node) === false) return []
	}

	return output
}

console.log(topologicalSort({
	a: ['b', 'c'],
	b: ['d'],
	c: [],
	d: ['c'],
	e: ['a'],
	f: ['a'],
}))