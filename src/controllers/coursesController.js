import coursesInfos from "../models/courses";

class coursesController {
    static async createCourse(req, res) {
        req.body.user =req.user._id;
        req.body.class =req.params.id;
        
        const course = await coursesInfos.create(req.body);
        if (!course) {
          return res.status(404).json({ error: "create course failed" });
        }
        return res
          .status(200)
          .json({ message: "course created successfully", data: course });
}
static async getAllCourses(req, res) {
    const courses = await coursesInfos.find();
    if (!courses) {
      return res.status(404).json({ error: "courses not found" });
    }
    return res
      .status(200)
      .json({ message: "courses found successfully", data: courses });
  }
  static async getOneCourse(req, res) {
    const course = await coursesInfos.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "course not found" });
    }
    return res
      .status(200)
      .json({ message: "course retrieved successfully", data: course });
  }
  static async updateOneCourse(req, res) {
    const course = await coursesInfos.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) {
      return res.status(404).json({ error: "failed to update course" });
    }
    return res
      .status(200)
      .json({ message: "course updated successfully", data: course });
  }

  static async deleteOneCourse(req, res) {
    const course = await coursesInfos.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error:"course not deleted" });
    }
    return res
      .status(200)
      .json({ message: "course deleted successfully",});
  }
}
export default coursesController;
