const express = require("express");
const router = express.Router();
const supabase = require("../config/supabaseClient");
const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} = require("@simplewebauthn/server");
const jwt = require("jsonwebtoken");
const rpID = process.env.RP_ID;
const rpName = process.env.RP_NAME;

let challengeMap = new Map();

const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate JWT token
function generateToken(email) {
  return jwt.sign({ email }, JWT_SECRET, {
    expiresIn: "1h",
  });
}

// Begin Registration
router.post("/options", async (req, res) => {
  const { email } = req.body;
  const userID = new TextEncoder().encode(email);

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userID,
    userName: email,
  });

  challengeMap.set(email, options.challenge);

  res.json(options);
});

// Complete Registration
router.post("/verify", async (req, res) => {
  const { name, email, credential } = req.body;
  const expectedChallenge = challengeMap.get(email);

  const userID = new TextEncoder().encode(email);

  const verification = await verifyRegistrationResponse({
    response: credential,
    expectedChallenge,
    expectedRPID: rpID,
    expectedOrigin: `https://${rpID}`,
    // expectedOrigin: `http://${rpID}:5173`,
    expectedUserID: userID,
  });

  console.log("Verification", verification);

  if (verification.verified) {
    // Insert user into the database
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          points: 0, // Initialize default points
          confidence_level: 0,
          // passkey: passkey,
          passkey: JSON.stringify(verification.registrationInfo), // Store passkey details
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } else {
    res.status(400).json({ error: "Verification failed" });
  }
});

// Begin Login
router.post("/passkey/options", async (req, res) => {
  const { email } = req.body;
  // console.log("Email", email);
  const { data, error } = await supabase
    .from("users")
    .select("passkey")
    .eq("email", email)
    .single();

  if (error || !data)
    return res.status(404).json({ error: "User not found", val: error });

  const credential = JSON.parse(data.passkey);
  const options = await generateAuthenticationOptions({
    rpID,
    userVerification: "preferred",
    allowCredentials: [{ id: credential.credential.id, type: "public-key" }],
  });

  challengeMap.set(email, options.challenge);

  res.json(options);
});

// Complete Login
router.post("/passkey/verify", async (req, res) => {
  const { email, credential } = req.body;
  console.log("AAAAA", email, credential);
  const expectedChallenge = challengeMap.get(email);

  const { data, error } = await supabase
    .from("users")
    .select("passkey")
    .eq("email", email)
    .single();

  if (error || !data)
    return res.status(404).json({ error: "User not found", error: error });

  const storedCredential = JSON.parse(data.passkey);

  const authenticator = {
    id: storedCredential.credential.id,
    publicKey: new Uint8Array(
      Object.values(storedCredential.credential.publicKey)
    ),
    counter: storedCredential.credential.counter,
  };

  const verification = await verifyAuthenticationResponse({
    response: credential,
    expectedChallenge,
    expectedRPID: rpID,
    expectedOrigin: `https://${rpID}`,
    // expectedOrigin: `http://${rpID}:5173`,
    // credential: storedCredential.credential,
    credential: authenticator,
  });

  if (verification.verified) {
    const token = generateToken(email); /** Added JWT token generation */
    res.json({ success: true, token }); /** Sent JWT token in response */
  } else {
    res.status(400).json({ error: "Authentication failed" });
  }
});

module.exports = router;
