// =====================================
// server/index.js
// =====================================

// ---------- IMPORTS ----------
import express from "express";
import session from "express-session";
import cors from "cors";
import fs from "fs-extra";
import path from "path";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import multer from "multer";
import { fileURLToPath } from "url";

// ---------- ENV ----------
dotenv.config();

// ---------- DIR FIX ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- APP ----------
const app = express();
const PORT = process.env.PORT || 3000;

// ---------- DATA FILES ----------
const DATA_DIR = path.join(__dirname, "data");
const CATALOG_FILE = path.join(DATA_DIR, "catalog.json");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

// ---------- ENSURE FILES ----------
fs.ensureDirSync(DATA_DIR);
fs.ensureDirSync(path.join(__dirname, "public/uploads"));

if (!fs.existsSync(CATALOG_FILE))
  fs.writeJsonSync(CATALOG_FILE, { lands: [], properties: [], safaris: [] });

if (!fs.existsSync(BOOKINGS_FILE))
  fs.writeJsonSync(BOOKINGS_FILE, []);

if (!fs.existsSync(INQUIRIES_FILE))
  fs.writeJsonSync(INQUIRIES_FILE, []);

// ---------- MIDDLEWARE ----------
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    name: "novahaven.sid",
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

// ---------- ADMIN CREDS ----------
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
  console.error("❌ Missing ADMIN credentials");
  process.exit(1);
}

// ---------- HELPERS ----------
const readJSON = (f) => fs.readJson(f);
const writeJSON = (f, d) => fs.writeJson(f, d, { spaces: 2 });

const requireAdmin = (req, res, next) => {
  if (req.session.admin === true) return next();
  res.status(401).json({ success: false, message: "Unauthorized" });
};

// ---------- MULTER ----------
const storage = multer.diskStorage({
  destination: (_, __, cb) =>
    cb(null, path.join(__dirname, "public/uploads")),
  filename: (_, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// =====================================
// AUTH ROUTES
// =====================================
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  const validUser = email === ADMIN_EMAIL;
  const validPass = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

  if (!validUser || !validPass)
    return res.status(401).json({ success: false });

  req.session.admin = true;
  res.json({ success: true });
});

app.post("/api/admin/logout", (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

app.get("/api/admin/session", (req, res) => {
  res.json({ loggedIn: req.session.admin === true });
});

// =====================================
// CATALOG
// =====================================
app.get("/api/catalog", async (_, res) => {
  res.json(await readJSON(CATALOG_FILE));
});

app.post(
  "/api/catalog/:type",
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    const { type } = req.params;
    const { title, description, price } = req.body;

    if (!["lands", "properties", "safaris"].includes(type))
      return res.status(400).json({ success: false });

    if (!title || !description)
      return res.status(400).json({ success: false });

    const catalog = await readJSON(CATALOG_FILE);

    catalog[type].push({
      id: Date.now().toString(),
      title,
      description,
      price: price || "",
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await writeJSON(CATALOG_FILE, catalog);
    res.json({ success: true });
  }
);

app.delete(
  "/api/catalog/:type/:id",
  requireAdmin,
  async (req, res) => {
    const { type, id } = req.params;
    const catalog = await readJSON(CATALOG_FILE);
    catalog[type] = catalog[type].filter((i) => i.id !== id);
    await writeJSON(CATALOG_FILE, catalog);
    res.json({ success: true });
  }
);

// =====================================
// BOOKINGS
// =====================================
app.post("/api/bookings", async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const service = String(req.body.service || "").trim();
  const pkg = String(req.body.package || "").trim();

  if (!name || !email || !service || !pkg)
    return res
      .status(400)
      .json({ success: false, message: "Missing fields" });

  if (name.length < 2 || !email.includes("@"))
    return res
      .status(400)
      .json({ success: false, message: "Invalid input" });

  const bookings = await readJSON(BOOKINGS_FILE);

  bookings.push({
    id: Date.now().toString(),
    name,
    email,
    service,
    package: pkg,
    date: new Date().toLocaleString(),
    status: "pending",
  });

  await writeJSON(BOOKINGS_FILE, bookings);
  res.json({ success: true });
});

app.get("/api/bookings", requireAdmin, async (_, res) => {
  res.json(await readJSON(BOOKINGS_FILE));
});

app.put("/api/bookings/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const bookings = await readJSON(BOOKINGS_FILE);
  const booking = bookings.find((b) => b.id === id);

  if (!booking)
    return res.status(404).json({ success: false });

  booking.status = status || booking.status;
  await writeJSON(BOOKINGS_FILE, bookings);

  res.json({ success: true });
});

app.delete("/api/bookings/:id", requireAdmin, async (req, res) => {
  const bookings = await readJSON(BOOKINGS_FILE);
  await writeJSON(
    BOOKINGS_FILE,
    bookings.filter((b) => b.id !== req.params.id)
  );
  res.json({ success: true });
});

// =====================================
// INQUIRIES
// =====================================
app.post("/api/inquiries", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ success: false });

  const inquiries = await readJSON(INQUIRIES_FILE);

  inquiries.push({
    id: Date.now().toString(),
    name,
    email,
    message,
    date: new Date().toLocaleString(),
    read: false,
  });

  await writeJSON(INQUIRIES_FILE, inquiries);
  res.json({ success: true });
});

app.get("/api/inquiries", requireAdmin, async (_, res) => {
  res.json(await readJSON(INQUIRIES_FILE));
});

// =====================================
// FRONTEND (PRODUCTION)
// =====================================
const DIST_PATH = path.join(__dirname, "../dist");
app.use(express.static(DIST_PATH));

app.get("*", (_, res) => {
  res.sendFile(path.join(DIST_PATH, "index.html"));
});

// =====================================
// START SERVER
// =====================================
app.listen(PORT, () => {
  console.log(`✅ NovaHaven running on port ${PORT}`);
});
