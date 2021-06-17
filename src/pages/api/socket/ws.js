// const WebSocket = require('ws');
import WebSocket from 'ws';

export default async function wsHandler(req, res) {
	if (!res.socket.server.wss) {
		console.log('*First use, starting ws');
		const wss = new WebSocket.Server({ server: res.socket.server });

		wss.on('connection', function connection(ws) {
			ws.on('message', function incoming(message) {
				console.log('received: %s', message);
				if (message.substring(0, 4) == "gela") {
					wss.clients.forEach(function each(client) {
						if (client !== ws && client.readyState === WebSocket.OPEN) {
							client.send(message.substring(4));
						}
					});
				}
			});

			var welcome = {
				"kon": "Welcome",
			}

			ws.send(JSON.stringify(welcome));
		});
		res.socket.server.wss = wss

	} else {
		console.log('ws already running')
	}
}
