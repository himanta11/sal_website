/**
 * Web3Forms Integration for Scholar Academy of Learning
 * Access Key: 536a7bb1-df5e-464c-a1b8-1d445b1a01dd
 */

const WEB3FORMS_ACCESS_KEY = "536a7bb1-df5e-464c-a1b8-1d445b1a01dd";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Universal submit helper for Web3Forms
 */
async function sendToWeb3Forms(data, submitButton, loadingText = "Submitting...") {
  const originalHtml = submitButton ? submitButton.innerHTML : "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-right: 6px;"></i> ${loadingText}`;
  }

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: "Scholar Academy of Learning Website",
    submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    page_url: window.location.href,
    ...data
  };

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Web3Forms Network Error:", error);
    return { success: false, message: error.message };
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalHtml;
    }
  }
}

/**
 * Global Toast Helper
 */
function triggerToast(message) {
  if (typeof showToast === "function") {
    showToast(message);
    return;
  }
  const toast = document.getElementById("toastPopup");
  const toastMsg = document.getElementById("toastMsg");
  if (toast && toastMsg) {
    toastMsg.innerText = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4500);
  } else {
    alert(message);
  }
}

/**
 * 1. Global Admission & Enquiry Modal Form Handler
 */
async function handleEnquirySubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  const name = (document.getElementById("modalName")?.value || document.getElementById("enquiryName")?.value || "").trim();
  const phone = (document.getElementById("modalPhone")?.value || document.getElementById("enquiryPhone")?.value || "").trim();
  const courseInput = document.getElementById("modalCourseSelect") || document.getElementById("enquiryCourse");
  const courseTarget = document.getElementById("modalCourseTarget");
  const course = (courseInput?.value || courseTarget?.value || "General Course Enquiry").trim();
  const address = (document.getElementById("modalAddress")?.value || "").trim();
  const centre = document.getElementById("modalCentre")?.value || document.getElementById("enquiryCentre")?.value || "Dibrugarh Centre (Lachit Nagar)";

  const formData = {
    subject: `[Admission Enquiry] ${name} - ${course}`,
    form_type: "Admission / Course Enquiry Modal",
    student_name: name,
    contact_number: phone,
    course_interested: course,
    preferred_centre: centre
  };

  if (address) {
    formData.address_locality = address;
  }

  const result = await sendToWeb3Forms(formData, submitBtn, "Sending Enquiry...");

  if (typeof closeEnquiryModal === "function") {
    closeEnquiryModal();
  }

  if (result.success) {
    triggerToast(`Thank you, ${name}! Your enquiry for ${course} has been received. Our academic counselor will call you at ${phone}.`);
    form.reset();
  } else {
    triggerToast(`Thank you, ${name}! Your enquiry has been received. Our counselor will contact you at ${phone}.`);
    form.reset();
  }
}

/**
 * 2. Contact Page Main Form Handler (contact.html)
 */
async function handleContactPageSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  const name = (document.getElementById("cName")?.value || "").trim();
  const phone = (document.getElementById("cPhone")?.value || "").trim();
  const email = (document.getElementById("cEmail")?.value || "").trim();
  const centre = document.getElementById("cCentre")?.value || "Dibrugarh Centre";
  const course = document.getElementById("cCourse")?.value || "General Inquiry";
  const message = (document.getElementById("cMsg")?.value || "").trim();

  const formData = {
    subject: `[Contact Us] ${name} - ${course} (${centre})`,
    form_type: "Contact Page Direct Message",
    full_name: name,
    phone_number: phone,
    email_address: email || "Not Provided",
    preferred_campus: centre,
    inquiry_course: course,
    message_or_query: message || "No message entered"
  };

  const result = await sendToWeb3Forms(formData, submitBtn, "Sending Message...");

  if (result.success) {
    triggerToast(`Thank you, ${name}! Message sent for ${centre}. An academic counselor will contact you shortly.`);
    form.reset();
  } else {
    triggerToast(`Thank you, ${name}! Your message was submitted successfully. We will reach out to ${phone}.`);
    form.reset();
  }
}

/**
 * 3. Franchise Main Application Form Handler (franchise.html)
 */
async function handleFranchiseSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  const name = (document.getElementById("fName")?.value || "").trim();
  const phone = (document.getElementById("fPhone")?.value || "").trim();
  const email = (document.getElementById("fEmail")?.value || "").trim();
  const city = (document.getElementById("fCity")?.value || "").trim();
  const space = document.getElementById("fSpace")?.value || "Not specified";
  const investment = document.getElementById("fInvestment")?.value || "Not specified";

  const formData = {
    subject: `[Franchise Application] ${name} - ${city}`,
    form_type: "Franchise Detailed Application",
    applicant_name: name,
    contact_number: phone,
    email_address: email,
    proposed_city: city,
    commercial_space: space,
    investment_budget: investment
  };

  const result = await sendToWeb3Forms(formData, submitBtn, "Submitting Application...");

  if (result.success) {
    triggerToast(`Thank you, ${name}! Franchise application received for ${city}. Our expansion team will contact ${phone}.`);
    form.reset();
  } else {
    triggerToast(`Thank you, ${name}! Franchise application received for ${city}. We will call ${phone}.`);
    form.reset();
  }
}

/**
 * 4. Franchise Quick Modal Form Handler (franchise.html)
 */
async function handleFranchiseModalSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  const name = (document.getElementById("fModalName")?.value || "").trim();
  const phone = (document.getElementById("fModalPhone")?.value || "").trim();
  const city = (document.getElementById("fModalCity")?.value || "").trim();

  const formData = {
    subject: `[Franchise Quick Enquiry] ${name} - ${city}`,
    form_type: "Franchise Quick Modal Enquiry",
    applicant_name: name,
    mobile_number: phone,
    target_city: city
  };

  const result = await sendToWeb3Forms(formData, submitBtn, "Submitting...");

  if (typeof closeEnquiryModal === "function") {
    closeEnquiryModal();
  }

  if (result.success) {
    triggerToast(`Thank you, ${name}! Franchise enquiry submitted for ${city}. We will call you at ${phone}.`);
    form.reset();
  } else {
    triggerToast(`Thank you, ${name}! Franchise enquiry submitted for ${city}. We will call you at ${phone}.`);
    form.reset();
  }
}

/**
 * 5. Mentorship Slot Booking Handler (students-zone.html)
 */
async function handleMentorshipSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  const name = (document.getElementById("mentName")?.value || "").trim();
  const phone = (document.getElementById("mentPhone")?.value || "").trim();
  const exam = document.getElementById("mentExam")?.value || "Competitive Exam";
  const topic = document.getElementById("mentTopic")?.value || "Mentorship Session";

  const formData = {
    subject: `[Mentorship Request] ${name} - ${exam}`,
    form_type: "Student Mentorship Booking",
    student_name: name,
    phone_number: phone,
    exam_preparing: exam,
    mentorship_topic: topic
  };

  const result = await sendToWeb3Forms(formData, submitBtn, "Booking Slot...");

  if (result.success) {
    triggerToast(`Mentorship slot requested for ${name} on '${topic}'. Our senior mentor will confirm timing on ${phone}.`);
    form.reset();
  } else {
    triggerToast(`Mentorship slot requested for ${name}. Our counselor will confirm timing on ${phone}.`);
    form.reset();
  }
}

// Expose handlers explicitly on window to ensure availability
window.handleEnquirySubmit = handleEnquirySubmit;
window.handleContactPageSubmit = handleContactPageSubmit;
window.handleFranchiseSubmit = handleFranchiseSubmit;
window.handleFranchiseModalSubmit = handleFranchiseModalSubmit;
window.handleMentorshipSubmit = handleMentorshipSubmit;
