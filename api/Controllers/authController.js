import User from "../Models/User.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from "../Utils/sendMail.js";

export const authorization = async (req, res, next) => {

    const { fullname, username, email, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (user)
            res.status(400).json({ 'message': 'username already exists', 'success': false });
        else {
            user = await User.findOne({ email });
            if (user)
                res.status(400).json({ 'message': 'email already exists', 'success': false });
            else {
                try {
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(password, salt)

                    const newUser = await User.create({
                        fullname, username, email, password: hashedPassword
                    });

                    res.status(200).json({ 'message': 'registered successfully', 'success': true });

                } catch (err) { next(err); }
            }
        }

    } catch (err) { next(err); }
}

export const authentication = async (req, res, next) => {

    const { usernameOrEmail, password } = req.body;
    try {
        let user = await User.findOne({ username: usernameOrEmail });
        if (!user) {
            user = await User.findOne({ email: usernameOrEmail });
            if (!user) {
                res.status(422).json({ message: 'user not found!', success: false });
                return;
            }
        }
        const passOk = await bcrypt.compare(password, user.password);
        if (!passOk) {
            res.status(422).json({ message: 'password doesn\'t match!', success: false });
            return;
        }
        jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET_KEY, {}, (err, token) => {
            if (err) throw err;
            else res.status(200).cookie('token', token).json({ message: 'You have successfully logged in.', success: true });
        });

    } catch (err) { next(err); }

}

export const profile = async (req, res, next) => {

    const { token } = req.cookies;
    
    console.log(token);

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
            if (err) throw err;
            const { _id, fullname, username, email, isAdmin } = await User.findById(user.id);
            res.status(200).json({ _id, fullname, username, email, isAdmin });
        });
    } else {
        res.json(null);
    }
}

export const unauthentication = async (req, res, next) => {
    res.cooke('token', '').json(true);
}

export const resetPasswordSendMail = async (req, res, next) => {
    const { email } = req.body;
    console.log("Email : ", email);
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            await jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET_KEY, {}, async (err, token) => {
                if (err) throw err;
                sendMail(email, "Reset your password!", `http://localhost:3000/resetPassword/${token}`);
                res.status(200).json({ success: true, message: 'mail sent successfully' });
            });

        } else {
            res.status(200).json({ success: false, message: 'user not found' });
        }
    } catch (error) { next(error); }
}

export const resetPasswordVerify = async (req, res, next) => {
    const { password, confirmPassword } = req.body
    const token = req.params.token;

    console.log("Verify Token : ", token);

    try {
        if(password && confirmPassword) {
            if (password !== confirmPassword) {
                res.status(405).json({ success: false, message: 'passwords are not same' });
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
    
                if (token) {
                    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
                        if (err) throw err;
                        const updatedUser = await User.findByIdAndUpdate(user.id, {
                            $set: {
                                password: hashedPassword
                            }
                        }, {new: true});
                        res.status(200).json({success: true, message: 'password updated successfully'});
                    });
                } else {
                    res.status(405).json({ success: false, message: 'token couldn\'t confirmed' });
                }
            }
        } else{
            res.status(405).json({ success: false, message: 'no password included' });
        }
        

    } catch (error) { next(error); }
}