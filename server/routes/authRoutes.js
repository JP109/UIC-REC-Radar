const express = require("express");
const router = express.Router();
const supabase = require("../config/supabaseClient");
const { verifyAuthenticationResponse } = require("@simplewebauthn/server");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { assertion, email } = req.body;

  try {
    // Retrieve user details from the database
    const { data: user, error } = await supabase
      .from("users")
      .select("email, passkey")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the assertion
    const credentialId = Uint8Array.from(
      atob(user.passkey.credential_id),
      (c) => c.charCodeAt(0)
    );
    const publicKey = atob(user.passkey.public_key);

    const verified = await verifyWebAuthnAssertion(assertion, {
      credentialId,
      publicKey,
      challenge: new Uint8Array(32), // Server-generated challenge
    });

    if (!verified) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Generate a JWT for the user
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id, // Include other relevant data as needed
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

async function verifyWebAuthnAssertion(assertion, storedCredential) {
  try {
    const verification = verifyAuthenticationResponse({
      credential: assertion,
      expectedChallenge: storedCredential.challenge,
      expectedRPID: "your-rp-id",
      expectedOrigin: "https://your-domain.com",
      expectedCredentialID: storedCredential.credentialId,
      expectedPublicKey: storedCredential.publicKey,
    });

    return verification.verified;
  } catch (err) {
    console.error("WebAuthn verification failed:", err);
    return false;
  }
}

module.exports = router;

// const crypto = require("crypto"); // For challenge validation

// // Traditional Registration
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   // Input validation
//   if (!name || !email || !password) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     // Check if user already exists
//     const { data: existingUser, error: checkError } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .single();

//     if (existingUser) {
//       return res.status(409).json({ error: "User already exists" });
//     }

//     // Hash password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create user in Supabase
//     const { data, error } = await supabase
//       .from("users")
//       .insert([
//         {
//           name,
//           email,
//           password_hash: hashedPassword,
//           points: 0,
//           confidence_level: 0,
//           created_at: new Date().toISOString(),
//           updated_at: new Date().toISOString(),
//         },
//       ])
//       .single();

//     if (error) throw error;

//     // Generate JWT
//     const token = jwt.sign(
//       { id: data.id, email: data.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     res.status(201).json({
//       user: {
//         id: data.id,
//         name: data.name,
//         email: data.email,
//       },
//       token,
//     });
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ error: "Registration failed" });
//   }
// });

// // Traditional Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Fetch user by email
//     const { data: user, error: fetchError } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .single();

//     if (fetchError || !user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password_hash);

//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Generate JWT
//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     res.json({
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//       },
//       token,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// // Passkey Registration Initiation
// router.post("/passkey/register-start", async (req, res) => {
//   const { email, name } = req.body;

//   try {
//     // Check if user already exists
//     const { data: existingUser, error: checkError } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .single();

//     if (existingUser) {
//       return res.status(409).json({ error: "User already exists" });
//     }

//     // Generate passkey registration options
//     // This would use @simplewebauthn/server to generate challenges
//     const options = generateRegistrationOptions({
//       rpName: "Your App Name",
//       rpID: process.env.RP_ID, // Your domain
//       userID: generateRandomID(), // Generate a unique user ID
//       userName: email,
//       attestationType: "none",
//       excludeCredentials: [], // Optional: prevent re-registration
//       authenticatorSelection: {
//         userVerification: "preferred",
//         residentKey: "preferred",
//       },
//     });

//     // Store challenge temporarily (you might use Redis or another temporary storage)
//     await storeChallenge(options.challenge, { email, name });

//     res.json(options);
//   } catch (err) {
//     console.error("Passkey registration start error:", err);
//     res.status(500).json({ error: "Passkey registration failed" });
//   }
// });

// // Passkey Registration Completion
// router.post("/passkey/register-complete", async (req, res) => {
//   const { attestationResponse, email, name } = req.body;

//   try {
//     // Verify the attestation
//     const verification = await verifyRegistrationResponse({
//       response: attestationResponse,
//       expectedChallenge: retrieveChallenge(), // Retrieve stored challenge
//       expectedOrigin: process.env.EXPECTED_ORIGIN,
//       expectedRPID: process.env.RP_ID,
//     });

//     if (!verification.verified) {
//       return res
//         .status(400)
//         .json({ error: "Registration verification failed" });
//     }

//     // Extract passkey credentials
//     const { credentialPublicKey, credentialID } = verification.registrationInfo;

