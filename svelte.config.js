import adapter from '@sveltejs/adapter-auto';
import { Server } from 'socket.io';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		plugins: [
			{
				name: 'sveltekit-socket-io',
				configureServer(server) {
					const io = new Server(server.httpServer);

					// Socket.IO stuff goes here

					console.log('SocketIO injected');
				}
			}
		],

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	}
};

export default config;
