const express = require('express')
var cors = require('cors')
const app = express()

app.use(cors());

app.get('/form', function (req, res) {
    res.send({
        "id": "abc-123",
        "stages": [
            {
                "name": "About you",
                "schema": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                        "firstName"
                    ],
                    "properties": {
                        "firstName": {
                            "type": "string",
                            "pattern": "^[a-zA-Z][a-zA-Z'-]*$",
                            "minLength": 1,
                            "maxLength": 30
                        }
                    }
                },
                "items": [
                    {
                        "id": "title",
                        "fieldType": "select",
                        "label": "Title",
                        "options": ["Mr", "Mrs", "Dr", "Prof"],
                        "failureMessages": {
                            "required": "Field is required"
                        }
                    },
                    {
                        "id": "firstName",
                        "fieldType": "text",
                        "label": "First Name",
                        "failureMessages": {
                            "pattern": "Must start with a letter and contain only letters, ' or -",
                            "minLength": "Must be at least 1 letter",
                            "maxLength": "No more than 30 characters",
                            "required": "Field is required"
                        }
                    },
                    {
                        "id": "lastName",
                        "fieldType": "text",
                        "label": "Last Name",
                        "failureMessages": {
                            "pattern": "Must start with a letter and contain only letters, ' or -",
                            "minLength": "Must be at least 1 letter",
                            "maxLength": "No more than 30 characters",
                            "required": "Field is required"
                        }
                    }
                ]
            }
        ]
    })
})

app.listen(3000)
