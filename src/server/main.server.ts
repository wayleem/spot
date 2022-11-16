import { makeHello } from "shared/calc";
import { Workspace } from "@rbxts/services"
import preGame from "./preGame/preGame"
import inGame from "./inGame/inGame"

type state = {
    process: "preGame" | "inGame" | "postGame"
}

let seekerFolder = Workspace.WaitForChild("Seekers") as Folder
let hiderFolder = Workspace.WaitForChild("Hiders") as Folder
let intermissionFolder = Workspace.WaitForChild("Intermission") as Folder


print(makeHello("main.server.ts"));

[seekerFolder, hiderFolder, intermissionFolder] = preGame(seekerFolder, hiderFolder, intermissionFolder)

inGame(seekerFolder, hiderFolder)