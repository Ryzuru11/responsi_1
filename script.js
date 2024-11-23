document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.style.boxShadow = "none";
    } else {
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }

    lastScroll = currentScroll;
  });

  // Add loading animation for images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.5s ease-in-out";

    img.addEventListener("load", function () {
      img.style.opacity = "1";
    });
  });

  // Add hover effect for badges
  const badges = document.querySelectorAll(".badge");
  badges.forEach((badge) => {
    badge.addEventListener("mouseover", function () {
      this.style.transform = "scale(1.05)";
    });

    badge.addEventListener("mouseout", function () {
      this.style.transform = "scale(1)";
    });
  });

  // CV download confirmation
  const downloadBtn = document.querySelector(".download-cv");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      const confirmed = confirm("Do you want to download the CV?");
      if (!confirmed) {
        e.preventDefault();
      }
    });
  }
  function handleDownload(event) {
    const link = event.currentTarget;

    // Add loading state
    link.classList.add("loading");

    // Fetch the file
    fetch(link.href)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a new URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link and click it
        const tempLink = document.createElement("a");
        tempLink.href = url;
        tempLink.download = link.getAttribute("download");
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);

        // Clean up
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Download failed:", error);
        alert(
          "Maaf, terjadi kesalahan saat mengunduh CV. Silakan coba lagi nanti."
        );
      })
      .finally(() => {
        // Remove loading state
        link.classList.remove("loading");
      });
  }
});
