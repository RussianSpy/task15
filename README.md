

# Тестовое задание на node.js



Необходимо реализовать апи для TODO листа с аутентификацией. Для хранения данных следует использовать mongo db. Необходимые роуты:



* login (POST) - вход по логину и паролю
* registration (POST) - регистрация с указанием уникального логина и пароля
* task (GET, POST) - получить список всех тасков/ добавить новый таск
* task/:id (GET, PATCH, DELETE) - получить/изменить/удалить таск по id




Данные пользователя:

    {
    	id: number,
    	login: string,
    	password: string(encrypted)
    }



Данные таска:

    {
    	id: number,
    	title: string,
    	description: string,
    }

