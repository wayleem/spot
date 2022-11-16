import { PlayerData } from "./types"

export function makeHello(name: string) {
	return `Hello from ${name}!`;
}

export function getDistance(part1: Part, part2: Part) {
	const x1 = part1.Position.X
	const y1 = part1.Position.Z
	const x2 = part2.Position.X
	const y2 = part2.Position.Z

	return math.sqrt(math.pow(x2 - x1, 2) + math.pow(y2 - y1, 2))
}

export function setVisible(player: Model, show: boolean) {
	const children = player.GetChildren() as Part[]
	switch (show) {
		case true:
			children.forEach((child) => {
				if (child.ClassName !== "Humanoid") child.Transparency = 0
			})
			break
		case false:
			children.forEach((child) => {
				if (child.ClassName !== "Humanoid") child.Transparency = 1
			})
			break
	}
}

export function setMaterial(player: Model) {
	const children = player.GetChildren() as Part[]
	children.forEach(function (child) {
		if (child.ClassName !== "Humanoid") {
			//child.Material = Enum.Material.Slate
			child.BrickColor = new BrickColor(1003)
		}
	})
}

export function setPlayerData(user_id: number, team: Team) {
	const playerData: PlayerData = {
		user_id: user_id,
		player_team: team,
	}
	return playerData
}