//     // Create user in Supabase with passkey details
//     const { data, error } = await supabase
//       .from("users")
//       .insert([
//         {
//           name,
//           email,
//           passkey: {
//             credential_id: credentialID.toString("base64"),
//             public_key: credentialPublicKey.toString("base64"),
//             authenticator_attachment:
//               attestationResponse.authenticatorAttachment,
//           },
//           points: 0,
//           confidence_level: 0,
//           created_at: new Date().toISOString(),
//           updated_at: new Date().toISOString(),
//         },
//       ])
//       .single();

//     if (error) throw error;

//     // Generate JWT
//     const token = jwt.sign(
//       { id: data.id, email: data.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     res.status(201).json({
//       user: {
//         id: data.id,
//         name: data.name,
//         email: data.email,
//       },
//       token,
//     });
//   } catch (err) {
//     console.error("Passkey registration completion error:", err);
//     res.status(500).json({ error: "Passkey registration failed" });
//   }
// });

// // Passkey Login Initiation
// router.post("/passkey/login-start", async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Fetch user by email
//     const { data: user, error: fetchError } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .single();

//     if (fetchError || !user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Generate login options
//     const options = generateAuthenticationOptions({
//       rpID: process.env.RP_ID,
//       userVerification: "preferred",
//       allowCredentials: [
//         {
//           id: Buffer.from(user.passkey.credential_id, "base64"),
//           type: "public-key",
//           transports: ["internal", "hybrid", "smart-card"],
//         },
//       ],
//     });

//     // Store challenge temporarily
//     await storeChallenge(options.challenge, { email: user.email });

//     res.json(options);
//   } catch (err) {
//     console.error("Passkey login start error:", err);
//     res.status(500).json({ error: "Passkey login failed" });
//   }
// });

// // Passkey Login Completion
// router.post("/passkey/login-complete", async (req, res) => {
//   const { authenticationResponse, email } = req.body;

//   try {
//     // Fetch user by email
//     const { data: user, error: fetchError } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .single();

//     if (fetchError || !user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Verify authentication response
//     const verification = await verifyAuthenticationResponse({
//       response: authenticationResponse,
//       expectedChallenge: retrieveChallenge(), // Retrieve stored challenge
//       expectedOrigin: process.env.EXPECTED_ORIGIN,
//       expectedRPID: process.env.RP_ID,
//       authenticator: {
//         credentialID: Buffer.from(user.passkey.credential_id, "base64"),
//         credentialPublicKey: Buffer.from(user.passkey.public_key, "base64"),
//       },
//     });

//     if (!verification.verified) {
//       return res
//         .status(400)
//         .json({ error: "Authentication verification failed" });
//     }

//     // Generate JWT
//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     res.json({
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//       },
//       token,
//     });
//   } catch (err) {
//     console.error("Passkey login completion error:", err);
//     res.status(500).json({ error: "Passkey login failed" });
//   }
// });

// // User Login Route
// router.post("/login", async (req, res) => {
//   const { email, passkey } = req.body;

//   try {
//     // Fetch user by email
//     const { data: user, error } = await supabase
//       .from("users")
//       .select("id, name, email, passkey")
//       .eq("email", email)
//       .single();

//     if (error || !user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Parse stored passkey data
//     const { credential_id, public_key } = user.passkey;

//     // Prepare a challenge for passkey verification
//     const challenge = crypto.randomBytes(32).toString("base64url");

//     // Verify the passkey (using WebAuthn API in browser or a library like `fido2-lib` in backend)
//     const verificationResult = await verifyPasskey({
//       credentialId: credential_id,
//       publicKey,
//       challenge,
//       clientDataJSON: passkey.clientDataJSON, // Provided by client
//       authenticatorData: passkey.authenticatorData, // Provided by client
//       signature: passkey.signature, // Provided by client
//     });

//     if (!verificationResult.success) {
//       return res.status(401).json({ error: "Invalid passkey credentials" });
//     }

//     // Generate a session token (e.g., JWT) for user authentication
//     const sessionToken = generateJwtToken(user.id); // Use a helper function to create a JWT

//     res.status(200).json({ message: "Login successful", token: sessionToken });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Helper: Generate JWT Token
// const generateJwtToken = (userId) => {
//   const jwt = require("jsonwebtoken");
//   const secretKey = "your_secret_key"; // Replace with a secure key from .env
//   return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
// };

// // Helper: Verify Passkey (Mock Implementation)
// const verifyPasskey = async ({
//   credentialId,
//   publicKey,
//   challenge,
//   clientDataJSON,
//   authenticatorData,
//   signature,
// }) => {
//   // Use a WebAuthn verification library (e.g., `fido2-lib`) to validate these details
//   // For now, we'll mock a successful result
//   return { success: true };
// };
