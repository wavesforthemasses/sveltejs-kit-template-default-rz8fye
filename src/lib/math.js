export const vec3hashing = {
	charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(''),
	encode: (params) => {
		const { x, y, z, p = 7, min = -100, max = 100, encoded = '' } = params;
		const { minX = min, maxX = max, minY = min, maxY = max, minZ = min, maxZ = max } = params;
		const deltaX = [...Array(4).keys()].find((i) => x < ((i + 1) * (maxX - minX)) / 4 + minX);
		const deltaY = [...Array(4).keys()].find((i) => y < ((i + 1) * (maxY - minY)) / 4 + minY);
		const deltaZ = [...Array(4).keys()].find((i) => z < ((i + 1) * (maxZ - minZ)) / 4 + minZ);
		const delta = parseInt(`${deltaX}${deltaY}${deltaZ}`, 4);
		console.log(x, y, z);
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
	}
};
