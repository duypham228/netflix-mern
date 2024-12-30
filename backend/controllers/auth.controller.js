export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  } catch (error) {}
}

export async function signin(req, res) {
  res.send("Signin route");
}

export async function signout(req, res) {
  res.send("Signout route");
}
