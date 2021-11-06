let controller = require("./controller");
const User = require("./../models/user");

const { validationResult } = require("express-validator");

class UserController extends controller {
  async getAllUsers(req, res, next) {
    try {
    
      let users = await User.find({});
      res.render("users", {
        users: users,
        title: "همه کاربران",
        errors: req.flash("errors"),
        message: req.flash("message")
      });
    } catch (err) {
      next(err);
    }
  }

  async seeOneUser(req, res, next) {
    try {
      let user = await User.findById(req.params.id);
      if(!user){
        this.error('چنین کاربری یافت نشد' , 404 );
      }
      res.render("user", { user: user });
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let myErrors = errors.array().map(err=>err.msg);
        req.flash("errors", myErrors);
        return res.redirect("/auth/login");
      }

      req.body.id = parseInt(req.body.id);
      let newUser = new User({
        email: req.body.email,
        first_name: req.body.first_name,
        password: req.body.password
      });
      await newUser.save();
      req.flash("message", "کاربر مورد نظر با موفقیت ایجاد شد");
      return res.redirect("/user");
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      await User.updateMany({ _id: req.params.id }, { $set: req.body });
      req.flash("message", "کاربر مورد نظر با موفقیت به روز رسانی شد شد");
      return res.redirect("/user");
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
    } catch (err) {
      await User.deleteOne({ _id: req.params.id });
      req.flash("message", "کاربر مورد نظر با موفقیت حذف شد");
      return res.redirect("/user");
    }
  }
}

module.exports = new UserController();
