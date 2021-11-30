export type Task = {
	id: string,
	taskName: string,
	description: string,
	completed: Boolean,
	dueDate: Date,
} | {
	taskName: string,
	description: string,
	completed: Boolean,
	dueDate: Date,
}

export type Field = {
	id: string,
	title: string,
	coords: string,
	tasks: Task[],
}

export type Database = {
	fields: Field[],
}