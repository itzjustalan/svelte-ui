import { RecordSchema } from 'cirql';
import { z } from 'zod';

export enum MiscIds {
	'appdata' = 'miscellaneous:appdata',
}
export type MiscModel = z.infer<typeof miscModelSchema>;
export const miscModelSchema = RecordSchema.extend({
	id: z.nativeEnum(MiscIds),
	seeded: z.boolean(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
}).strict();
