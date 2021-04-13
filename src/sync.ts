import { StoreSync as AbstractStore } from "@konceiver/kv-file";
import parse from "csv-parse/lib/sync";
import stringify from "csv-stringify/lib/sync";
import { readFileSync, writeFileSync } from "fs-extra";

export class StoreSync<K, T> extends AbstractStore<K, T> {
	public static new<K, T>(uri: string): StoreSync<K, T> {
		return new StoreSync<K, T>(new Map<K, T>(), uri);
	}

	protected dump(): void {
		writeFileSync(this.uri, stringify(Object.entries(this.all())));
	}

	protected load(): void {
		try {
			// @ts-ignore
			this.putMany(Object.entries(parse(readFileSync(this.uri, "utf8"))));
		} catch {
			//
		}
	}
}
