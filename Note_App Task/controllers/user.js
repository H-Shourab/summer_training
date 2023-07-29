// Packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Varaibles
const key = "bPeShVmYq3t6w9z$C&F)J@NcRfTjWnZr4u7x!A%D*G-KaPdSgVkXp2s5v8y/B?E(H+MbQeThWmZq3t6w9z$C&F)J@NcRfUjXn2r5u7x!A%D*G-KaPdSgVkYp3s6v9y/B?E(H+MbQeThWmZq4t7w!z%C&F)J@NcRfUjXn2r5u8x/A?D(G-KaPdSgVkYp3s6v9y$B&E)H@MbQeThWmZq4t7w!z%C*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeShVkYp3s6v9y$B&E)H@McQfTjWnZq4t7w!z%C*F-JaNdRgUkXp2s5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v8y/B?E(G+KbPeShVmYq3t6w9z$C&F)J@NcQfTjWnZr4u7x!A%D*G-KaPdSgUkXp2s5v8y/B?E(H+MbQeThWmYq3t6w9z$C&F)J@NcRfUjXn2r4u7x!A%D*G-KaPdSgVkYp3s6v8y/B?E(H+"

// Models
const Admin = require('../models/user');

//  Utils
const sendResponse = require('../utils/sendResponse');

// Methods
const Signup = async (req, res) => {
    try {

        const { fullname, email, password, confirmPassword,role } = req.body;

        if (fullname.length < 6)
            return sendResponse(res, 400, "Fullname must be more than 6 chars");

        if (!email.match(/^\w+([-+.]\w+)*@((yahoo|gmail)\.com)$/))
            return sendResponse(res, 400, "Email must be gmail or yahoo");

        if (password.length < 6)
            return sendResponse(res, 400, "Password must be more than 6 chars");

        if (password !== confirmPassword) {
            return sendResponse(res, 400, "The two passwords are not matched");
        }
        if (role=="user"||role=="admin") {
            return sendResponse(res, 400, "Role must be user or admin");
        }

        // The Admin is found in the Admin Collection
        let founded = await Admin.findOne({ email: email });
        if (founded) {
            return sendResponse(res, 409, "Email is already found");
        }

        // The Admin is not found in the Admin Collection
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await new Admin(req.body).save();
        const token = jwt.sign({ _id: user._id }, key);
        const result = { token: token, user: user }
        //res.redirect("../public/note.html")
        return sendResponse(res, 201, "Account has been created Successfully", result);

    } catch (err) {
        console.log(err.message)
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }

}
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return sendResponse(res, 400, 'All the fields are mandatory');
        }
        var admin = await Admin.findOne({ email: email })
        if (!admin) {
            return sendResponse(res, 401, 'The Email is not exist');
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return sendResponse(res, 401, 'Password is wrong');
        }
        const token = jwt.sign({ _id: admin._id }, key);
        const result = { token: token, admin: admin };
       // return sendResponse(res, 200, 'Login is success', result);
    } catch (err) {
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }
}
const DeleteAdmin = async (req, res) => {

    try {
        const rolee= req.body.role
        if(rolee=="admin"){
        await Admin.findByIdAndDelete({ _id: req.params._id });
        return sendResponse(res, 200, 'The User is deleted successfully');
        }
        res.send("Only Admins Can Delete Users "+rolee)
    } catch (err) {
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }
    }


// Exports
module.exports = {
    Signup,
    Login,
    DeleteAdmin
}

