import { Handler } from "express";
import { v4 } from "uuid";
import { getConnection } from "../db";
import { Field } from "../model/model";

const getField = (query: string): Field => {
	const field = getConnection().get("fields").value().find((element) => { return element.title === query || element.id === query })
	if (field === undefined) {
		throw new Error("Field Not Found")
	}
	return field;
}

export const getFields: Handler = (req, res) => {
	const data = getConnection().get("fields").value()
	data.map((element) => {
		return element.tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
	})
	return res.json(data)
}

export const getFieldByValue: Handler = (req, res) => {
	const data = getField(req.params.value)
	if (data) {
		data.tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
	}
	return res.json(data)
}

export const addTask: Handler = (req, res) => {
	const field = getField(req.params.value)
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

export const updateTask: Handler = (req, res) => {
	const field = getField(req.params.value)
	field.tasks = field.tasks.map((element) => {
		if(element.id === req.body.id){
			return req.body
		}
		return element
	})

	const fields = getConnection().get("fields").value().map((item) => {
		if (item.id === field.id) {
			return field
		}
		return item
	})
	getConnection().write(fields)

	return res.status(200).json({})
}

export const deleteTask: Handler = (req, res) => {
	const field = getField(req.params.value)
	field.tasks = field.tasks.filter((element) => {
		return element.id != req.params.taskId
	})

	const fields = getConnection().get("fields").value().map((item) => {
		if (item.id === field.id) {
			return field
		}
		return item
	})
	getConnection().write(fields)

	return res.status(200).json({})
}