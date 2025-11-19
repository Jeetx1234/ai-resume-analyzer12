// ✅ Show toast messages
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ✅ Login function — redirects by role
function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!email || !password || !role) {
    showToast("⚠️ Please fill all fields!");
    return;
  }

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userRole", role);

  showToast("✅ Login successful!");

  setTimeout(() => {
    if (role === "hr") window.location.href = "hr_dashboard.html";
    else if (role === "user") window.location.href = "user_dashboard.html";
    else if (role === "university") window.location.href = "university_dashboard.html";
  }, 1200);
}

// ✅ Skill toggle
function toggleSkill(element) {
  element.classList.toggle("selected");
}

// ✅ Fake Resume PDF Upload & Keyword Extraction
async function handlePDFUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  showToast("📤 Uploading PDF...");
  await uploadFileToFirebase(file, "resumes");

  // Simple keyword extraction simulation
  const keywords = ["Python", "Java", "React", "AI", "Machine Learning"];
  const found = keywords.filter((k) =>
    file.name.toLowerCase().includes(k.toLowerCase())
  );

  showToast(`✅ Uploaded! Found keywords: ${found.join(", ") || "None"}`);
}

// ✅ Upload Job Description
async function uploadJD() {
  const fileInput = document.getElementById("jd-upload");
  const file = fileInput.files[0];
  if (!file) {
    showToast("⚠️ Please select a file first!");
    return;
  }
  showToast("📤 Uploading JD...");
  await uploadFileToFirebase(file, "job_descriptions");
  showToast("✅ Job Description Uploaded!");
}

// ✅ Firebase Upload Helper
async function uploadFileToFirebase(file, folder) {
  try {
    if (!window.storage) {
      showToast("⚠️ Firebase not loaded yet!");
      return;
    }

    const { ref, uploadBytes, getDownloadURL } = await import(
      "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js"
    );

    const storageRef = ref(window.storage, `${folder}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log("📁 Uploaded file URL:", url);
    return url;
  } catch (err) {
    console.error("Upload Error:", err);
    showToast("❌ Upload failed. Try again.");
  }
}

// ✅ Probability Analyzer for Job Seeker
function analyzeProbability() {
  const probability = Math.floor(Math.random() * 40) + 60;
  const keywordMatch = Math.floor(Math.random() * 30) + 70;
  const experience = Math.floor(Math.random() * 20) + 60;
  const skills = Math.floor(Math.random() * 25) + 75;
  const format = Math.floor(Math.random() * 15) + 80;
  const ats = Math.floor(Math.random() * 20) + 70;

  document.getElementById("probability-score").innerText = probability + "%";
  document.getElementById("keyword-match").innerText = keywordMatch + "%";
  document.getElementById("experience").innerText = experience + "%";
  document.getElementById("skills").innerText = skills + "%";
  document.getElementById("format-quality").innerText = format + "%";
  document.getElementById("ats-compatibility").innerText = ats + "%";

  

  showToast("📊 Resume analyzed successfully!");
}

// ✅ HR Comparison Dashboard
function showComparison() {
  const comparisonDiv = document.getElementById("comparison");
  comparisonDiv.innerHTML = `
    <table border="1" cellpadding="8">
      <tr><th>Candidate</th><th>Score</th><th>Match</th></tr>
      <tr><td>John Doe</td><td>85%</td><td>High</td></tr>
      <tr><td>Jane Smith</td><td>78%</td><td>Medium</td></tr>
      <tr><td>Alex Johnson</td><td>92%</td><td>Very High</td></tr>
    </table>
  `;
  showToast("📈 Comparison data updated!");
}

// ✅ Feedback Submit
function submitFeedback() {
  const feedback = document.getElementById("feedback-text").value.trim();
  if (!feedback) {
    showToast("⚠️ Please write feedback before submitting!");
    return;
  }
  showToast("✅ Feedback submitted!");
  document.getElementById("feedback-text").value = "";
}

// ✅ University Advice Submit
function submitAdvice() {
  const advice = document.getElementById("advice").value.trim();
  if (!advice) {
    showToast("⚠️ Please write some advice first!");
    return;
  }
  showToast("✅ Advice posted successfully!");
  document.getElementById("advice").value = "";
}

// ✅ Show notification from Firebase (demo version)
function showNotification(message) {
  const list = document.getElementById("notifications");
  const li = document.createElement("li");
  li.innerText = message;
  list.appendChild(li);
}

// ✅ Simulate incoming notifications
window.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("userRole");
  if (!role) return;

  if (role === "hr") {
    showNotification("New resume uploaded for review.");
  } else if (role === "user") {
    showNotification("Your resume has been analyzed successfully.");
  } else if (role === "university") {
    showNotification("3 students requested new advice.");
  }
});
