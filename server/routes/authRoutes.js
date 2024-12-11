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
  }); /** Added JWT generation */
}

// Begin Registration
router.post("/options", async (req, res) => {
  const { email } = req.body;
  const userID = new TextEncoder().encode(email);
  // console.log(rpName, rpID, userID, email);

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userID,
    userName: email,
  });

  // console.log("Options (raw):", options);

  challengeMap.set(email, options.challenge);
  // console.log("Stored Challenge:", challengeMap.get(email));

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
    // } catch (err) {
    //   console.error("Error creating user:", err);
    //   res.status(500).json({ error: "Error creating user" });
    // }

    // if (error) return res.status(500).json({ error: error.message });
    // res.json({ success: true });
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

  // console.log("Data", data);

  const credential = JSON.parse(data.passkey);
  // console.log("CREDENTIAL", credential);
  const options = await generateAuthenticationOptions({
    rpID,
    userVerification: "preferred",
    allowCredentials: [{ id: credential.credential.id, type: "public-key" }],
  });
  // console.log("OPTIONSSSS", options);

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
  // console.log("SC", storedCredential);

  // console.log(
  //   "Type of publicKey:",
  //   typeof storedCredential.credential.publicKey
  // );
  // console.log("Value of publicKey:", storedCredential.credential.publicKey);

  const authenticator = {
    // id: Buffer.from(storedCredential.credential.id, "base64"),
    id: storedCredential.credential.id,
    // publicKey: Buffer.from(storedCredential.credential.publicKey, "base64"),
    // publicKey: new Uint8Array(
    //   Buffer.from(storedCredential.credential.publicKey, "base64")
    // ),
    publicKey: new Uint8Array(
      Object.values(storedCredential.credential.publicKey)
    ),
    counter: storedCredential.credential.counter,
    // transports: storedCredential.credential.transports,
  };

  const verification = await verifyAuthenticationResponse({
    response: credential,
    expectedChallenge,
    expectedRPID: rpID,
    expectedOrigin: `https://${rpID}`,
    expectedOrigin: `https://${rpID}`,
    // credential: storedCredential.credential,
    credential: authenticator,
  });

  // console.log("VRRRRRR", verification);

  if (verification.verified) {
    const token = generateToken(email); /** Added JWT token generation */
    res.json({ success: true, token }); /** Sent JWT token in response */
  } else {
    res.status(400).json({ error: "Authentication failed" });
  }
});

// router.post("/login", async (req, res) => {
//   const { assertion, email } = req.body;

//   try {
//     // Retrieve user details from the database
//     const { data: user, error } = await supabase
//       .from("users")
//       .select("email, passkey")
//       .eq("email", email)
//       .single();

//     if (error || !user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Decode the stored passkey credential ID
//     const credentialId = Uint8Array.from(
//       atob(user.passkey.credential_id),
//       (c) => c.charCodeAt(0)
//     );
//     // // Decode the stored passkey credential ID
//     // const credentialId = user.passkey.credential_id;

//     // Verify the WebAuthn assertion using the SimpleWebAuthn server library
//     const verified = await verifyWebAuthnAssertion(assertion, {
//       credentialId,
//       challenge: new Uint8Array(32), // Server-generated challenge
//       expectedRPID: "localhost", // Replace with your RP ID
//       expectedOrigin: "http://localhost:5000", // Replace with your origin
//     });

//     if (!verified) {
//       return res.status(401).json({ error: "Authentication failed" });
//     }

//     // Generate a JWT for the user
//     const token = jwt.sign(
//       {
//         email: user.email,
//         id: user.id, // Include other relevant data as needed
//       },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({ token });
//   } catch (err) {
//     console.error("Error during login:", err);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// async function verifyWebAuthnAssertion(assertion, storedCredential) {
//   try {
//     const verification = verifyAuthenticationResponse({
//       response: assertion.response,
//       credential: assertion,
//       expectedChallenge: storedCredential.challenge,
//       expectedRPID: storedCredential.expectedRPID,
//       expectedOrigin: storedCredential.expectedOrigin,
//       expectedCredentialID: storedCredential.credentialId,
//     });

//     return verification.verified;
//   } catch (err) {
//     console.error("WebAuthn verification failed:", err);
//     return false;
//   }
// }

module.exports = router;
