const mysql = require('mysql');
const { connect } = require('../routes/user');


const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME
    });
    
    
    //view users
 
exports.view=(req,res) => {
    
 pool.getConnection((err,connection) => {
    if(err) throw err; //not connected
    console.log('connected as ID ' + connection.threadId);
//user the connection
connection.query('SELECT * FROM team_one_new',(err, rows) => {
connection.release();


if(!err)
{
    res.render('home',{ rows });
}
else
{
  console.log(err);
}

console.log('the data from team one table: \n', rows);

});
});
}

//find user by search
exports.find=(req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
    
    
        let searchTerm = req.body.search;




    //user the connection
    connection.query('SELECT * FROM `team_one_new` WHERE `Primary_Oncall` LIKE ?', ['%' +searchTerm + '%'],(err, rows) => {
    connection.release();
    
    
    if(!err)
    {
        res.render('home',{ rows });
    }
    else
    {
      console.log(err);
    }
    
    console.log('the data from team one table: \n', rows);
    
    });
    });
    }

    exports.form=(req,res) => {
        res.render('add-user');
    }

    //create user

exports.create=(req,res) => {

const { Week_Number, Week_Date, Primary_Oncall, Email, Secondary_Oncall, Email_2 } = req.body;

pool.getConnection((err,connection) => {
    if(err) throw err; //not connected
    console.log('connected as ID ' + connection.threadId);


    let searchTerm = req.body.search;
//user the connection
connection.query('INSERT INTO `team_one_new` SET `Week_Number` = ?, `Week_Date` = ?, `Primary_Oncall` = ?,`Email` = ?, `Secondary_Oncall` = ?, `Email_2` = ?', [Week_Number,Week_Date,Primary_Oncall,Email, Secondary_Oncall, Email_2],(err, rows) => {
connection.release();


if(!err)
{
    res.render('add-user',{alert: 'User added successfully!' });
}
else
{
  console.log(err);
}

console.log('the data from team one table: \n', rows);

});
});
}
//edit user

 exports.edit = (req,res)=>{

    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
    //user the connection
    connection.query('SELECT * FROM team_one_new WHERE Week_Number = ?', [req.params.Week_Number], (err, rows) => {
    connection.release();
    
    
    if(!err)
    {
        res.render('edit-user',{ rows });
    }
    else
    {
      console.log(err);
    }
    
    console.log('the data from team one table: \n', rows);
    
    });
    });
    }

    //update user 

    exports.update = (req,res)=>{

        const { Week_Date,Primary_Oncall, Email, Secondary_Oncall, Email_2 } = req.body;

        pool.getConnection((err,connection) => {
            if(err) throw err; //not connected
            console.log('connected as ID ' + connection.threadId);
        //user the connection
        connection.query('UPDATE `team_one_new` SET `Week_Date` = ?,`Primary_Oncall` = ?,`Secondary_Oncall` = ?, `Email` = ?, `Email_2` = ? WHERE Week_Number = ?', [Week_Date, Primary_Oncall, Secondary_Oncall, Email, Email_2, req.params.Week_Number], (err, rows) => {
        connection.release();
         if(!err)
        {
            pool.getConnection((err,connection) => {
                if(err) throw err; //not connected
                console.log('connected as ID ' + connection.threadId);
            //user the connection
            connection.query('SELECT * FROM team_one_new WHERE Week_Number = ?', [req.params.Week_Number], (err, rows) => {
            connection.release();
            
            
            if(!err)
            {
                res.render('edit-user',{ rows, alert: 'This week has been updated!' });
            }
            else
            {
              console.log(err);
            }
            
            console.log('the data from team one table: \n', rows);
            
            });
            });
        }  
        else
        {
          console.log(err);
        }
        
        console.log('the data from team one table: \n', rows);
        
        });
        });
        }

//delete user

exports.delete = (req,res)=>{

    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
    //user the connection
    connection.query('DELETE FROM team_one_new WHERE Week_Number = ?', [req.params.Week_Number], (err, rows) => {
    connection.release();
    
    
    if(!err)
    {
        res.redirect('/');
    }
    else
    {
      console.log(err);
    }
    
    console.log('the data from team one table: \n', rows);
    
    });
    });
    } 

