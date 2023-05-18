import {
	AWS_ACCESS_KEY_ID,
	AWS_BUCKET_NAME,
	AWS_BUCKET_REGION,
	AWS_SECRET_ACCESS_KEY,
} from '$env/static/private';
import { log } from '$lib/logger';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import type internal from 'stream';
// import { Credentials } from 'aws-sdk';
// import S3 from 'aws-sdk/clients/s3';
// import { createReadStream } from 'fs';

class StorageService {
	private s3: S3Client;
	private bucket: string;

	constructor() {
		this.bucket = AWS_BUCKET_NAME;
		this.s3 = new S3Client({
			region: AWS_BUCKET_REGION,
			credentials: {
				accessKeyId: AWS_ACCESS_KEY_ID,
				secretAccessKey: AWS_SECRET_ACCESS_KEY,
			},
		});
	}

	async upload(
		fileName: string,
		fileData: string | internal.Readable | ReadableStream<any> | Blob | Uint8Array | Buffer
	) {
		try {
			const command = new PutObjectCommand({
				Bucket: this.bucket,
				Key: fileName,
				Body: fileData,
			});
			return await this.s3.send(command);
		} catch (error) {
			log.error(error);
		}
	}

	async download(fileName: string) {
		try {
			const command = new GetObjectCommand({
				Bucket: this.bucket,
				Key: fileName,
			});
			return await this.s3.send(command);
		} catch (error) {
			log.error(error);
		}
	}
}

export const storageService = new StorageService();

// const fileStream = createReadStream(path);
// return this.s3.upload({
// 	Bucket: AWS_BUCKET_NAME,
// 	Body: fileStream,
// 	Key: 'eeee.png',
// });
