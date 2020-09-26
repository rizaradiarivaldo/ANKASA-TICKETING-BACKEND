const response = {
    success: (res, data, message) => {
        const result = {
            message,
            success: true,
            status: 200,
            data
        }
        res.json(result).status(200)
    },
    failed: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 500,
            data
        }
        res.json(result).status(500)
    },
    tokenResult: (res, data, message) => {
        const result = {
            message,
            success: true,
            status: 201,
            data
        }
        res.json(result).status(201)
    },
    tokenErrorResult: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 501,
            data
        }
        res.json(result).status(501)
    },
    tokenExpiredResult: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 502,
            data
        }
        res.json(result).status(502)
    }
}

module.exports = response