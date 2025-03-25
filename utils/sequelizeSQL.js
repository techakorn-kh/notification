module.exports = {
    handleErrorSQL: async(res, err) => {
        try {
            const dataset = {};

            switch(err?.name) {
                case 'SequelizeValidationError':
                    const arr = err?.errors || [];
    
                    for (let i = 0; i < arr.length; i++) {
                        dataset[arr[i]?.path] = arr[i]?.message;
                    }
                break;
            }
        
            return {
                code: 400,
                status: 'error',
                message: 'เกิดข้อผิดพลาด',
                data: dataset
            }; 
        } catch (err) {
            throw err;
        }
    }
}