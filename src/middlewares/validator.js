import { check, validationResult } from "express-validator";
class validator {
  static validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.errors.map((err) => err.msg);
      return res.status(400).json({ message: errorMessage });
    }
    return next();
  };
  static newAccountRules() {
    return [
      check("email", "email is invalid").trim().isEmail(), //trim function removes the space before/after the email
      check("password", "weak password").trim().isStrongPassword(),
      // check("lastname","lastname should be valid").trim().isAlpha(),
      check("names", "names should be valid").trim().isAlpha(),

      check(
        "gender",
        "gender should be female, male, other, or prefer not to say"
      )
        .trim()
        .isIn(["male", "female", "other", "prefer not to say"]),
    ];
  }
}
export default validator;
