// tslint:disable: no-submodule-imports
// tslint:disable: no-unsafe-any
import { StoreSync as AbstractStore } from "@konceiver/kv-file";
import parse from "csv-parse/lib/sync";
import stringify from "csv-stringify/lib/sync";
import { readFileSync, writeFileSync } from "fs-extra";

export class StoreSync<K, T> extends AbstractStore<K, T> {
	public static new<K, T>(uri: string): StoreSync<K, T> {
		return new StoreSync<K, T>(new Map<K, T>(), uri);
	}

	// @ts-ignore
	protected dump(rows: Record<K, T>): void {
		writeFileSync(this.uri, stringify(Object.entries(rows)));
	}

	protected load(): void {
		// @ts-ignore
		this.putMany(Object.entries(parse(readFileSync(this.uri, "utf8"))));
	}
}