//ops 
exports.table1=(req,res) => {
    
    pool.getConnection((err,connection) => {
       if(err) throw err; //not connected
       console.log('connected as ID ' + connection.threadId);
   //user the connection
   connection.query('SELECT * FROM team_ops',(err, rows) => {
   connection.release();
   
   
   if(!err)
   {
       res.render('ops',{ rows });
   }
   else
   {
     console.log(err);
   }
   
   console.log('the data from team one table: \n', rows);
   
   });
   });
   }

   //search ops
   exports.find2=(req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
    
    
        let searchTerm = req.body.search;




    //user the connection
    connection.query('SELECT * FROM `team_ops` WHERE `Primary_Oncall` LIKE ?', ['%' +searchTerm + '%'],(err, rows) => {
    connection.release();
    
    
    if(!err)
    {
        res.render('ops',{ rows });
    }
    else
    {
      console.log(err);
    }
    
    console.log('the data from team one table: \n', rows);
    
    });
    });
    }


    exports.form2=(req,res) => {
        res.render('add-user2');
    }
     //create user in ops

exports.create2=(req,res) => {

    const { Week_Number, Week_Date, Primary_Oncall, Email, Secondary_Oncall, Email_2 } = req.body;
    
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
    
    
        let searchTerm = req.body.search;
    //user the connection
    connection.query('INSERT INTO `team_ops` SET `Week_Number` = ?, `Week_Date` = ?, `Primary_Oncall` = ?,`Email` = ?, `Secondary_Oncall` = ?, `Email_2` = ?', [Week_Number,Week_Date,Primary_Oncall,Email, Secondary_Oncall, Email_2],(err, rows) => {
    connection.release();
    
    
    if(!err)
    {
        res.render('add-user2',{alert: 'User added successfully!' });
    }
    else
    {
      console.log(err);
    }
    
    console.log('the data from team one table: \n', rows);
    
    });
    });
    }
    //edit user in ops

 exports.edit2 = (req,res)=>{

    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
    //user the connection
    connection.query('SELECT * FROM team_ops WHERE Week_Number = ?', [req.params.Week_Number], (err, rows) => {
    connection.release();
    
    
    if(!err)
    {
        res.render('edit-user2',{ rows });
    }
    else
    {
      console.log(err);
    }
    
    console.log('the data from team one table: \n', rows);
    
    });
    });
    }

    //update user in ops

    exports.update2 = (req,res)=>{

        const { Week_Date,Primary_Oncall, Email, Secondary_Oncall, Email_2 } = req.body;

        pool.getConnection((err,connection) => {
            if(err) throw err; //not connected
            console.log('connected as ID ' + connection.threadId);
        //user the connection
        connection.query('UPDATE `team_ops` SET `Week_Date` = ?,`Primary_Oncall` = ?,`Secondary_Oncall` = ?, `Email` = ?, `Email_2` = ? WHERE Week_Number = ?', [Week_Date, Primary_Oncall, Secondary_Oncall, Email, Email_2, req.params.Week_Number], (err, rows) => {
        connection.release();
         if(!err)
        {
            pool.getConnection((err,connection) => {
                if(err) throw err; //not connected
                console.log('connected as ID ' + connection.threadId);
            //user the connection
            connection.query('SELECT * FROM team_ops WHERE Week_Number = ?', [req.params.Week_Number], (err, rows) => {
            connection.release();
            
            
            if(!err)
            {
                res.render('edit-user2',{ rows, alert: 'This week has been updated!' });
            }
            else
            {
              console.log(err);
            }
            
            console.log('the data from team one table: \n', rows);
            
            });
            });
        }  
        else
        {
          console.log(err);
        }
        
        console.log('the data from team one table: \n', rows);
        
        });
        });
        }


        //delete ops
        exports.delete2 = (req,res)=>{

            pool.getConnection((err,connection) => {
                if(err) throw err; //not connected
                console.log('connected as ID ' + connection.threadId);
            //user the connection
            connection.query('DELETE FROM team_ops WHERE Week_Number = ?', [req.params.Week_Number], (err, rows) => {
            connection.release();
            
            
            if(!err)
            {
                res.redirect('/');
                console.log('deleted!');
            }
            else
            {
              console.log(err);
            }
            
            console.log('the data from team one table: \n', rows);
            
            });
            });
            } 
        
