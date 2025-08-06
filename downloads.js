const projects = [
  {
    title: "CGit",
    description: "Automate your GitHub repository creation.",
    repo: "CGit",
    download: "https://github.com/bdwarker/CGit/archive/refs/heads/main.zip",
    image: "assets/cgit.png"
  },
  {
    title: "ProcastinatorMotivator",
    description: "Helps you avoid procrastination and motivates you when opening a distracting app.",
    repo: "ProcastinatorMotivator",
    download: "https://github.com/bdwarker/ProcastinatorMotivator/releases/download/v4.0.0/ProcastinatorMotivator.exe",
    image: "assets/procastinator.png"
  },
  {
    title: "Image2Sketch",
    description: "Convert your images into sketches!",
    repo: "Image2Sketch",
    download: "https://github.com/bdwarker/Image2Sketch/archive/refs/heads/main.zip",
    image: "assets/sketch.png"
  },
  {
    title: "College Ranker",
    description: "Rank your college to fill in JoSAA.",
    repo: "CollegeRanker",
    download: "https://github.com/bdwarker/CollegeRanker/archive/refs/heads/main.zip",
    image: "assets/collegeranker.png"
  }
];

const grid = document.getElementById("projects-grid");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const versionList = document.getElementById("version-list");
const downloadBtn = document.getElementById("download-btn");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}" />
    <div class="card-body">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </div>
  `;
  card.onclick = () => openModal(project);
  grid.appendChild(card);
});

function openModal(project) {
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.description;
  downloadBtn.href = project.download;
  versionList.innerHTML = "<li>Loading versions...</li>";
  document.body.style.overflow = "hidden"; // Lock background scroll
  modal.classList.remove("hidden");

  fetch(`https://api.github.com/repos/bdwarker/${project.repo}/releases`)
    .then(res => res.json())
    .then(releases => {
      versionList.innerHTML = "";

      if (releases.length === 0) {
        versionList.innerHTML = "<li>No releases found.</li>";
        return;
      }

      releases.forEach(rel => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${rel.html_url}" target="_blank">${rel.name || rel.tag_name}</a>`;
        versionList.appendChild(li);
      });
    })
    .catch(() => {
      versionList.innerHTML = "<li>Failed to fetch versions.</li>";
    });
}

// ❌ Close on "X" click
document.querySelector(".close-btn").onclick = () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
};

// ❌ Close on outside modal click
window.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
};
