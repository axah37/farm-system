import { Database, Field } from "./model/model";
import { v4 } from "uuid";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { field_names } from "./shared";

let db: lowdb.LowdbSync<Database>;

export const createConnection = async () => {
	const adapter = new FileSync<Database>("db.json")
	db = lowdb(adapter)

	const fields: Field[] = []
	field_names.forEach(element => {
		fields.push({ id: v4(), title: element.title, coords: element.coords, tasks: [] })
	});

	db.defaults({ fields: fields }).write()
}

export const getConnection = () => db