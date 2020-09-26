const response = {
    success: (res, data, message) => {
        const result = {
            message,
            success: true,
            status: 200,
            data
        }
        res.status(200)
        res.json(result)
    },
    successWithMeta: (res, data, meta, message) => {
        const result = {
            message,
            success: true,
            code: 200,
            meta,
            data,
        };
        res.status(200)
        res.json(result);
    },
    failed: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 500,
            data
        }
        res.status(500)
        res.json(result)
    },
    notfound: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 404,
            data
        }
        res.status(404)
        res.json(result)
    },
    tokenResult: (res, data, message) => {
        const result = {
            message,
            success: true,
            status: 201,
            data
        }
        res.status(201)
        res.json(result)
    },
    tokenErrorResult: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 501,
            data
        }
        res.status(501)
        res.json(result)
    },
    tokenExpiredResult: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 502,
            data
        }
        res.status(502)
        res.json(result)
    }
}

module.exports = response