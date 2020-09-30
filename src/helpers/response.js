const response = {
    success: (res, data, message) => {
        const result = {
            message,
            success: true,
            status: 200,
            data
        }
        res.status(200).json(result)
    },
    successWithMeta: (res, data, meta, message) => {
        const result = {
            message,
            success: true,
            code: 200,
            meta,
            data,
        };
        res.status(200).json(result);
    },
    failed: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 500,
            data
        }
        res.status(500).json(result)
    },
    notfound: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 404,
            data
        }
        res.status(404).json(result)
    },
    tokenResult: (res, data, message) => {
        const result = {
            message,
            success: true,
            status: 201,
            data
        }
        res.status(201).json(result)
    },
    tokenErrorResult: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 501,
            data
        }
        res.status(501).json(result)
    },
    tokenExpiredResult: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 502,
            data
        }
        res.status(502).json(result)
    },
    forbidden: (res, message) => {
        const result = {
          message: message,
          success: false,
          code: 403,
        };
        res.status(403).json(result);
    }
}

module.exports = response