const response = {
    success: (res, data, message) => {
        const result = {
            message,
            success: true,
            status: 200,
            data
        }
        res.json(result)
    },
    successWithMeta: (res, data, meta, message) => {
        const result = {
            message,
            success: true,
            code: 201,
            meta,
            data,
        };
        res.json(result);
    },
    failed: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 500,
            data
        }
        res.json(result)
    },
    notfound: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 404,
            data
        }
        res.json(result)
    },
    tokenResult: (res, data, message) => {
        const result = {
            message,
            success: true,
            status: 202,
            data
        }
        res.json(result)
    },
    tokenErrorResult: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 501,
            data
        }
        res.json(result)
    },
    tokenExpiredResult: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 502,
            data
        }
        res.json(result)
    },
    forbidden: (res, message) => {
        const result = {
          message: message,
          success: false,
          code: 403,
        };
        res.json(result);
    }
}

module.exports = response