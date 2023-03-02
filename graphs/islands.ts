const islands = (grid: number[][]): number => {
	const visited = new Set<string>()
	let islands = 0

	const bfs = (r: number, c: number) => {
		const queue = [{ r, c }]

		let popped = queue.shift()
		while (popped) {
			const neighbors = [[1, 0], [0, 1], [-1, 0], [0, -1]]
			neighbors.forEach((ne) => {
				[r, c] = [popped!.r + ne[0], popped!.c + ne[1]]
				const valid = r >= 0 && r < grid.length && c >= 0 && c < grid[r].length
				if (!valid) return
				if (visited.has(`${r}.${c}`)) return
				visited.add(`${r}.${c}`)

				if (grid[r][c] === 1) queue.push({ r, c })
			})

			popped = queue.shift()
		}
	}

	grid.forEach((row, r) => {
		row.forEach((value, c) => {
			const key = `${r}.${c}`
			if (value === 1 && !visited.has(key)) {
				bfs(r, c)
				islands++
			}
		})
	})

	return islands
}


console.log(islands([
	[1, 1, 1, 0, 0],
	[1, 1, 0, 0, 0],
	[1, 1, 0, 0, 0],
	[0, 0, 0, 1, 1],
	[1, 0, 0, 0, 0]
]))