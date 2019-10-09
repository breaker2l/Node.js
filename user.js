exports.register = function(email, display_name , password , callback) {
    var userid;
    async.waterfall([
       //validate the params
       function (cb) {                                                 //1
            if (!email || email.indexOf("@") == -1)
                cb(backend.missing_data("email"));
            else if (!display_name)
                cb(backend.missing_data("display_name"));
            else if (!password)
                cb(backend.missing_data("password"));
            else
                cb(null);
         },
         
         function (cb) {
              bcrypt.hash(password, 10 , cb);                          //3
         },
         function (hash,cb) {
              userid = uuid();
              db.dbpool.query(
                   "INSERT INTO Users VALUES (?,?,?,?,UNIX_TIMESTAMP(), NULL,0)",
                   [ userid, email, display_name, hash],
                   cb);
          },
          
          function (results, fileds, cb) {
               exports.user_by_uuid(userid,cb);
          }
        ],
        
        function (err, user_data) {
            if (err) {
                if (err.code
                    && (err.code == 'ER_DUP_KEYNAME'
                        || err.code == 'ER_EXISTS'
                        || err.code == 'ER_DUP_ENTRY'))
                    callback(backhelp.user_already_registered());
                 else
                     callback (err);
                } else {
                     callback (null, user_data);
                }
           });
         };