//b2b
exports.table2=(req,res) => {
    
    pool.getConnection((err,connection) => {
       if(err) throw err; //not connected
       console.log('connected as ID ' + connection.threadId);
   //user the connection
   connection.query('SELECT * FROM team_b2b',(err, rows) => {
   connection.release();
   
   
   if(!err)
   {
       res.render('B2B',{ rows });
   }
   else
   {
     console.log(err);
   }
   
   console.log('the data from team one table: \n', rows);
   
   });
   });
   }

   //search b2b 
   exports.find3=(req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
    
    
        let searchTerm = req.body.search;




    //user the connection
    connection.query('SELECT * FROM `team_b2b` WHERE `Primary_Oncall` LIKE ?', ['%' +searchTerm + '%'],(err, rows) => {
    connection.release();
    
    
    if(!err)
    {
        res.render('B2B',{ rows });
    }
    else
    {
      console.log(err);
    }
    
    console.log('the data from team one table: \n', rows);
    
    });
    });
    }


    exports.form3=(req,res) => {
        res.render('add-user3');
    }
     //create user in ops

exports.create3=(req,res) => {

    const { Week_Number, Week_Date, Primary_Oncall, Email, Secondary_Oncall, Email_2 } = req.body;
    
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
    
    
        let searchTerm = req.body.search;
    //user the connection
    connection.query('INSERT INTO `team_b2b` SET `Week_Number` = ?, `Week_Date` = ?, `Primary_Oncall` = ?,`Email` = ?, `Secondary_Oncall` = ?, `Email_2` = ?', [Week_Number,Week_Date,Primary_Oncall,Email, Secondary_Oncall, Email_2],(err, rows) => {
    connection.release();
    
    
    if(!err)
    {
        res.render('add-user3',{alert: 'User added successfully!' });
    }
    else
    {
      console.log(err);
    }
    
    console.log('the data from team one table: \n', rows);
    
    });
    });
    }
    
    //edit user in b2b

 exports.edit3 = (req,res)=>{

    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
    //user the connection
    connection.query('SELECT * FROM team_b2b WHERE Week_Number = ?', [req.params.Week_Number], (err, rows) => {
    connection.release();
    
    
    if(!err)
    {
        res.render('edit-user3',{ rows });
    }
    else
    {
      console.log(err);
    }
    
    console.log('the data from team one table: \n', rows);
    
    });
    });
    }

    //update user in ops

    exports.update3 = (req,res)=>{

        const { Week_Date,Primary_Oncall, Email, Secondary_Oncall, Email_2 } = req.body;

        pool.getConnection((err,connection) => {
            if(err) throw err; //not connected
            console.log('connected as ID ' + connection.threadId);
        //user the connection
        connection.query('UPDATE `team_b2b` SET `Week_Date` = ?,`Primary_Oncall` = ?,`Secondary_Oncall` = ?, `Email` = ?, `Email_2` = ? WHERE Week_Number = ?', [Week_Date, Primary_Oncall, Secondary_Oncall, Email, Email_2, req.params.Week_Number], (err, rows) => {
        connection.release();
         if(!err)
        {
            pool.getConnection((err,connection) => {
                if(err) throw err; //not connected
                console.log('connected as ID ' + connection.threadId);
            //user the connection
            connection.query('SELECT * FROM team_b2b WHERE Week_Number = ?', [req.params.Week_Number], (err, rows) => {
            connection.release();
            
            
            if(!err)
            {
                res.render('edit-user3',{ rows, alert: 'This week has been updated!' });
            }
            else
            {
              console.log(err);
            }
            
            console.log('the data from team one table: \n', rows);
            
            });
            });
        }  
        else
        {
          console.log(err);
        }
        
        console.log('the data from team one table: \n', rows);
        
        });
        });
        }


        //delete ops
        exports.delete3 = (req,res)=>{

            pool.getConnection((err,connection) => {
                if(err) throw err; //not connected
                console.log('connected as ID ' + connection.threadId);
            //user the connection
            connection.query('DELETE FROM team_b2b WHERE Week_Number = ?', [req.params.Week_Number], (err, rows) => {
            connection.release();
            
            
            if(!err)
            {
                res.redirect('/');
                console.log('deleted!');
            }
            else
            {
              console.log(err);
            }
            
            console.log('the data from team one table: \n', rows);
            
            });
            });
            } 
        
   
