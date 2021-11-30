import { Handler } from "express";
import { v4 } from "uuid";
import { getConnection } from "../db";

export const getFields: Handler = (req, res) => {
	const data = getConnection().get("fields").value()
	data.map((element) => {
		return element.tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
	})
	return res.json(data)
}

export const getFieldByValue: Handler = (req, res) => {
	const data = getConnection().get("fields").value().find((element) => { return element.title === req.params.value || element.id === req.params.value })
	if (data) {
		data.tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
	}
	return res.json(data)
}

export const addTask: Handler = (req, res) => {
	const field = getConnection().get("fields").value().find((element) => { return element.title === req.params.value || element.id === req.params.value })
	if (field === undefined) {
		throw new Error("Field Not Found")
	}
	const newTask = {
		id: v4(),
		taskName: req.body.taskName,
		description: req.body.description,
		completed: req.body.completed,
		dueDate: req.body.dueDate,
	}
	const fields = getConnection().get("fields").value().map((item) => {
		if (item.id === field.id) {
			item.tasks.push(newTask)
		}
		return item
	})

	getConnection().write(fields)

	return res.json(newTask)
}