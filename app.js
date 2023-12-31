// 以 Express 建立 Web 伺服器
var express = require("express");
var app = express();

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );

// Web 伺服器的靜態檔案置於 public 資料夾
app.use( express.static( "public" ) );

// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

// 指定 esj 為 Express 的畫面處理引擎
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/view');

// 一切就緒，開始接受用戶端連線
app.listen(5544);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("「Ctrl + C」可結束伺服器程式.");


// 建立資料庫連線
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : '127.0.0.1',
	user : 'root',
	password : 'root',
	database : 'ProjectA_Order',
    port: 8889
    
});



connection.connect(function(err) {
	// if (err) throw err;
	if (err) {
		console.log(JSON.stringify(err));
		return;
	}
});

// get data
app.get("/home/journey", function (request, response) {

	connection.query('select * from journey', 
		'',
		function(err, rows) {
			if (err)	{
				console.log(JSON.stringify(err));
				return;
			}
			
			response.send(JSON.stringify(rows));
		}
	);
    
})

// Add data
app.post("/home/journey", function(request, response){

        connection.query(

            "INSERT INTO journey (journey_name, journey_leader_name, journey_leader_phone, journey_start_data, journey_end_data, journey_num, journey_perPrice, journey_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                request.body.journey_name, 
                request.body.journey_leader_name,
				request.body.journey_leader_phone, 
				request.body.journey_start_data, 
				request.body.journey_end_data, 
				request.body.journey_num, 
				request.body.journey_perPrice, 
				request.body.journey_total
            ],
            function(error, result) {
                console.log(result);
                response.send("OK, row(s) inserted");
            }

    )

    }

)

// update
app.put("/home/journey", function(request, response){

	connection.query(
		"UPDATE news SET title = ?, ymd = ? WHERE newsId =" + request.body.journey,
		[
			request.body.journey_name, 
			request.body.journey_leader_name,
			request.body.journey_leader_phone, 
			request.body.journey_start_data, 
			request.body.journey_end_data, 
			request.body.journey_num, 
			request.body.journey_perPrice, 
			request.body.journey_total
		]);
		response.send("row updated");

})

// delete
app.delete("/home/journey", function (request, response) {

	connection.query(
		"delete from journey where journey_id = " + request.body.journey_id,
			[]
		);
	response.send("row deleted.");
    
})



// get data
app.get("/home/login", function (request, response) {

	connection.query('select * from login', 
		'',
		function(err, rows) {
			if (err)	{
				console.log(JSON.stringify(err));
				return;
			}
			
			response.send(JSON.stringify(rows));
		}
	);
    
})


app.post("/home/login", function(request, response){

	connection.query(

		"INSERT INTO login (login_name, login_password, login_account, login_phone) VALUES (?, ?, ?, ?)",
		[
			request.body.login_name, 
			request.body.login_password,
			request.body.login_account, 
			request.body.login_phone,
		],
		function(error, result) {
			console.log(result);
			response.send("OK, row(s) inserted");
		}

)

}

)




