import { Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import { Authentication } from "../authentication";
import { ObjectId } from "mongodb";
import { UserUtil } from "../user_util";

var privateKEY = fs.readFileSync('private.pem', 'utf8');
var i = 'OpenCage';          // Issuer
var s = 'hello@opencage.tech';        // Subject
var a = 'https://opencage.tech'; // Audience

//console.log("token is " + token);

var signOptions: jwt.SignOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "12h",
    algorithm: "RS256"
  };

const authRouter: Router = Router();

authRouter.post('/register', (req: Request, res: Response) => {
    let db = req.app.locals.db;

    var email = req.body.email.toLowerCase();
    let logger = req.app.locals.logger;
    logger.info('Register called for email ' + email);

    db.collection('users').find({ email: email }).toArray( (err: any, users: any[]) => {
      if (users == null || users.length == 0) {
        var user: any = { name: req.body.name, email: email };
        if (req.body.password) {
          user['password'] = req.body.password;
          user['initialized'] = true;
        } else {
          user['initialized'] = false;
        }
        if (req.body.address) {
          user['address'] = req.body.address;
        }
        if (req.body.phone) {
          user['phone'] = req.body.phone;
        }
        var d = new Date();
        var n = d.getTime();
        user['loginTime'] = n;
        user.created = new Date();
        db.collection('users').insertOne(user, (err: any, results: any) => {
          var id = results.insertedId;
          console.log('Inserted id is ' + id);
          user['id'] = id;
          delete user._id;
          var payload = { id: id };
  
          let result: any = { result: 0, user: user };
          //if (user.initialized === true) {
            var token = jwt.sign(payload, privateKEY, signOptions);
            //console.log("Token - " + token);
            result['token'] = token;
          /*} else {
            //console.log('User id is ' + user['id']);
            AuthUtil.createSetPassword(db, user);
          }*/
          //res.cookie("token", token);
          //res.cookie("user", id.toString());
          res.json(result);
        });
      } else if (users.length == 1) {
        var user = users[0];
        var id = user['_id'];
        var d = new Date();
        var n = d.getTime();
        user['loginTime'] = n;
        user.created = new Date();
        if (user['abstract'] == true && user['initialized'] == false) {
          user['abstract'] = false;
          if (req.body.password) {
            user['password'] = req.body.password;
            user['initialized'] = true;
          } else {
            user['initialized'] = false;
          }
          if (req.body.name) {
            user['name'] = req.body.name;
          }
          if (req.body.address) {
            user['address'] = req.body.address;
          }
          if (req.body.phone) {
            user['phone'] = req.body.phone;
          }
          db.collection('users').updateOne({ _id: user._id }, { $set: user }, {}, (err: any, results: any) => {
            user['id'] = id;
            delete user._id;
            var payload = { id: id };
  
            var result: any = { result: 0, user: user };
            //if (user.initialized) {
              var token = jwt.sign(payload, privateKEY, signOptions);
              //console.log("Token - " + token);
              result['token'] = token;
            /*} else {
                AuthUtil.createSetPassword(db, user);
            }*/
            //res.cookie("token", token);
            //res.cookie("user", id.toString());
            res.json(result);
          });
        } else {
          res.json({ result: 1 });
        }
      } else {
        res.json({ result: 1 });
      }
    });
  
  });

  authRouter.get('/user', function (req, res) {

    console.log('Trying to authenticate user');
    //console.log("projects: " + configFile.projectsDirectory);
    let legit = Authentication.authentication(req);

    if (legit) {
      console.log('Found user ' + legit.id);
        let db = req.app.locals.db;
        db.collection('users').findOne({ _id: new ObjectId(legit.id) }, async (err: any, results: any) => {
          if (results != null) {
            results.id = results._id;
            delete results._id;
            results.plugins = await UserUtil.getUserPlugins(db, results);
            res.json( results );
            //console.log('Saved login info');
          } else {
            res.status(401).json({});
          }
        });
    }
    
  });

  authRouter.post('/login', function (req, res) {
    let logger = req.app.locals.logger;
    let db = req.app.locals.db;

    //console.log("projects: " + configFile.projectsDirectory);
    var email = req.body.email.toLowerCase();
    logger.info('Login called by ' + email);
    db.collection('users').findOne({ email: email, password: req.body.password }, async (err: any, results: any) => {
      logger.info(results);
      if (results != null) {
        var id = results['_id'];
        var payload = { id: id };
        var token = jwt.sign(payload, privateKEY, signOptions);
        //console.log("Token - " + token)
        var user = results;
        user['id'] = user['_id'];
        user['_id'] = undefined;
        user['password'] = undefined;
        //user['invitations'] = undefined;
        res.cookie("token", token);
        res.cookie("user", id.toString());
  
  
        var d = new Date();
        var n = d.getTime();
        var lastLogin: any = { loginTime: n };
        if (user['loginTime'] !== undefined) {
          lastLogin['lastLoginTime'] = user['loginTime'];
          user['lastLoginTime'] = user['loginTime'];
        }
        user['loginTime'] = n;
        user.plugins = await UserUtil.getUserPlugins(db, user);
        res.json({ result: 0, token: token, user: user });
        //console.log('Saving login info');
        db.collection('users').updateOne({ _id: id }, { $set: lastLogin, $inc: { 'loginCount': 1 } });
        //console.log('Saved login info');
      } else {
        res.json({ result: 1 });
      }
    });
  });
  
  authRouter.post('/logout', function (req, res) {
    res.clearCookie('token');
    res.clearCookie('user');
    res.json({ result: 0 });
  });

  export default authRouter;