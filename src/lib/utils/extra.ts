import { nanoid } from 'nanoid';

export const randomFileName = (ext?: string) =>
	nanoid(21) + `${ext === undefined ? '' : '.' + ext}`;
