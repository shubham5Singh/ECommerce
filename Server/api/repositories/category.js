const sql = require('mssql');
const uuidv4 = require('uuid/v4');
const config = require('../../sqlconfig');

exports.getAllCategory = function (response) {
    sql.connect(config).then(() => {
        return sql.query`select * from Categories`;
    }).then(result => {
        sql.close();
        if (result.rowsAffected > 0) {
            response(null, result.recordset);
        }
        else {
            response(null, null);
        }
    }).catch(err => {
        sql.close();
        response(err, null);
    });

    sql.on('error', err => {
        sql.close();
        response(err, null);
    });
}

exports.GetOneCategory = function (categoryId, response) {
    sql.connect(config).then(() => {
        return sql.query`SELECT * FROM Categories WHERE CategoryId = ${categoryId}`;
    }).then(result => {
        sql.close();
        if (result.rowsAffected > 0) {
            response(null, result.recordset);
        }
        else {
            response(null, null);
        }
    }).catch(err => {
        sql.close();
        response(err, null);
    });
}

exports.postCategory = function (req, response) {
    const category = {
        CategoryId: uuidv4(),
        CategoryName: req.body.CategoryName,
        Description: req.body.Description,
        Active: req.body.Active
    };
    sql.connect(config).then(() => {
        return sql.query`INSERT INTO Categories (CategoryId,CategoryName,Description,Active) VALUES 
                        (${category.CategoryId},${category.CategoryName},${category.Description},${category.Active})`;
    }).then(result => {
        sql.close();
        if (result.rowsAffected > 0) {
            response(null, category);
        }
        else {
            response(new Error(500), null);
        }
    }).catch(err => {
        sql.close();
        response(err, null);
    });

    sql.on('error', err => {
        sql.close();
        response(err, null);
    });
}

exports.updateCategory = function (req, response) {
    const categoryId = req.params.categoryId;
    const category = {
        CategoryName: req.body.CategoryName,
        Description: req.body.Description,
        Active: req.body.Active
    };
    sql.connect(config).then(() => {
        return sql.query`UPDATE Categories SET CategoryName = ${category.CategoryName}, Description = ${category.Description},
										Active = ${category.Active} WHERE CategoryId =${categoryId}`;
    }).then(result => {
        sql.close();
        if (result.rowsAffected > 0) {
            response(null, 'update category');
        }
        else {
            response(null, null);
        }
    }).catch(err => {
        sql.close();
        response(err, null);
    });
}

exports.deleteCategory = function(categoryId,response){
    sql.connect(config, err => {
		if (err) {
            response(err,null);
		}
		new sql.Request()
			.input('CategoryId', sql.VarChar, categoryId)
			.execute('sp_DeleteCategory', (err, result) => {
				sql.close();
				if (result.returnValue === 0) {
                    response(null,'success');
				}
				else {
                    response(new Error(500),null);
				}
			});
	});
	sql.on('error', err => {
        sql.close();
        response(err,null);
	});
}