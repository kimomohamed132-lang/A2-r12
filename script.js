const FORMSPREE_ENDPOINT = "https://formspree.io/f/mljdyzgo";

document.addEventListener("DOMContentLoaded", () => {
    const ratingGroup = document.getElementById("rating-group");
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const extraSteps = document.getElementById("extra-steps");
    const errorMessage = document.getElementById("error-message");
    const form = document.getElementById("feedback-form");
    const submitBtn = document.getElementById("submit-btn");
    const submitError = document.getElementById("submit-error");
    const formContainer = document.getElementById("form-container");
    const successContainer = document.getElementById("success-container");

    // إظهار باقي الفورم عند اختيار تقييم
    ratingInputs.forEach(input => {
        input.addEventListener("change", () => {
            ratingGroup.classList.add("has-selection");
            errorMessage.classList.add("hidden");
            extraSteps.classList.remove("hidden");
        });
    });

    // معالجة الإرسال
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const selectedRating = document.querySelector('input[name="rating"]:checked');
        if (!selectedRating) {
            errorMessage.classList.remove("hidden");
            return;
        }

        const formData = new FormData();
        formData.append("rating", selectedRating.value);
        
        const feedbackValue = document.getElementById("feedback").value.trim();
        formData.append("feedback", feedbackValue || "بدون تعليق");

        const nameValue = document.getElementById("name").value.trim();
        formData.append("name", nameValue || "بدون اسم");

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = "جاري الإرسال... ⏳";
        submitBtn.disabled = true;
        submitError.classList.add("hidden");

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formContainer.classList.add("hidden");
                successContainer.classList.remove("hidden");
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            submitError.classList.remove("hidden");
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});