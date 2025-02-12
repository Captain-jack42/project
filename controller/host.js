const Home = require("../models/Home");
const Job = require("../models/PostJob");
const Signup = require("../models/Signup");

exports.getHostHome =(req,res,next)=>{
  res.render('host-home');
};

exports.getSignup = (req,res,next)=>{
  res.render('signup');
};

exports.postForm=(req,res,next)=>{
  const {fullName,gender,profession,experience,skills} = req.body;
  const home = new Home(fullName,gender,profession,experience,skills);
  home.save();

  res.render('home');
};

exports.postJob=(req,res,next)=>{
  const {JobTitle,Company,Location,JobType,SalaryRange,JobDescription,DeadLine} = req.body;
  console.log("job posted");
  const job = new Job(JobTitle,Company,Location,JobType,SalaryRange,JobDescription,DeadLine);
  job.save();
  res.render('home');
};

exports.getWorker=(req,res,next)=>{
  const registeredAc = Home.fetchAll(registeredAc=>{
    res.render('worker',{registeredAc:registeredAc});
  });
}

exports.getPostedJob=(req,res,next)=>{
  const PostedJob = Job.fetchAll(PostedJob=>{
    res.render('joblisting',{PostedJob:PostedJob});
  });
}

exports.postSignup=(req,res,next)=>{
  const {fullname,email,phone,password} = req.body;
  const acc = new Signup(fullname,email,phone,password) ;
  acc.save();

  res.render('Login');
};

exports.postLogin = (req, res, next) => {
  Signup.fetchAll(accounts => {
    const matchingAccount = accounts.find(account => 
      account.email === req.body.email && 
      account.password === req.body.password
    );

    if (matchingAccount) {
      res.render('home');
    } else {
      res.render('Login', { error: 'Invalid email or password' });
    }
  });
};

