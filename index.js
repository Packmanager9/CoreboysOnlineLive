
'use strict';

const express = require('express');
const { Server, defaultMaxListeners } = require('ws');
var Extensions = require('websocket-extensions'),
    deflate = require('permessage-deflate'),
    zlib = require('zlib');

deflate = deflate.configure({
    level: zlib.constants.Z_BEST_COMPRESSION,
    maxWindowBits: 13
});

var exts = new Extensions();
exts.add(deflate);

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });
let boys = []
// const wss = new WebSocket.Server({port: 8082})

let games = []
let game = []




class Game {
    constructor() {
        this.players = []
    }
    updatePlayers(data) {

    }
    removePlayer(player) {
        this.players.splice(this.players.indexOf(player), 1)
    }
    addPlayer(player) {
        this.players.push(player)
    }
    swapRoom(player, room){
        this.players.splice(this.players.indexOf(player), 1)
        player.assigned = room
        games[room].addPlayer(player)
    }

}

for (let t = 0; t < 15684335; t++) {
    games.push(new Game())
}


wss.on("connection", ws => {
    // ws.index = game.length
    ws.assigned = Math.round(Math.random()*0)
    ws.index = games[ws.assigned].players.length
    // game.push(ws)
    games[ws.assigned].addPlayer(ws)
    // let pair = [game.length, -1]
    let pair = [games[ws.assigned].players.length, -1]
    // ws.pair = pair
    ws.pair = pair

    ws.on("close", () => {
        let minarr = []
        for (let t = 0; t < games[ws.assigned].players.length; t++) {
            minarr.push(games[ws.assigned].players[t].pair[1])
        }
        if (Math.max(...minarr) == -1) {
            ws.pair[1] = 0
        } else {
            if (!minarr.includes(7)) {
                ws.pair[1] = 7
            }
            if (!minarr.includes(6)) {
                ws.pair[1] = 6
            }
            if (!minarr.includes(5)) {
                ws.pair[1] = 5
            }
            if (!minarr.includes(4)) {
                ws.pair[1] = 4
            }
            if (!minarr.includes(3)) {
                ws.pair[1] = 3
            }
            if (!minarr.includes(2)) {
                ws.pair[1] = 2
            }
            if (!minarr.includes(1)) {
                ws.pair[1] = 1
            }
            if (!minarr.includes(0)) {
                ws.pair[1] = 0
            }
        }
            for (let t = 0; t < games[ws.assigned].players.length; t++) {
                let sjon = {
                    "delete": `${ws.pair[1]}`,
                    "index": `${t}`,
                    "length": `${games[ws.assigned].players.length}`
                }
            let ids = []
            for (let t = 0; t < games[ws.assigned].players.length; t++) {
                if (t != games[ws.assigned].players.indexOf(ws)) {
                    ids.push(games[ws.assigned].players[t].serverID)
                }
            }
            sjon.playerIDs = ids
            games[ws.assigned].players[t].send(JSON.stringify(sjon))



            ids = []
            sjon = {
                'clean': '1'
            }


            for (let t = 0; t < games[ws.assigned].players.length; t++) {
                if (t != games[ws.assigned].players.indexOf(ws)) {
                    ids.push(games[ws.assigned].players[t].serverID)
                }
            }
            sjon.playerIDs = ids

            let data = JSON.stringify(sjon)
            for (let t = 0; t < games[ws.assigned].players.length; t++) {
                games[ws.assigned].players[t].send(data)
            }
        }

        games[ws.assigned].removePlayer(ws)
    })
    ws.on("message", data => {
        if (JSON.parse(data).room > -1) {


            if(true===true){
            let minarr = []
            for (let t = 0; t < games[ws.assigned].players.length; t++) {
                minarr.push(games[ws.assigned].players[t].pair[1])
            }
            if (Math.max(...minarr) == -1) {
                ws.pair[1] = 0
            } else {
                if (!minarr.includes(7)) {
                    ws.pair[1] = 7
                }
                if (!minarr.includes(6)) {
                    ws.pair[1] = 6
                }
                if (!minarr.includes(5)) {
                    ws.pair[1] = 5
                }
                if (!minarr.includes(4)) {
                    ws.pair[1] = 4
                }
                if (!minarr.includes(3)) {
                    ws.pair[1] = 3
                }
                if (!minarr.includes(2)) {
                    ws.pair[1] = 2
                }
                if (!minarr.includes(1)) {
                    ws.pair[1] = 1
                }
                if (!minarr.includes(0)) {
                    ws.pair[1] = 0
                }
            }
                for (let t = 0; t < games[ws.assigned].players.length; t++) {
                    let sjon = {
                        "delete": `${ws.pair[1]}`,
                        "index": `${t}`,
                        "length": `${games[ws.assigned].players.length}`
                    }
                let ids = []
                for (let t = 0; t < games[ws.assigned].players.length; t++) {
                    if (t != games[ws.assigned].players.indexOf(ws)) {
                        ids.push(games[ws.assigned].players[t].serverID)
                    }
                }
                sjon.playerIDs = ids
                games[ws.assigned].players[t].send(JSON.stringify(sjon))


                let djon = {
                    "delete": `${ws.pair[1]}`,
                    "index": `${t}`,
                    "length": `${games[ws.assigned].players.length}`
                }
                djon.playerIDs = [ws.serverID]
                ws.send(JSON.stringify(djon))

                
            }
        }


            let ids = []
            let sjon = {
                'clean': '1'
            }
            for (let t = 0; t < games[ws.assigned].players.length; t++) {
                if (t != games[ws.assigned].players.indexOf(ws)) {
                    ids.push(games[ws.assigned].players[t].serverID)
                }
            }
            sjon.playerIDs = ids

            let cjon = JSON.stringify(sjon)
            cjon = JSON.parse(cjon)
            cjon.playerIDs = [ws.serverID]
            let datasend = JSON.stringify(sjon)
            let datasendC = JSON.stringify(cjon)
            for (let t = 0; t < games[ws.assigned].players.length; t++) {
                if (t != games[ws.assigned].players.indexOf(ws)) {
                games[ws.assigned].players[t].send(datasend)
                }else{
                    // games[ws.assigned].players[t].send(datasendC)
                }
            }
            games[ws.assigned].swapRoom(ws, parseInt(JSON.parse(data).room, 10))

            

         }else if (JSON.parse(data).counter == 1) {
            let sjon = {
                "counter": `1`,
                "ymom": `${JSON.parse(data).ymom}`,
                "xmom": `${JSON.parse(data).xmom}`,
                "damage": `${JSON.parse(data).damage}`
            }
            sjon.index = JSON.parse(data).striker
            for (let t = 0; t < games[ws.assigned].players.length; t++) {
                if (parseFloat(JSON.parse(data).striker) == games[ws.assigned].players[t].serverID) {
                    games[ws.assigned].players[t].send(JSON.stringify(sjon))
                }
            }
        } else if (JSON.parse(data).kill == 1) {
            let sjon = {
                "kill": `1`
            }
            sjon.index = JSON.parse(data).striker
            for (let t = 0; t < games[ws.assigned].players.length; t++) {
                games[ws.assigned].players[t].send(JSON.stringify(sjon))
            }

        } else if (JSON.parse(data).pinging == 1) {
            let sjon = {
                "pinging": `1`
            }
            sjon.ping = parseInt(JSON.parse(data).ping)
            sjon.serverID = JSON.parse(data).serverID
            for (let t = 0; t < games[ws.assigned].players.length; t++) {
                games[ws.assigned].players[t].send(JSON.stringify(sjon))
            }

        } else {
            if (data >= 0) {
                let minarr = []
                for (let t = 0; t < games[ws.assigned].players.length; t++) {
                    minarr.push(games[ws.assigned].players[t].pair[1])
                }
                if (Math.max(...minarr) == -1) {
                    ws.pair[1] = 0
                } else {
                    if (!minarr.includes(7)) {
                        ws.pair[1] = 7
                    }
                    if (!minarr.includes(6)) {
                        ws.pair[1] = 6
                    }
                    if (!minarr.includes(5)) {
                        ws.pair[1] = 5
                    }
                    if (!minarr.includes(4)) {
                        ws.pair[1] = 4
                    }
                    if (!minarr.includes(3)) {
                        ws.pair[1] = 3
                    }
                    if (!minarr.includes(2)) {
                        ws.pair[1] = 2
                    }
                    if (!minarr.includes(1)) {
                        ws.pair[1] = 1
                    }
                    if (!minarr.includes(0)) {
                        ws.pair[1] = 0
                    }
                }
                let sjon = {
                    "index": `${games[ws.assigned].players.indexOf(ws)}`,
                    "length": `${games[ws.assigned].players.length}`,
                    "slot": `${ws.pair[1]}`
                }
                let storage = []
                for (let t = 0; t < games[ws.assigned].players.length; t++) {
                    if (t != games[ws.assigned].players.indexOf(ws)) {
                        storage.push(games[ws.assigned].players[t].storage)
                    }
                }
                sjon.storage = storage
                ws.storage = storage
                ws.serverID = data
                ws.publicID = data
                let ids = []
                for (let t = 0; t < games[ws.assigned].players.length; t++) {
                    if (t != games[ws.assigned].players.indexOf(ws)) {
                        ids.push(games[ws.assigned].players[t].serverID)
                    }
                }
                sjon.playerIDs = ids
                ws.send(JSON.stringify(sjon))
            } else {
                data = JSON.parse(data)
                data.players = wss.clients.size 
                //ah geex this is gonna be a bad thing to fix gggeez

                data.usedslots = []

                let minarr = []
                for (let t = 0; t < games[ws.assigned].players.length; t++) {
                    minarr.push(games[ws.assigned].players[t].pair[1])
                }
                if (Math.max(...minarr) == -1) {
                    ws.pair[1] = 0
                } else {
                    if (!minarr.includes(7)) {
                        ws.pair[1] = 7
                    }
                    if (!minarr.includes(6)) {
                        ws.pair[1] = 6
                    }
                    if (!minarr.includes(5)) {
                        ws.pair[1] = 5
                    }
                    if (!minarr.includes(4)) {
                        ws.pair[1] = 4
                    }
                    if (!minarr.includes(3)) {
                        ws.pair[1] = 3
                    }
                    if (!minarr.includes(2)) {
                        ws.pair[1] = 2
                    }
                    if (!minarr.includes(1)) {
                        ws.pair[1] = 1
                    }
                    if (!minarr.includes(0)) {
                        ws.pair[1] = 0
                    }
                }
                let ids = []
                for (let t = 0; t < games[ws.assigned].players.length; t++) {
                    if (t != games[ws.assigned].players.indexOf(ws)) {
                        ids.push(parseFloat(games[ws.assigned].players[t].serverID))
                    }
                }
                data.playerIDs = ids
                for (let t = 0; t < games[ws.assigned].players.length; t++) {
                    if (ws != games[ws.assigned].players[t]) {
                        data.serverID = ws.serverID
                        let datapacket = JSON.stringify(data)
                        games[ws.assigned].players[t].send(datapacket)
                    } else {
                        games[ws.assigned].players[t].storage = (data)
                        games[ws.assigned].players[t].serverID = parseFloat((data).serverID)
                    }
                }

            }
        }
    })
})


