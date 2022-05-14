export const vec3hashing = {
	charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(''),
	encode: (params) => {
		const { x, y, z, p = 7, min = -100, max = 100, encoded = '' } = params;
		const { minX = min, maxX = max, minY = min, maxY = max, minZ = min, maxZ = max } = params;
		const deltaX = [...Array(4).keys()].find((i) => x < ((i + 1) * (maxX - minX)) / 4 + minX);
		const deltaY = [...Array(4).keys()].find((i) => y < ((i + 1) * (maxY - minY)) / 4 + minY);
		const deltaZ = [...Array(4).keys()].find((i) => z < ((i + 1) * (maxZ - minZ)) / 4 + minZ);
		const delta = parseInt(`${deltaX}${deltaY}${deltaZ}`, 4);
		if (p > 1)
			return vec3hashing.encode({
				...params,
				p: p - 1,
				minX: (deltaX * (maxX - minX)) / 4 + minX,
				maxX: ((deltaX + 1) * (maxX - minX)) / 4 + minX,
				minY: (deltaY * (maxY - minY)) / 4 + minY,
				maxY: ((deltaY + 1) * (maxY - minY)) / 4 + minY,
				minZ: (deltaZ * (maxZ - minZ)) / 4 + minZ,
				maxZ: ((deltaZ + 1) * (maxZ - minZ)) / 4 + minZ,
				encoded: `${encoded}${vec3hashing.charset[delta]}`
			});
		return `${encoded}${vec3hashing.charset[delta]}`;
	},
	decode: (params) => {
		const { encodedString, min = -100, max = 100 } = params;
		const { minX = min, maxX = max, minY = min, maxY = max, minZ = min, maxZ = max } = params;
		const [deltaX, deltaY, deltaZ] =
			'00' + vec3hashing.charset.indexOf(encodedString[0]).toString(4).slice(-3).split('');
		const minX2 = (deltaX * (maxX - minX)) / 4 + minX;
		const maxX2 = ((deltaX + 1) * (maxX - minX)) / 4 + minX;
		const minY2 = (deltaY * (maxY - minY)) / 4 + minY;
		const maxY2 = ((deltaY + 1) * (maxY - minY)) / 4 + minY;
		const minZ2 = (deltaZ * (maxZ - minZ)) / 4 + minZ;
		const maxZ2 = ((deltaZ + 1) * (maxZ - minZ)) / 4 + minZ;
		if (encodedString.length > 1)
			return vec3hashing.encode({
				...params,
				minX: minX2,
				maxX: maxX2,
				minY: minY2,
				maxY: maxY2,
				minZ: minZ2,
				maxZ: maxZ2,
				encodedString: `${encodedString.substring(1)}`
			});
		return {
			x: (minX2 + maxX2) / 2,
			y: (minY2 + maxY2) / 2,
			z: (minZ2 + maxZ2) / 2
		};
	}
};
